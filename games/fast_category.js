const FastCategoryGame = {
    categories: [
        { name: 'MEYVELER', examples: ['ELMA', 'ARMUT', 'MUZ', 'ÇİLEK'] },
        { name: 'ÜLKELER', examples: ['TÜRKİYE', 'ALMANYA', 'FRANSA', 'İTALYA'] },
        { name: 'HAYVANLAR', examples: ['ASLAN', 'KAPLAN', 'KEDİ', 'KÖPEK'] },
        { name: 'RENKLER', examples: ['KIRMIZI', 'MAVİ', 'SARI', 'YEŞİL'] }
    ],
    currentCategory: null,
    score: 0,
    timeLeft: 15,
    isGameOver: false,
    timer: null,
    usedWords: [],

    init(container) {
        this.currentCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
        this.score = 0;
        this.timeLeft = 15;
        this.usedWords = [];
        this.isGameOver = false;
        this.render(container);
    },

    start(container) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, `SÜRE DOLDU! 🛑 Skorun: ${this.score}`);
            } else {
                this.render(container);
            }
        }, 1000);
    },

    submit(value, container) {
        if (this.isGameOver) return;
        if (!this.timer) this.start(container);

        const word = value.trim().toUpperCase();
        if (!word) return;

        if (this.usedWords.includes(word)) {
            this.render(container, 'BU KELİMEYİ ZATEN SÖYLEDİN! ❌');
        } else {
            this.usedWords.push(word);
            this.score++;
            this.render(container, `HARİKA! +1 PUAN! ✅`);
        }

        const input = document.getElementById('cat-input');
        if (input) input.value = '';
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="cat-game">
                <div class="stats">
                    <div class="stat-badge">Skor: ${this.score}</div>
                    <div class="stat-badge ${this.timeLeft <= 5 ? 'urgent' : ''}">Süre: ${this.timeLeft}s</div>
                </div>

                <div class="category-card">
                    <label>KATEGORİ</label>
                    <div class="name">${this.currentCategory.name}</div>
                </div>

                <div class="game-info">${status || 'Bu kategoriye ait kelimeleri hızla yaz!'}</div>
                
                <div class="input-area">
                    <input type="text" id="cat-input" placeholder="Kelime yaz..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') FastCategoryGame.submit(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="FastCategoryGame.submit(document.getElementById('cat-input').value, document.getElementById('game-container'))">EKLE</button>
                </div>

                <button class="primary-btn outline" onclick="FastCategoryGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Kategori</button>
            </div>
            <style>
                .cat-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .stats { display: flex; gap: 20px; margin-bottom: 2rem; }
                .stat-badge { background: rgba(255,255,255,0.05); padding: 10px 25px; border-radius: 12px; border: 1px solid var(--glass-border); font-weight: 800; }
                .stat-badge.urgent { color: #ef4444; border-color: #ef4444; animation: blink 0.5s infinite; }
                .category-card { 
                    background: rgba(59, 130, 246, 0.1); border: 2px solid var(--secondary); padding: 1.5rem; 
                    border-radius: 20px; width: 100%; max-width: 300px; margin-bottom: 2rem;
                }
                .category-card label { font-size: 0.7rem; font-weight: 800; opacity: 0.6; }
                .category-card .name { font-size: 1.8rem; font-weight: 900; color: white; letter-spacing: 2px; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 1.5rem; min-height: 1.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) {
            const el = document.getElementById('cat-input');
            if (el) el.focus();
        }
    }
};

window.FastCategoryGame = FastCategoryGame;
