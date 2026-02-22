const SecretFindDifferentGame = {
    container: null,
    currentGroup: null,
    db: null,
    storage: null,
    replyContext: null,

    init(container) {
        this.container = container;
        this.db = window.db;
        this.storage = window.storage;
        this.currentGroup = null;
        this.replyContext = null;
        this.render('menu');
    },

    showCreateGroup() {
        this.render('create');
    },

    showJoinGroup() {
        this.render('join');
    },

    createGroup() {
        const name = document.getElementById('group-name').value;
        const code = document.getElementById('group-code').value;

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
        });
    },

    joinGroup() {
        const code = document.getElementById('join-code').value;

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
        const text = input.value.trim();

        if (!text && !this.replyContext) return;
        if (!this.currentGroup) return;

        const currentUsername = JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir';

        const msg = {
            sender: currentUsername,
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now()
        };

        if (this.replyContext) {
            msg.replyTo = this.replyContext;
            this.clearReply();
        }

        await this.db.ref('messages/' + this.currentGroup).push(msg);
        input.value = '';
    },

    async uploadPhoto(event) {
        const file = event.target.files[0];
        if (!file || !this.currentGroup) return;

        const storageRef = this.storage.ref(`chat_photos/${this.currentGroup}/${Date.now()}_${file.name}`);

        try {
            // Show a temporary loading state or something if needed
            const snapshot = await storageRef.put(file);
            const url = await snapshot.ref.getDownloadURL();

            const currentUsername = JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir';
            const msg = {
                sender: currentUsername,
                image: url,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now()
            };

            await this.db.ref('messages/' + this.currentGroup).push(msg);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Fotoğraf yüklenemedi!");
        }
    },

    deleteMessage(msgId) {
        if (confirm('Bu mesajı herkesten silmek istediğine emin misin?')) {
            this.db.ref(`messages/${this.currentGroup}/${msgId}`).remove();
        }
    },

    setReply(msgId, sender, text) {
        this.replyContext = { msgId, sender, text: text || "[Fotoğraf]" };
        const replyArea = document.getElementById('reply-preview');
        if (replyArea) {
            replyArea.innerHTML = `
                <div class="reply-preview-box">
                    <div class="reply-info">
                        <span class="reply-sender">${sender}</span>
                        <span class="reply-text">${text || "Fotoğraf"}</span>
                    </div>
                    <button class="close-reply" onclick="SecretFindDifferentGame.clearReply()"><i class="fa-solid fa-xmark"></i></button>
                </div>
            `;
            replyArea.classList.remove('hidden');
        }
        document.getElementById('message-input').focus();
    },

    clearReply() {
        this.replyContext = null;
        const replyArea = document.getElementById('reply-preview');
        if (replyArea) {
            replyArea.innerHTML = '';
            replyArea.classList.add('hidden');
        }
    },

    updateChatUI(messages) {
        const chatMsgs = document.getElementById('chat-messages');
        if (!chatMsgs) return;

        const currentUsername = JSON.parse(localStorage.getItem('gamehub_user'))?.username || 'Misafir';

        chatMsgs.innerHTML = messages.map(m => `
            <div class="message-wrapper ${m.sender === currentUsername ? 'own-wrapper' : ''}">
                <div class="message ${m.sender === currentUsername ? 'own' : ''}" id="msg-${m.id}">
                    <div class="message-content" onclick="SecretFindDifferentGame.showActions('${m.id}')">
                        <div class="sender">${m.sender}</div>
                        ${m.replyTo ? `
                            <div class="replied-snippet">
                                <div class="replied-sender">${m.replyTo.sender}</div>
                                <div class="replied-text">${m.replyTo.text}</div>
                            </div>
                        ` : ''}
                        ${m.image ? `<img src="${m.image}" class="chat-img" onclick="window.open('${m.image}', '_blank')">` : ''}
                        ${m.text ? `<div class="text">${m.text}</div>` : ''}
                        <div class="time">${m.time}</div>
                    </div>
                    <div class="message-actions hidden" id="actions-${m.id}">
                        <button onclick="SecretFindDifferentGame.setReply('${m.id}', '${m.sender}', '${m.text || ''}')"><i class="fa-solid fa-reply"></i> Yanıtla</button>
                        ${m.sender === currentUsername ? `<button class="delete-btn" onclick="SecretFindDifferentGame.deleteMessage('${m.id}')"><i class="fa-solid fa-trash"></i> Sil</button>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        chatMsgs.scrollTop = chatMsgs.scrollHeight;
    },

    showActions(msgId) {
        // Toggle actions for this message
        const actions = document.getElementById(`actions-${msgId}`);
        const allActions = document.querySelectorAll('.message-actions');
        allActions.forEach(el => {
            if (el.id !== `actions-${msgId}`) el.classList.add('hidden');
        });
        if (actions) actions.classList.toggle('hidden');
    },

    render(view = 'menu') {
        let content = '';

        if (view === 'menu') {
            content = `
                <div class="secret-menu">
                    <div class="secret-icon"><i class="fa-solid fa-comments"></i></div>
                    <h2>Sohbet Odası</h2>
                    <p>WhatsApp tarzı gelişmiş özelliklerle arkadaşlarınla konuş.</p>
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
                    <div id="reply-preview" class="reply-preview hidden"></div>
                    <div class="chat-input-area">
                        <input type="file" id="photo-input" hidden accept="image/*" onchange="SecretFindDifferentGame.uploadPhoto(event)">
                        <button class="attach-btn" onclick="document.getElementById('photo-input').click()"><i class="fa-solid fa-plus"></i></button>
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
                
                .message { max-width: 85%; padding: 6px 8px; border-radius: 8px; font-size: 0.95rem; position: relative; min-width: 60px; cursor: pointer; transition: transform 0.1s; }
                .message:active { transform: scale(0.98); }
                .message.own { background: #005c4b; color: #e9edef; border-top-right-radius: 0; }
                .message:not(.own) { background: #202c33; color: #e9edef; border-top-left-radius: 0; }
                
                .sender { font-size: 0.75rem; font-weight: 700; margin-bottom: 2px; color: #ecc354; }
                .own .sender { display: none; }
                
                .time { font-size: 0.65rem; opacity: 0.6; text-align: right; margin-top: 2px; }
                .chat-img { max-width: 100%; border-radius: 6px; margin: 5px 0; }
                
                .replied-snippet { background: rgba(0,0,0,0.2); border-left: 4px solid #25D366; padding: 5px 8px; border-radius: 4px; margin-bottom: 5px; font-size: 0.85rem; opacity: 0.9; }
                .replied-sender { font-weight: 700; color: #25D366; font-size: 0.75rem; }
                .replied-text { color: #8696a0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                
                .message-actions { position: absolute; z-index: 10; background: #233138; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 5px; top: 100%; left: 0; display: flex; flex-direction: column; gap: 5px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
                .own .message-actions { left: auto; right: 0; }
                .message-actions button { background: none; border: none; color: #e9edef; padding: 8px 15px; text-align: left; cursor: pointer; font-size: 0.85rem; display: flex; align-items: center; gap: 10px; white-space: nowrap; }
                .message-actions button:hover { background: rgba(255,255,255,0.05); }
                .delete-btn { color: #f15c5c !important; }
                
                .reply-preview { background: #1f2c33; padding: 8px 12px; border-top: 1px solid rgba(255,255,255,0.05); }
                .reply-preview-box { background: rgba(0,0,0,0.2); border-left: 4px solid #25D366; padding: 5px 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; }
                .reply-info { display: flex; flex-direction: column; }
                .reply-sender { font-size: 0.75rem; font-weight: 700; color: #25D366; }
                .reply-text { font-size: 0.85rem; color: #8696a0; }
                .close-reply { background: none; border: none; color: #8696a0; cursor: pointer; }
                
                .chat-input-area { padding: 10px; background: #1f2c33; display: flex; gap: 8px; align-items: center; }
                .chat-input-area input[type="text"] { flex: 1; background: #2a3942; border: none; border-radius: 20px; padding: 10px 15px; color: #e9edef; outline: none; }
                .attach-btn, .send-btn { background: none; border: none; color: #8696a0; font-size: 1.3rem; cursor: pointer; padding: 5px; }
                .send-btn { color: #25D366; }
                
                .hidden { display: none !important; }
                .primary-btn { background: #25D366; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; }
                .primary-btn:hover { background: #1ea34d; }
                .outline { background: none; border: 1px solid #25D366; color: #25D366; }
            </style>
        `;
    }
};

window.SecretFindDifferentGame = SecretFindDifferentGame;

window.SecretFindDifferentGame = SecretFindDifferentGame;
