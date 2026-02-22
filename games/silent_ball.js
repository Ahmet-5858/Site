const SilentBallGame = {
    score: 0,
    startTime: 0,
    isListening: false,
    threshold: 150, // Simulated noise threshold
    timer: null,

    init(container) {
        this.score = 0;
        this.isListening = false;
        this.render(container);
    },

    start(container) {
        this.score = 0;
        this.isListening = true;
        this.startTime = Date.now();
        this.render(container, 'ŞŞŞT! 🤫 Sessiz kal, topu dengede tut!');

        this.timer = setInterval(() => {
            // Simulate random environmental noise
            const noise = Math.random() * 200;
            if (noise > this.threshold) {
                this.gameOver(container);
            } else {
                this.score = Math.floor((Date.now() - this.startTime) / 100);
                this.render(container, 'Mükemmel sessizlik...');
            }
        }, 200);
    },

    gameOver(container) {
        clearInterval(this.timer);
        this.isListening = false;
        this.render(container, `GÜRÜLTÜ YAPILDI! 🔊 Puanın: ${this.score}`);
    },

    render(container, status = 'Başla dedikten sonra sakın gürültü yapma!') {
        container.innerHTML = `
            <div class="silent-ball">
                <div class="ball-container">
                    <div class="ball ${this.isListening ? 'floating' : ''}">
                        <i class="fa-solid fa-circle"></i>
                    </div>
                </div>

                <div class="score-display">Sessizlik Puanı: ${this.score}</div>
                <div class="game-info">${status}</div>

                <div class="controls">
                    ${!this.isListening ? `
                        <button class="primary-btn pulse" onclick="SilentBallGame.start(document.getElementById('game-container'))">BAŞLAT 🤫</button>
                    ` : `
                        <div class="noise-meter">
                            <div class="meter-fill" style="width: ${Math.random() * 40}%"></div>
                        </div>
                    `}
                </div>

                <button class="primary-btn outline" onclick="SilentBallGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .silent-ball { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .ball-container { height: 150px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
                .ball { font-size: 3rem; color: var(--primary); text-shadow: 0 0 20px var(--primary-glow); }
                .ball.floating { animation: floatBall 2s infinite ease-in-out; }
                .score-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .game-info { font-weight: 700; opacity: 0.8; min-height: 2rem; }
                .noise-meter { width: 200px; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; margin-top: 1rem; }
                .meter-fill { height: 100%; background: #10b981; transition: 0.1s; }
                @keyframes floatBall { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
                .pulse { animation: pulse 2s infinite; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.SilentBallGame = SilentBallGame;
