const SecretFindDifferentGame = {
    currentGroup: null,
    groups: JSON.parse(localStorage.getItem('secret_groups')) || {},

    init(container) {
        this.currentGroup = null;
        this.render(container);
    },

    saveGroups() {
        localStorage.setItem('secret_groups', JSON.stringify(this.groups));
    },

    showCreateGroup(container) {
        this.render(container, 'create');
    },

    showJoinGroup(container) {
        this.render(container, 'join');
    },

    createGroup(container) {
        const name = document.getElementById('group-name').value;
        const code = document.getElementById('group-code').value;

        if (!name || !code) {
            alert('Lütfen grup adı ve kodu girin!');
            return;
        }

        if (this.groups[code]) {
            alert('Bu kod zaten kullanımda!');
            return;
        }

        this.groups[code] = {
            name: name,
            messages: []
        };
        this.saveGroups();
        this.currentGroup = code;
        this.render(container, 'chat');
    },

    joinGroup(container) {
        const code = document.getElementById('join-code').value;

        if (!code) {
            alert('Lütfen bir kod girin!');
            return;
        }

        if (this.groups[code]) {
            this.currentGroup = code;
            this.render(container, 'chat');
        } else {
            alert('Grup bulunamadı! ❌');
        }
    },

    sendMessage(container) {
        const input = document.getElementById('message-input');
        const text = input.value.trim();

        if (!text || !this.currentGroup) return;

        const msg = {
            sender: JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        this.groups[this.currentGroup].messages.push(msg);
        this.saveGroups();
        input.value = '';
        this.render(container, 'chat');

        // Auto scroll
        const msgs = document.getElementById('chat-messages');
        if (msgs) msgs.scrollTop = msgs.scrollHeight;
    },

    render(container, view = 'menu') {
        let content = '';

        if (view === 'menu') {
            content = `
                <div class="secret-menu">
                    <div class="secret-icon"><i class="fa-solid fa-user-secret"></i></div>
                    <h2>Grup Oyunu</h2>
                    <p>Özel bir gruba katılın veya yeni bir grup oluşturun.</p>
                    <div class="menu-actions">
                        <button class="primary-btn" onclick="SecretFindDifferentGame.showJoinGroup(document.getElementById('game-container'))">
                            <i class="fa-solid fa-right-to-bracket"></i> Gruba Gir
                        </button>
                        <button class="primary-btn outline" onclick="SecretFindDifferentGame.showCreateGroup(document.getElementById('game-container'))">
                            <i class="fa-solid fa-plus"></i> Grup Oluştur
                        </button>
                    </div>
                </div>
            `;
        } else if (view === 'create') {
            content = `
                <div class="secret-form">
                    <button class="back-btn" onclick="SecretFindDifferentGame.init(document.getElementById('game-container'))"><i class="fa-solid fa-arrow-left"></i> Geri</button>
                    <h3>Grup Oluştur</h3>
                    <div class="input-group">
                        <label>Grup Adı</label>
                        <input type="text" id="group-name" placeholder="Örn: Gece Kuşları">
                    </div>
                    <div class="input-group">
                        <label>Grup Kodu (Başkaları bununla katılır)</label>
                        <input type="text" id="group-code" placeholder="Örn: AHMED58">
                    </div>
                    <button class="primary-btn" onclick="SecretFindDifferentGame.createGroup(document.getElementById('game-container'))">KUR</button>
                </div>
            `;
        } else if (view === 'join') {
            content = `
                <div class="secret-form">
                    <button class="back-btn" onclick="SecretFindDifferentGame.init(document.getElementById('game-container'))"><i class="fa-solid fa-arrow-left"></i> Geri</button>
                    <h3>Gruba Gir</h3>
                    <div class="input-group">
                        <label>Grup Kodu</label>
                        <input type="text" id="join-code" placeholder="Kodu buraya yazın...">
                    </div>
                    <button class="primary-btn" onclick="SecretFindDifferentGame.joinGroup(document.getElementById('game-container'))">KATIL</button>
                </div>
            `;
        } else if (view === 'chat' && this.currentGroup) {
            const group = this.groups[this.currentGroup];
            content = `
                <div class="secret-chat-room">
                    <div class="chat-header">
                        <button class="back-btn-icon" onclick="SecretFindDifferentGame.init(document.getElementById('game-container'))"><i class="fa-solid fa-chevron-left"></i></button>
                        <div class="group-info">
                            <div class="group-name-text">${group.name}</div>
                            <div class="group-code-tag">Kod: ${this.currentGroup}</div>
                        </div>
                    </div>
                    <div class="chat-messages" id="chat-messages">
                        ${group.messages.map(m => `
                            <div class="message ${m.sender === (JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir') ? 'own' : ''}">
                                <div class="sender">${m.sender}</div>
                                <div class="text">${m.text}</div>
                                <div class="time">${m.time}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="chat-input-area">
                        <input type="text" id="message-input" placeholder="Mesaj yazın..." onkeypress="if(event.key==='Enter') SecretFindDifferentGame.sendMessage(document.getElementById('game-container'))">
                        <button onclick="SecretFindDifferentGame.sendMessage(document.getElementById('game-container'))"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
            `;
            // Scroll to bottom after render
            setTimeout(() => {
                const msgs = document.getElementById('chat-messages');
                if (msgs) msgs.scrollTop = msgs.scrollHeight;
            }, 50);
        }

        container.innerHTML = `
            <div class="secret-container">
                ${content}
            </div>
            <style>
                .secret-container { width: 100%; height: 100%; min-height: 400px; display: flex; flex-direction: column; color: white; }
                .secret-menu { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem; padding: 20px; }
                .secret-icon { font-size: 4rem; color: var(--primary); margin-bottom: 10px; }
                .menu-actions { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 250px; }
                
                .secret-form { display: flex; flex-direction: column; gap: 1.5rem; padding: 20px; text-align: left; }
                .back-btn { background: none; border: none; color: var(--primary); font-weight: 600; cursor: pointer; text-align: left; padding: 0; display: flex; align-items: center; gap: 5px; }
                .input-group { display: flex; flex-direction: column; gap: 0.5rem; }
                .input-group label { font-size: 0.85rem; opacity: 0.8; }
                .input-group input { background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 8px; padding: 12px; color: white; }
                
                .secret-chat-room { display: flex; flex-direction: column; height: 450px; background: rgba(0,0,0,0.2); border-radius: 15px; overflow: hidden; }
                .chat-header { background: rgba(59, 130, 246, 0.1); padding: 15px; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid var(--glass-border); }
                .back-btn-icon { background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; }
                .group-name-text { font-weight: 700; color: var(--primary); }
                .group-code-tag { font-size: 0.7rem; opacity: 0.6; }
                
                .chat-messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth; }
                .message { max-width: 80%; padding: 8px 12px; border-radius: 12px; font-size: 0.9rem; position: relative; }
                .message.own { align-self: flex-end; background: var(--primary); color: white; border-bottom-right-radius: 2px; }
                .message:not(.own) { align-self: flex-start; background: rgba(255,255,255,0.1); border-bottom-left-radius: 2px; }
                .sender { font-size: 0.7rem; font-weight: 700; margin-bottom: 2px; opacity: 0.8; }
                .time { font-size: 0.6rem; opacity: 0.6; text-align: right; margin-top: 2px; }
                
                .chat-input-area { padding: 15px; background: rgba(0,0,0,0.3); display: flex; gap: 10px; }
                .chat-input-area input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 20px; padding: 10px 15px; color: white; }
                .chat-input-area button { background: var(--primary); border: none; color: white; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; }
                
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.SecretFindDifferentGame = SecretFindDifferentGame;
