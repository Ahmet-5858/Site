const StatueGame = {
    isMoving: false,
    score: 0,
    state: 'music', // music, silence
    isGameOver: false,

    init(container) {
        this.score = 0;
        this.isMoving = false;
        this.isGameOver = false;
        this.state = 'music';
        this.render(container);
        this.startLoop(container);
    },

    startLoop(container) {
        if (this.isGameOver) return;

        this.state = this.state === 'music' ? 'silence' : 'music';
        const delay = this.state === 'music' ? (2000 + Math.random() * 2000) : (1000 + Math.random() * 1500);

        this.render(container);
        this.timer = setTimeout(() => this.startLoop(container), delay);
    },

    handleMove(isDown, container) {
        if (this.isGameOver) return;
        this.isMoving = isDown;

        if (this.isMoving && this.state === 'silence') {
            this.isGameOver = true;
            this.render(container, 'HAREKET ETTİN! 🗿 Heykel olmalıydın.');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="statue-game">
                <div class="statue-status ${this.state}">
                    <i class="fa-solid ${this.state === 'music' ? 'fa-music fa-beat' : 'fa-hand'}"></i>
                    <h2>${this.state === 'music' ? 'DANS ET!' : 'HEYKEL OL!'}</h2>
                </div>

                <div class="statue-visual">
                    <i class="fa-solid fa-statue-lady ${this.isMoving ? 'active' : ''}"></i>
                </div>

                <div class="game-info">${status || (this.isGameOver ? '' : 'Düğmeye basarken dans et, müzik durunca bırak!')}</div>

                <button class="primary-btn dance-btn" 
                    onmousedown="StatueGame.handleMove(true, document.getElementById('game-container'))"
                    onmouseup="StatueGame.handleMove(false, document.getElementById('game-container'))"
                    onmouseleave="StatueGame.handleMove(false, document.getElementById('game-container'))"
                    ${this.isGameOver ? 'disabled' : ''}>
                    DANS ET 🕺
                </button>
                
                <button class="primary-btn outline" onclick="StatueGame.init(document.getElementById('game-container'))" style="margin-top: 1.5rem;">
                    Sıfırla
                </button>
            </div>
            <style>
                .statue-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .statue-status { margin-bottom: 2rem; transition: 0.3s; }
                .statue-status.music { color: var(--primary); }
                .statue-status.silence { color: #ef4444; }
                .statue-status i { font-size: 3rem; margin-bottom: 10px; }
                .statue-visual { font-size: 5rem; margin-bottom: 2rem; opacity: 0.3; }
                .statue-visual i.active { opacity: 1; color: var(--primary); text-shadow: 0 0 20px var(--primary-glow); }
                .dance-btn { width: 120px; height: 120px; border-radius: 50%; font-size: 1.1rem; font-weight: 900; box-shadow: 0 0 20px var(--primary-glow); }
                .dance-btn:active { background: var(--primary); color: white; }
                .game-info { min-height: 2rem; margin-bottom: 1.5rem; opacity: 0.8; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.StatueGame = StatueGame;
