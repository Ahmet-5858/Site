const SecretFindDifferentGame = {
    currentGroup: null,
    currentGroupName: null,

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

        this.groups[code] = { name: name };
        this.saveGroups();

        this.currentGroup = code;
        this.currentGroupName = name;

        this.render(container, 'chat');

        firebaseListenMessages(code);

    },

    joinGroup(container) {

        const code = document.getElementById('join-code').value;

        if (!code) {
            alert('Lütfen bir kod girin!');
            return;
        }

        this.currentGroup = code;

        const saved = this.groups[code];
        this.currentGroupName = saved?.name || code;

        this.render(container, 'chat');

        firebaseListenMessages(code);

    },

    sendMessage(container) {

        const input = document.getElementById('message-input');

        const text = input.value.trim();

        if (!text || !this.currentGroup) return;

        firebaseSendMessage(this.currentGroup, text);

        input.value = '';

    },

    render(container, view = 'menu') {

        let content = '';

        if (view === 'menu') {

            content = `
            <div class="secret-menu">
                <h2>Gizli Mesajlaşma</h2>

                <button onclick="SecretFindDifferentGame.showJoinGroup(document.getElementById('game-container'))">
                Gruba Gir
                </button>

                <button onclick="SecretFindDifferentGame.showCreateGroup(document.getElementById('game-container'))">
                Grup Oluştur
                </button>

            </div>
            `;

        }

        else if (view === 'create') {

            content = `
            <div>

                <button onclick="SecretFindDifferentGame.init(document.getElementById('game-container'))">
                Geri
                </button>

                <h3>Grup Oluştur</h3>

                <input id="group-name" placeholder="Grup adı">

                <input id="group-code" placeholder="Grup kodu">

                <button onclick="SecretFindDifferentGame.createGroup(document.getElementById('game-container'))">
                Oluştur
                </button>

            </div>
            `;

        }

        else if (view === 'join') {

            content = `
            <div>

                <button onclick="SecretFindDifferentGame.init(document.getElementById('game-container'))">
                Geri
                </button>

                <h3>Gruba Gir</h3>

                <input id="join-code" placeholder="Grup kodu">

                <button onclick="SecretFindDifferentGame.joinGroup(document.getElementById('game-container'))">
                Gir
                </button>

            </div>
            `;

        }

        else if (view === 'chat') {

            content = `
            <div>

                <button onclick="SecretFindDifferentGame.init(document.getElementById('game-container'))">
                Geri
                </button>

                <h3>${this.currentGroupName}</h3>

                <div id="chat-messages" style="height:300px; overflow:auto; border:1px solid gray; padding:10px;">
                </div>

                <input
                id="message-input"
                placeholder="Mesaj"
                onkeypress="if(event.key==='Enter') SecretFindDifferentGame.sendMessage(document.getElementById('game-container'))"
                >

                <button onclick="SecretFindDifferentGame.sendMessage(document.getElementById('game-container'))">
                Gönder
                </button>

            </div>
            `;

        }

        container.innerHTML = content;

    }

};

window.SecretFindDifferentGame = SecretFindDifferentGame;



// FIREBASE MESAJ GÖNDER
function firebaseSendMessage(groupCode, text) {

    const username =
    JSON.parse(localStorage.getItem('gamehub_user'))?.username
    || "Misafir";

    push(
        ref(db, "groups/" + groupCode + "/messages"),
        {
            text: text,
            sender: username,
            time: Date.now()
        }
    );

}



// FIREBASE MESAJ DİNLE
function firebaseListenMessages(groupCode) {

    const messagesRef =
    ref(db, "groups/" + groupCode + "/messages");

    const chat =
    document.getElementById("chat-messages");

    chat.innerHTML = "";

    onChildAdded(messagesRef, function(snapshot) {

        const msg = snapshot.val();

        const div = document.createElement("div");

        div.innerHTML =
        "<b>" + msg.sender + "</b>: "
        + msg.text;

        chat.appendChild(div);

        chat.scrollTop = chat.scrollHeight;

    });

}



