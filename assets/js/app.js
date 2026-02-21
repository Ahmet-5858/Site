document.addEventListener('DOMContentLoaded', () => {
    // --- STATE & DATA ---
    let currentUser = JSON.parse(localStorage.getItem('gamehub_user')) || null;
    let authMode = 'login'; // 'login' or 'register'

    const games = [
        { id: 1, title: 'XOX (Tic Tac Toe)', icon: 'fa-solid fa-xmark' },
        { id: 2, title: 'SOS', icon: 'fa-solid fa-square-full' },
        { id: 3, title: 'Nokta Birleştirme', icon: 'fa-solid fa-braille' },
        { id: 4, title: 'Adam Asmaca', icon: 'fa-solid fa-person-hanging' },
        { id: 5, title: 'Taş Kağıt Makas', icon: 'fa-solid fa-hand-back-fist' },
        { id: 6, title: '4’lü Bağla', icon: 'fa-solid fa-circle-nodes' },
        { id: 7, title: 'Amiral Battı', icon: 'fa-solid fa-ship' },
        { id: 8, title: 'Kelime Zinciri', icon: 'fa-solid fa-link' },
        { id: 9, title: '20 Soru Oyunu', icon: 'fa-solid fa-person-circle-question' },
        { id: 10, title: 'Hangisini seçerdin?', icon: 'fa-solid fa-code-fork' },
        { id: 11, title: 'Doğruluk mu Cesaret mi', icon: 'fa-solid fa-bolt' },
        { id: 12, title: 'Aklımdan ne geçiyor?', icon: 'fa-solid fa-brain' },
        { id: 13, title: 'İsim-Şehir-Hayvan-Eşya', icon: 'fa-solid fa-table-list' },
        { id: 14, title: 'Alfabe Oyunu', icon: 'fa-solid fa-font' },
        { id: 15, title: 'Hafıza Oyunu', icon: 'fa-solid fa-puzzle-piece' },
        { id: 16, title: 'El Üstü Vurma Oyunu', icon: 'fa-solid fa-hand-sparkles' },
        { id: 17, title: 'Başparmak Savaşı', icon: 'fa-solid fa-thumbs-up' },
        { id: 18, title: 'Bilek Güreşi', icon: 'fa-solid fa-handshake' },
        { id: 19, title: 'Kağıt Futbolu', icon: 'fa-solid fa-futbol' },
        { id: 20, title: 'Labirent Çizme Oyunu', icon: 'fa-solid fa-route' },
        { id: 21, title: 'Çiz ve Tahmin Et', icon: 'fa-solid fa-palette' },
        { id: 22, title: 'Simon Diyor ki', icon: 'fa-solid fa-volume-high' },
        { id: 23, title: 'Kırmızı Işık Yeşil Işık', icon: 'fa-solid fa-traffic-light' },
        { id: 24, title: 'Heykel Oyunu', icon: 'fa-solid fa-statue-lady' },
        { id: 25, title: '7 Boom', icon: 'fa-solid fa-bomb' },
        { id: 26, title: 'Sayı Tahmin Etme', icon: 'fa-solid fa-hashtag' },
        { id: 27, title: 'Nim Oyunu', icon: 'fa-solid fa-align-justify' },
        { id: 28, title: 'Çubuk Toplama', icon: 'fa-solid fa-grip-lines' },
        { id: 29, title: 'Kağıt Falı', icon: 'fa-solid fa-wand-sparkles' },
        { id: 30, title: 'MASH Oyunu', icon: 'fa-solid fa-house-chimney' },
        { id: 31, title: 'Karışık Kelime', icon: 'fa-solid fa-shuffle' },
        { id: 32, title: 'Palindrom Bulma', icon: 'fa-solid fa-arrows-left-right' },
        { id: 33, title: 'Alkış Ritmi', icon: 'fa-solid fa-hands-clapping' },
        { id: 34, title: 'Chopsticks', icon: 'fa-solid fa-utensils' },
        { id: 35, title: 'Yazı Tura Tahmini', icon: 'fa-solid fa-coins' },
        { id: 36, title: 'Kağıt Uçak Yarışması', icon: 'fa-solid fa-paper-plane' },
        { id: 37, title: 'Sessiz Top', icon: 'fa-solid fa-circle' },
        { id: 38, title: 'Lideri Takip Et', icon: 'fa-solid fa-users-viewfinder' },
        { id: 39, title: 'Gölge Tahmini', icon: 'fa-solid fa-moon' },
        { id: 40, title: 'Ses Tahmini', icon: 'fa-solid fa-ear-listen' },
        { id: 41, title: 'Kalemi Kaldırmadan Çizme', icon: 'fa-solid fa-pen-nib' },
        { id: 42, title: 'Morse Kodu', icon: 'fa-solid fa-ellipsis' },
        { id: 43, title: 'Gizli Kod', icon: 'fa-solid fa-user-secret' },
        { id: 44, title: 'Hazine Bulma', icon: 'fa-solid fa-gem' },
        { id: 45, title: 'Çizgi Tamamlama', icon: 'fa-solid fa-pencil' },
        { id: 46, title: 'Kare Tamamlama', icon: 'fa-solid fa-vector-square' },
        { id: 47, title: 'Refleks Parmak', icon: 'fa-solid fa-bolt-lightning' },
        { id: 48, title: 'Kitap Dengeleme', icon: 'fa-solid fa-book' },
        { id: 49, title: 'Hızlı Masaya Vurma', icon: 'fa-solid fa-hand-back-fist' },
        { id: 50, title: 'El Üst Üste', icon: 'fa-solid fa-hand-holding' },
        { id: 51, title: 'Katil Göz Kırpma', icon: 'fa-solid fa-eye' },
        { id: 52, title: 'Yasak Kelime', icon: 'fa-solid fa-ban' },
        { id: 53, title: 'İki Doğru Bir Yalan', icon: 'fa-solid fa-masks-theater' },
        { id: 54, title: 'Kelime Çağrışım', icon: 'fa-solid fa-brain' },
        { id: 55, title: 'İnsan Düğümü', icon: 'fa-solid fa-people-arrows' },
        { id: 56, title: 'Sayı Örüntüsü', icon: 'fa-solid fa-arrow-up-9-1' },
        { id: 57, title: 'Hızlı Kategori', icon: 'fa-solid fa-bolt' },
        { id: 58, title: 'Grup Oyunu', icon: 'fa-solid fa-user-secret', secret: true },
    ];

    // --- DOM ELEMENTS ---
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const authForm = document.getElementById('auth-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const nameGroup = document.getElementById('name-group');
    const authSubmit = document.getElementById('auth-submit');
    const authMessage = document.getElementById('auth-message');
    const gamesGrid = document.getElementById('games-grid');
    const displayUsername = document.getElementById('display-username');
    const logoutBtn = document.getElementById('logout-btn');
    const gameModal = document.getElementById('game-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const gameContainer = document.getElementById('game-container');

    // --- INITIAL CHECK ---
    if (currentUser) {
        showDashboard();
    }

    // --- AUTH LOGIC ---
    tabLogin.addEventListener('click', () => setAuthMode('login'));
    tabRegister.addEventListener('click', () => setAuthMode('register'));

    function setAuthMode(mode) {
        authMode = mode;
        authMessage.textContent = '';
        if (mode === 'login') {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            nameGroup.style.display = 'none';
            authSubmit.textContent = 'Giriş Yap';
            document.querySelector('.subtitle').textContent = 'Eğlenceye girmek için oturum açın';
        } else {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            nameGroup.style.display = 'flex';
            authSubmit.textContent = 'Kayıt Ol';
            document.querySelector('.subtitle').textContent = 'Yeni bir macera için hesap oluşturun';
        }
    }

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const username = document.getElementById('username').value;

        if (authMode === 'register') {
            // Simple validation
            if (!username || !email || !password) {
                authMessage.textContent = 'Lütfen tüm alanları doldurun.';
                return;
            }
            const newUser = { username, email, password };
            localStorage.setItem('gamehub_user', JSON.stringify(newUser));
            currentUser = newUser;
            showToast('Başarıyla kayıt oldunuz! 🎉');
            showDashboard();
        } else {
            // Demo Login logic
            const storedUser = JSON.parse(localStorage.getItem('gamehub_user'));
            if (storedUser && storedUser.email === email && storedUser.password === password) {
                currentUser = storedUser;
                showToast('Tekrar hoş geldin! 👋');
                showDashboard();
            } else {
                authMessage.textContent = 'Hatalı e-posta veya şifre.';
            }
        }
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('gamehub_user');
        currentUser = null;
        dashboardSection.classList.add('hidden');
        authSection.classList.remove('hidden');
        showToast('Çıkış yapıldı.');
    });

    function showDashboard() {
        authSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
        displayUsername.textContent = currentUser.username;
        renderGames();
    }

    // --- DASHBOARD LOGIC ---
    function renderGames() {
        gamesGrid.innerHTML = '';
        games.forEach(game => {
            const card = document.createElement('div');
            card.className = `game-card glass ${game.secret ? 'secret-game' : ''}`;
            card.innerHTML = `
                <span class="game-num">#${game.id}</span>
                <i class="${game.icon} game-icon"></i>
                <h3>${game.title}</h3>
            `;
            card.addEventListener('click', () => openGame(game));
            gamesGrid.appendChild(card);
        });
    }

    function openGame(game) {

        modalTitle.textContent = game.title;
        gameModal.classList.remove('hidden');

        if (game.id === 1) {
            XOXGame.init(gameContainer);
        } else if (game.id === 2) {
            SOSGame.init(gameContainer);
        } else if (game.id === 3) {
            DotsBoxesGame.init(gameContainer);
        } else if (game.id === 4) {
            HangmanGame.init(gameContainer);
        } else if (game.id === 5) {
            RockPaperScissorsGame.init(gameContainer);
        } else if (game.id === 6) {
            Connect4Game.init(gameContainer);
        } else if (game.id === 7) {
            BattleshipGame.init(gameContainer);
        } else if (game.id === 8) {
            WordChainGame.init(gameContainer);
        } else if (game.id === 9) {
            TwentyQuestionsGame.init(gameContainer);
        } else if (game.id === 10) {
            WouldYouRatherGame.init(gameContainer);
        } else if (game.id === 11) {
            TruthOrDareGame.init(gameContainer);
        } else if (game.id === 12) {
            ISpyGame.init(gameContainer);
        } else if (game.id === 13) {
            NameCityGame.init(gameContainer);
        } else if (game.id === 14) {
            AlphabetGame.init(gameContainer);
        } else if (game.id === 15) {
            MemoryGame.init(gameContainer);
        } else if (game.id === 16) {
            SlapReflexGame.init(gameContainer);
        } else if (game.id === 17) {
            ThumbWarGame.init(gameContainer);
        } else if (game.id === 18) {
            ArmWrestlingGame.init(gameContainer);
        } else if (game.id === 19) {
            PaperSoccerGame.init(gameContainer);
        } else if (game.id === 20) {
            MazeGame.init(gameContainer);
        } else if (game.id === 21) {
            PictionaryGame.init(gameContainer);
        } else if (game.id === 22) {
            SimonSaysGame.init(gameContainer);
        } else if (game.id === 23) {
            RedLightGreenLightGame.init(gameContainer);
        } else if (game.id === 24) {
            StatueGame.init(gameContainer);
        } else if (game.id === 25) {
            SevenBoomGame.init(gameContainer);
        } else if (game.id === 26) {
            NumberGuessGame.init(gameContainer);
        } else if (game.id === 27) {
            NimGame.init(gameContainer);
        } else if (game.id === 28) {
            StickGame.init(gameContainer);
        } else if (game.id === 29) {
            PaperFortuneGame.init(gameContainer);
        } else if (game.id === 30) {
            MashGame.init(gameContainer);
        } else if (game.id === 31) {
            ScrambledWordGame.init(gameContainer);
        } else if (game.id === 32) {
            PalindromeGame.init(gameContainer);
        } else if (game.id === 33) {
            RhythmGame.init(gameContainer);
        } else if (game.id === 34) {
            ChopsticksGame.init(gameContainer);
        } else if (game.id === 35) {
            CoinFlipGuessGame.init(gameContainer);
        } else if (game.id === 36) {
            PaperPlaneGame.init(gameContainer);
        } else if (game.id === 37) {
            SilentBallGame.init(gameContainer);
        } else if (game.id === 38) {
            FollowLeaderGame.init(gameContainer);
        } else if (game.id === 39) {
            ShadowGuessGame.init(gameContainer);
        } else if (game.id === 40) {
            SoundGuessGame.init(gameContainer);
        } else if (game.id === 41) {
            OneLineDrawGame.init(gameContainer);
        } else if (game.id === 42) {
            MorseCodeGame.init(gameContainer);
        } else if (game.id === 43) {
            SecretCodeGame.init(gameContainer);
        } else if (game.id === 44) {
            TreasureHuntGame.init(gameContainer);
        } else if (game.id === 45) {
            LineCompletionGame.init(gameContainer);
        } else if (game.id === 46) {
            SquareCompletionGame.init(gameContainer);
        } else if (game.id === 47) {
            ReflexFingerGame.init(gameContainer);
        } else if (game.id === 48) {
            BookBalanceGame.init(gameContainer);
        } else if (game.id === 49) {
            TableTapperGame.init(gameContainer);
        } else if (game.id === 50) {
            HandStackGame.init(gameContainer);
        } else if (game.id === 51) {
            WinkMurdererGame.init(gameContainer);
        } else if (game.id === 52) {
            ForbiddenWordGame.init(gameContainer);
        } else if (game.id === 53) {
            TwoTruthsOneLieGame.init(gameContainer);
        } else if (game.id === 54) {
            WordAssociationGame.init(gameContainer);
        } else if (game.id === 55) {
            HumanKnotGame.init(gameContainer);
        } else if (game.id === 56) {
            NumberPatternGame.init(gameContainer);
        } else if (game.id === 57) {
            FastCategoryGame.init(gameContainer);
        } else if (game.id === 58) {
            SecretFindDifferentGame.init(gameContainer);
        } else {
            gameContainer.innerHTML = `<div style="text-align:center">
                <p class="subtitle">${game.title} yükleniyor...</p>
                <div style="margin-top:20px"><i class="fa-solid fa-circle-notch fa-spin" style="font-size:2rem; color:var(--primary)"></i></div>
                <br>
                <p style="opacity:0.6; font-size:0.9rem">Bu oyunun mantığı yakında eklenecektir.</p>
            </div>`;
        }
    }

    closeModal.addEventListener('click', () => {
        gameModal.classList.add('hidden');
    });

    // --- UTILS ---
    function showToast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});
