const SecretFindDifferentGame = {
    container: null,
    currentGroup: null,
    db: null,

    init(container) {
        this.container = container;
        this.db = window.db;
        this.currentGroup = null;
        this.render('menu');
    },

    showCreateGroup() {
        this.render('create');
    },

    showJoinGroup() {
        this.render('join');
    },

    createGroup() {
        const nameInput = document.getElementById('group-name');
        const codeInput = document.getElementById('group-code');
        const name = nameInput ? nameInput.value : '';
        const code = codeInput ? codeInput.value : '';

        if (!name || !code) {
            alert('Lütfen grup adı ve kodu girin!');
            return;
        }

        this.db.ref('groups/' + code).once('value').then(snapshot => {
            if (snapshot.exists()) {
                alert('Bu kod zaten kullanımda!');
            } else {
                this.db.ref('groups/' + code).set({
                    name: name,
                    createdAt: Date.now(),
                    creator: JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir'
                }).then(() => {
                    this.currentGroup = code;
                    this.openChat(code);
                });
            }
        }).catch(err => {
            console.error("Firebase error:", err);
            alert("Grup oluşturulurken bir hata oluştu.");
        });
    },

    joinGroup() {
        const codeInput = document.getElementById('join-code');
        const code = codeInput ? codeInput.value : '';

        if (!code) {
            alert('Lütfen bir kod girin!');
            return;
        }

        this.db.ref('groups/' + code).once('value').then(snapshot => {
            if (snapshot.exists()) {
                this.currentGroup = code;
                this.openChat(code);
            } else {
                alert('Grup bulunamadı! ❌');
            }
        }).catch(err => {
            console.error("Firebase error:", err);
            alert("Gruba katılırken bir hata oluştu.");
        });
    },

    openChat(code) {
        this.render('chat');
        this.listenForMessages(code);
    },

    listenForMessages(code) {
        const chatMsgsRef = this.db.ref('messages/' + code);
        chatMsgsRef.on('value', (snapshot) => {
            if (this.currentGroup === code) {
                const messages = [];
                snapshot.forEach(childSnapshot => {
                    messages.push({ id: childSnapshot.key, ...childSnapshot.val() });
                });
                this.updateChatUI(messages);
            }
        });
    },

    async sendMessage() {
        const input = document.getElementById('message-input');
        const text = input ? input.value.trim() : '';

        if (!text) return;
        if (!this.currentGroup) return;

        const currentUsername = JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir';

        const msg = {
            sender: currentUsername,
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now()
        };

        try {
            await this.db.ref('messages/' + this.currentGroup).push(msg);
            if (input) input.value = '';
        } catch (error) {
            console.error("Send error:", error);
            alert("Mesaj gönderilemedi.");
        }
    },

    updateChatUI(messages) {
        const chatMsgs = document.getElementById('chat-messages');
        if (!chatMsgs) return;

        const currentUsername = JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir';

        chatMsgs.innerHTML = messages.map(m => {
            const isOwn = m.sender === currentUsername;
            return `
                <div class="message-wrapper ${isOwn ? 'own-wrapper' : ''}">
                    <div class="message ${isOwn ? 'own' : ''}">
                        <div class="message-content">
                            ${!isOwn ? `<div class="sender">${m.sender}</div>` : ''}
                            <div class="text">${m.text}</div>
                            <div class="time">${m.time}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        chatMsgs.scrollTop = chatMsgs.scrollHeight;
    },

    render(view = 'menu') {
        let content = '';

        if (view === 'menu') {
            content = `
                <div class="secret-menu">
                    <div class="secret-icon"><i class="fa-solid fa-comments"></i></div>
                    <h2>Sohbet Odası</h2>
                    <p>Arkadaşlarınla basitçe sohbet et.</p>
                    <div class="menu-actions">
                        <button class="primary-btn" onclick="SecretFindDifferentGame.showJoinGroup()">
                            <i class="fa-solid fa-right-to-bracket"></i> Gruba Gir
                        </button>
                        <button class="primary-btn outline" onclick="SecretFindDifferentGame.showCreateGroup()">
                            <i class="fa-solid fa-plus"></i> Grup Oluştur
                        </button>
                    </div>
                </div>
            `;
        } else if (view === 'create') {
            content = `
                <div class="secret-form">
                    <button class="back-btn" onclick="SecretFindDifferentGame.init(SecretFindDifferentGame.container)"><i class="fa-solid fa-arrow-left"></i> Geri</button>
                    <h3>Grup Oluştur</h3>
                    <div class="input-group">
                        <label>Grup Adı</label>
                        <input type="text" id="group-name" placeholder="Örn: Arkadaş Grubu">
                    </div>
                    <div class="input-group">
                        <label>Grup Kodu (Özel)</label>
                        <input type="text" id="group-code" placeholder="Örn: 5858">
                    </div>
                    <button class="primary-btn" onclick="SecretFindDifferentGame.createGroup()">KUR VE GİR</button>
                </div>
            `;
        } else if (view === 'join') {
            content = `
                <div class="secret-form">
                    <button class="back-btn" onclick="SecretFindDifferentGame.init(SecretFindDifferentGame.container)"><i class="fa-solid fa-arrow-left"></i> Geri</button>
                    <h3>Gruba Katıl</h3>
                    <div class="input-group">
                        <label>Grup Kodu</label>
                        <input type="text" id="join-code" placeholder="Kodu buraya yazın...">
                    </div>
                    <button class="primary-btn" onclick="SecretFindDifferentGame.joinGroup()">KATIL</button>
                </div>
            `;
        } else if (view === 'chat' && this.currentGroup) {
            content = `
                <div class="secret-chat-room">
                    <div class="chat-header">
                        <button class="back-btn-icon" onclick="SecretFindDifferentGame.init(SecretFindDifferentGame.container)"><i class="fa-solid fa-chevron-left"></i></button>
                        <div class="group-info">
                            <div class="group-name-text" id="active-group-name">Yükleniyor...</div>
                            <div class="group-code-tag">Kod: ${this.currentGroup}</div>
                        </div>
                    </div>
                    <div class="chat-messages" id="chat-messages"></div>
                    <div class="chat-input-area">
                        <input type="text" id="message-input" placeholder="Mesaj yazın..." onkeypress="if(event.key==='Enter') SecretFindDifferentGame.sendMessage()">
                        <button class="send-btn" onclick="SecretFindDifferentGame.sendMessage()"><i class="fa-solid fa-paper-plane"></i></button>
                    </div>
                </div>
            `;

            this.db.ref('groups/' + this.currentGroup).once('value').then(snap => {
                const nameText = document.getElementById('active-group-name');
                if (nameText) nameText.textContent = snap.val()?.name || 'Grup';
            });
        }

        this.container.innerHTML = `
            <div class="secret-container">
                ${content}
            </div>
            <style>
                .secret-container { width: 100%; height: 100%; min-height: 450px; display: flex; flex-direction: column; color: white; }
                .secret-menu { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 1rem; padding: 20px; text-align: center; }
                .secret-icon { font-size: 4rem; color: #25D366; margin-bottom: 10px; }
                .menu-actions { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 250px; }
                
                .secret-form { display: flex; flex-direction: column; gap: 1.5rem; padding: 20px; text-align: left; }
                .back-btn { background: none; border: none; color: #25D366; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 5px; }
                
                .secret-chat-room { display: flex; flex-direction: column; height: 500px; background: #0b141a; border-radius: 12px; overflow: hidden; position: relative; }
                .chat-header { background: #1f2c33; padding: 10px 15px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
                .back-btn-icon { background: none; border: none; color: #8696a0; cursor: pointer; font-size: 1.2rem; }
                .group-name-text { font-weight: 600; font-size: 1rem; color: #e9edef; }
                .group-code-tag { font-size: 0.75rem; color: #8696a0; }
                
                .chat-messages { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 4px; background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'); background-repeat: repeat; }
                
                .message-wrapper { display: flex; width: 100%; margin-bottom: 2px; }
                .own-wrapper { justify-content: flex-end; }
                
                .message { max-width: 85%; padding: 6px 8px; border-radius: 8px; font-size: 0.95rem; position: relative; min-width: 60px; }
                .message.own { background: #005c4b; color: #e9edef; border-top-right-radius: 0; }
                .message:not(.own) { background: #202c33; color: #e9edef; border-top-left-radius: 0; }
                
                .sender { font-size: 0.75rem; font-weight: 700; margin-bottom: 2px; color: #ecc354; }
                .own .sender { display: none; }
                
                .time { font-size: 0.65rem; opacity: 0.6; text-align: right; margin-top: 2px; }
                
                .chat-input-area { padding: 10px; background: #1f2c33; display: flex; gap: 8px; align-items: center; }
                .chat-input-area input[type="text"] { flex: 1; background: #2a3942; border: none; border-radius: 20px; padding: 10px 15px; color: #e9edef; outline: none; }
                .send-btn { background: none; border: none; color: #25D366; font-size: 1.3rem; cursor: pointer; padding: 5px; }
                
                .hidden { display: none !important; }
                .primary-btn { background: #25D366; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; }
                .primary-btn:hover { background: #1ea34d; }
                .outline { background: none; border: 1px solid #25D366; color: #25D366; }
            </style>
        `;
    }
};

window.SecretFindDifferentGame = SecretFindDifferentGame;
