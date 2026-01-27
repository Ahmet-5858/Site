const app = {
    // State
    state: {
        currentGrade: 9,
        currentSection: 'video', // 'video', 'notes', 'questions'
        currentLesson: null,
        currentTopicIndex: 0
    },

    // Initialization
    init: () => {
        // Initial route - Start with Landing Page
        app.renderLandingPage();
    },

    // --- Views ---

    renderLandingPage: () => {
        // Clear container and active navs
        const container = document.getElementById('app-container');
        app.updateActiveLink(null); // No active link on landing

        container.innerHTML = `
            <div class="landing-hero">
                <div class="landing-split">
                    <div class="landing-left">
                        <h1 class="landing-title">Hayalindeki <br><span style="color: var(--primary)">Gelecek</span> Burada Başlıyor</h1>
                        <p class="landing-subtitle">Lise eğitiminde ihtiyacın olan tüm videolar, notlar ve sorular tek bir yerde, profesyonelce.</p>
                        <button class="landing-btn" onclick="app.startApp()">Hemen Başla 🚀</button>
                    </div>
                    <div class="landing-right">
                        <img src="assets/img/student-hero-new.jpg" alt="Ders Çalışan Mutlu Öğrenci" class="landing-img">
                    </div>
                </div>
            </div>

            <section class="info-section">
                <div class="info-box">
                    <p class="info-text">
                        Sitemizin amacı, lise öğrencilerini ders çalışmaya teşvik etmek ve onlara etkili ders çalışma yöntemleri sunmaktır. 
                        İnternet üzerinden derlediğimiz videolar, PDF’ler ve diğer eğitici içerikler arasından öğrenciler için en faydalı olanları seçerek sitemizde paylaşıyoruz. 
                        Öğrencilerimizin ders çalışmalarına katkı sağlamayı ve başarılarını artırmayı hedefliyoruz.
                    </p>
                    <span class="info-footer">Bizi tercih ettiğiniz için teşekkür ederiz! 🎓</span>
                </div>
            </section>
        `;
    },

    startApp: () => {
        app.switchSection('video');
    },

    renderHome: (e) => {
        if (e) e.preventDefault();

        // Update Nav Active State
        app.updateActiveLink();

        const container = document.getElementById('app-container');

        let heroTitle = '';
        let heroSubtitle = '';

        if (app.state.currentSection === 'video') {
            heroTitle = 'Derslerine <br><span style="color: var(--primary)">Profesyonelce</span> Çalış';
            heroSubtitle = '9, 10, 11 ve 12. sınıf müfredatına uygun konu anlatım videoları.';
        } else if (app.state.currentSection === 'notes') {
            heroTitle = 'Konu <br><span style="color: var(--primary)">Notları</span>';
            heroSubtitle = 'Ders ders, ünite ünite özenle hazırlanmış konu özetleri. (Hazırlanıyor)';
        } else if (app.state.currentSection === 'questions') {
            heroTitle = 'Örnek <br><span style="color: var(--primary)">Sorular</span>';
            heroSubtitle = 'Konu pekiştirme testleri ve yeni nesil soru çözümleri. (Hazırlanıyor)';
        }

        container.innerHTML = `
            <section class="hero-section">
                <h1 class="hero-title">${heroTitle}</h1>
                <p class="hero-subtitle">${heroSubtitle}</p>
            </section>

            <div class="grade-selector-bar">
                ${window.EducationData.config.grades.map(grade => `
                    <button class="grade-btn ${app.state.currentGrade === grade ? 'active' : ''}" 
                            onclick="app.setGrade(${grade})">
                        ${grade}. Sınıf
                    </button>
                `).join('')}
            </div>

            <div class="container">
                <h3 style="margin-bottom: 24px;">Dersler</h3>
                <div id="lesson-grid" class="grid grid-cols-4">
                    <!-- Lessons loaded here -->
                </div>
            </div>
        `;

        app.renderLessons();
    },

    renderLessonDetail: (lessonId) => {
        // If in Questions mode, show placeholder
        if (app.state.currentSection === 'questions') {
            app.renderPlaceholderDetail(lessonId);
            return;
        }

        // Handle Notes Section
        if (app.state.currentSection === 'notes') {
            const noteLink = window.EducationData.notes[lessonId];
            if (noteLink) {
                app.renderNoteDetail(lessonId, noteLink);
                return;
            } else {
                app.renderPlaceholderDetail(lessonId);
                return;
            }
        }

        const gradeData = window.EducationData.content[app.state.currentGrade];
        const lessonContent = gradeData && gradeData[lessonId] ? gradeData[lessonId] : [];

        // Find lesson info for display name/icon
        const lessonInfo = window.EducationData.config.lessons.find(l => l.id === lessonId);

        if (!lessonContent || lessonContent.length === 0) {
            alert("Bu ders için henüz içerik eklenmedi.");
            return;
        }

        app.state.currentLesson = lessonId;
        app.state.currentTopicIndex = 0; // Reset to first topic

        // Layout Structure
        const container = document.getElementById('app-container');
        container.innerHTML = `
             <div class="container" style="padding-top: 40px;">
                <button onclick="app.renderHome()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-bottom:20px; font-weight:600;">
                    ← Geri Dön
                </button>

                <div class="header-content" style="margin-bottom: 32px;">
                    <div style="display:flex; align-items:center; gap:20px;">
                        <span style="font-size:3rem; background:var(--primary-light); width:80px; height:80px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${lessonInfo.icon}</span>
                        <div>
                            <h2 style="font-size:2.5rem; font-weight:800; color:var(--text-main);">${lessonInfo.name}</h2>
                            <p style="color:var(--text-muted); font-size:1.1rem;">${app.state.currentGrade}. Sınıf Video Dersleri</p>
                        </div>
                    </div>
                </div>

                <div class="detail-layout">
                    <!-- Sidebar: Topics -->
                    <aside class="topic-sidebar">
                        <div class="topic-header">KONULAR</div>
                        <div class="topic-list">
                            ${lessonContent.map((topic, index) => `
                                <button class="${index === 0 ? 'active' : ''}" 
                                        onclick="app.loadTopic(${index}, this)">
                                    ${index + 1}. ${topic.title}
                                </button>
                            `).join('')}
                        </div>
                    </aside>

                    <!-- Main: Resources -->
                    <main id="resource-area">
                        <!-- Resources loaded via app.loadTopic -->
                    </main>
                </div>
             </div>
        `;

        // Load initial topic
        app.loadTopic(0);
    },

    renderPlaceholderDetail: (lessonId) => {
        const lessonInfo = window.EducationData.config.lessons.find(l => l.id === lessonId);
        const container = document.getElementById('app-container');

        let sectionName = app.state.currentSection === 'notes' ? 'Konu Notları' : 'Örnek Sorular';

        container.innerHTML = `
            <div class="container" style="padding-top: 40px;">
                <button onclick="app.renderHome()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-bottom:20px; font-weight:600;">
                    ← Geri Dön
                </button>
                
                <div class="header-content" style="margin-bottom: 20px;">
                    <div style="display:flex; align-items:center; gap:16px;">
                        <span style="font-size:2.5rem;">${lessonInfo.icon}</span>
                        <div>
                            <h2 style="font-size:2rem; font-weight:700;">${lessonInfo.name}</h2>
                            <p style="color:var(--text-muted);">${app.state.currentGrade}. Sınıf ${sectionName}</p>
                        </div>
                    </div>
                </div>

                <div class="placeholder-container">
                    <span class="placeholder-icon">🚧</span>
                    <h2 style="margin-bottom:12px;">Hazırlanıyor</h2>
                    <p style="color:var(--text-muted); max-width:500px; margin:0 auto;">
                        Bu bölümdeki <strong>${lessonInfo.name}</strong> içerikleri editörlerimiz tarafından hazırlanmaktadır.
                        Çok yakında eklenecektir.
                    </p>
                </div>
            </div>
        `;
    },

    renderNoteDetail: (lessonId, url) => {
        const lessonInfo = window.EducationData.config.lessons.find(l => l.id === lessonId);
        const container = document.getElementById('app-container');

        container.innerHTML = `
            <div class="container" style="padding-top: 40px;">
                <button onclick="app.renderHome()" style="background:none; border:none; color:var(--text-muted); cursor:pointer; margin-bottom:20px; font-weight:600;">
                    ← Geri Dön
                </button>
                
                <div class="header-content" style="margin-bottom: 32px;">
                    <div style="display:flex; align-items:center; gap:20px;">
                        <span style="font-size:3rem; background:var(--primary-light); width:80px; height:80px; display:flex; align-items:center; justify-content:center; border-radius:50%;">${lessonInfo.icon}</span>
                        <div>
                            <h2 style="font-size:2.5rem; font-weight:800; color:var(--text-main);">${lessonInfo.name} Konu Notları</h2>
                            <p style="color:var(--text-muted); font-size:1.1rem;">Dijital PDF Arşivi</p>
                        </div>
                    </div>
                </div>

                <div class="note-card-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                    <div class="resource-item" style="padding: 24px; display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
                        <div style="display: flex; align-items: center; gap: 12px; width: 100%;">
                            <div class="resource-icon icon-pdf" style="font-size: 2rem;">📚</div>
                            <div>
                                <h3 style="margin: 0; font-size: 1.2rem;">Tüm Konular (PDF)</h3>
                                <p style="margin: 4px 0 0; color: var(--text-muted); font-size: 0.9rem;">Dış Kaynak</p>
                            </div>
                        </div>
                        <p style="color: var(--text-muted); line-height: 1.5;">
                            ${lessonInfo.name} dersi için hazırlanmış tüm konu notlarına ve PDF arşivine aşağıdaki bağlantıdan ulaşabilirsiniz.
                        </p>
                        <a href="${url}" target="_blank" class="landing-btn" style="width: 100%; text-align: center; text-decoration: none;">
                            Notları İncele 🔗
                        </a>
                    </div>
                </div>
            </div>
        `;
    },

    // --- Logic ---

    switchSection: (section) => {
        app.state.currentSection = section;
        app.renderHome();
    },

    setGrade: (grade) => {
        app.state.currentGrade = grade;
        app.renderHome();
    },

    renderLessons: () => {
        const grid = document.getElementById('lesson-grid');
        const activeLessons = window.EducationData.config.lessons;

        grid.innerHTML = activeLessons.map(lesson => `
            <div class="lesson-card" onclick="app.renderLessonDetail('${lesson.id}')">
                <div class="lesson-icon" style="color: ${lesson.color}">${lesson.icon}</div>
                <div class="lesson-title">${lesson.name}</div>
            </div>
        `).join('');
    },

    loadTopic: (index, btnElement) => {
        app.state.currentTopicIndex = index;

        // Update Sidebar UI
        if (btnElement) {
            document.querySelectorAll('.topic-list button').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');
        }

        const gradeData = window.EducationData.content[app.state.currentGrade];
        const topic = gradeData[app.state.currentLesson][index];
        const resourceArea = document.getElementById('resource-area');

        resourceArea.innerHTML = `
            <h3 style="margin-bottom: 24px; font-size:1.5rem; color:var(--primary-dark);">${topic.title}</h3>
            <div class="resource-container">
                ${topic.resources.map(resource => app.createResourceCard(resource)).join('')}
            </div>
        `;
    },

    createResourceCard: (resource) => {
        let iconClass = '';
        let iconSymbol = '';

        switch (resource.type) {
            case 'video':
                iconClass = 'icon-video';
                iconSymbol = '▶';
                break;
            case 'pdf':
                iconClass = 'icon-pdf';
                iconSymbol = '📄';
                break;
            case 'quiz':
                iconClass = 'icon-quiz';
                iconSymbol = '📝';
                break;
        }

        // Action Button Text based on type
        let actionBtnText = 'İncele';
        if (resource.type === 'video') actionBtnText = 'İzle / Git';
        else if (resource.type === 'pdf') actionBtnText = 'İndir';
        else if (resource.type === 'quiz') actionBtnText = 'Çöz';

        const actionBtn = `<a class="resource-action" href="${resource.url}" target="_blank">${actionBtnText}</a>`;

        return `
            <div class="resource-item">
                <div class="resource-icon ${iconClass}">${iconSymbol}</div>
                <div class="resource-info">
                    <div class="resource-title">${resource.title}</div>
                    <div class="resource-meta">
                        ${resource.duration ? `⏱ ${resource.duration}` : ''} 
                        ${resource.type === 'pdf' ? 'PDF Doküman' : ''}
                    </div>
                </div>
                ${actionBtn}
            </div>
        `;
    },

    // --- Modal Logic ---

    openVideo: (url) => {
        const modal = document.getElementById('video-modal');
        const frame = document.getElementById('video-frame');

        // Ensure embed URL
        if (url.includes('watch?v=')) {
            url = url.replace('watch?v=', 'embed/');
        }

        frame.src = url;
        modal.classList.add('open');
    },

    closeModal: (e) => {
        if (e) e.preventDefault();
        const modal = document.getElementById('video-modal');
        const frame = document.getElementById('video-frame');

        modal.classList.remove('open');
        setTimeout(() => { frame.src = ''; }, 300); // Stop video
    },

    updateActiveLink: () => {
        document.querySelectorAll('.nav-link').forEach(l => {
            // Check if onclick attribute contains the current section
            if (l.getAttribute('onclick').includes(`'${app.state.currentSection}'`)) {
                l.classList.add('active');
            } else {
                l.classList.remove('active');
            }
        });
    },

    // --- Student Tools Logic ---

    openTools: () => {
        const modal = document.getElementById('tools-modal');
        modal.classList.add('open');
        app.loadNote(); // Load note when opening
    },

    closeTools: (e) => {
        if (e) e.preventDefault();
        const modal = document.getElementById('tools-modal');
        modal.classList.remove('open');
    },

    calcInput: (val) => {
        const display = document.getElementById('calc-display');

        if (val === 'C') {
            display.value = '';
        } else if (val === 'back') {
            display.value = display.value.slice(0, -1);
        } else if (val === '=') {
            try {
                // Determine if the expression is valid
                if (!display.value) return;

                // Using Function constructor for safer evaluation than direct eval
                // This allows basic math operations
                const result = new Function('return ' + display.value)();

                // Check if result is finite numbers
                if (!isFinite(result) || isNaN(result)) {
                    throw new Error('Invalid Result');
                }

                // Limit decimals
                display.value = Number(result.toFixed(8)).toString();
            } catch (e) {
                const oldVal = display.value;
                display.value = 'Hata';
                setTimeout(() => {
                    display.value = oldVal; // Restore old value so user can fix it
                }, 1000);
            }
        } else {
            // Basic validation to prevent double operators
            const operators = ['+', '-', '*', '/', '.'];
            const lastChar = display.value.slice(-1);

            if (operators.includes(val) && operators.includes(lastChar)) {
                // Swap operator
                display.value = display.value.slice(0, -1) + val;
            } else {
                display.value += val;
            }
        }
    },

    saveNote: () => {
        const note = document.getElementById('note-input').value;
        localStorage.setItem('studentNote', note);

        const status = document.getElementById('save-status');
        status.textContent = 'Kaydedildi! ✅';
        status.classList.add('show');

        // Clear status after 2 seconds
        if (app.saveTimeout) clearTimeout(app.saveTimeout);
        app.saveTimeout = setTimeout(() => {
            status.classList.remove('show');
            setTimeout(() => { status.textContent = ''; }, 300);
        }, 2000);
    },

    clearNote: () => {
        if (confirm('Notunu silmek istediğine emin misin? Bu işlem geri alınamaz.')) {
            document.getElementById('note-input').value = '';
            localStorage.removeItem('studentNote');

            const status = document.getElementById('save-status');
            status.textContent = 'Not Silindi 🗑️';
            status.classList.add('show');
            setTimeout(() => { status.classList.remove('show'); }, 2000);
        }
    },

    loadNote: () => {
        const saved = localStorage.getItem('studentNote');
        if (saved) {
            document.getElementById('note-input').value = saved;
        }
    }
};

// Start App when DOM ready
document.addEventListener('DOMContentLoaded', app.init);
