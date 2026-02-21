const ThumbWarGame = {
    playerPos: 'up', // up, down
    cpuPos: 'up',
    playerScore: 0,
    cpuScore: 0,
    isGameOver: false,
    message: 'Rakibini yakalamak için o aşağıdayken tıkla!',

    init(container) {
        this.playerScore = 0;
        this.cpuScore = 0;
        this.isGameOver = false;
        this.message = 'Rakibini yakalamak için o aşağıdayken tıkla!';
        this.loop(container);
    },

    loop(container) {
        if (this.isGameOver) return;

        // CPU Logic
        if (Math.random() > 0.7) {
            this.cpuPos = this.cpuPos === 'up' ? 'down' : 'up';
        }

        this.render(container);
        this.timer = setTimeout(() => this.loop(container), 500);
    },

    attack(container) {
        if (this.isGameOver) return;

        if (this.cpuPos === 'down') {
            this.playerScore++;
            this.message = 'YAKALADIN! 🎯';
            if (this.playerScore >= 5) {
                this.isGameOver = true;
                this.render(container, 'KAZANDIN! 🏆');
                return;
            }
        } else {
            this.cpuScore++;
            this.message = 'ISKALADIN! 💨 CPU yakaladı!';
            if (this.cpuScore >= 5) {
                this.isGameOver = true;
                this.render(container, 'CPU KAZANDI! 💀');
                return;
            }
        }
        this.render(container);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="thumb-game">
                <div class="score-board">Sen: ${this.playerScore} | CPU: ${this.cpuScore}</div>
                <div class="game-msg">${status || this.message}</div>
                
                <div class="war-area">
                    <div class="thumb cpu ${this.cpuPos}"><i class="fa-solid fa-thumbs-down"></i></div>
                    <div class="thumb player up"><i class="fa-solid fa-thumbs-up"></i></div>
                </div>

                <button class="primary-btn" onclick="ThumbWarGame.attack(document.getElementById('game-container'))" ${this.isGameOver ? 'disabled' : ''}>
                    BASTYIR!
                </button>
                <button class="primary-btn outline" onclick="ThumbWarGame.init(document.getElementById('game-container'))" style="margin-top: 1rem;">
                    Sıfırla
                </button>
            </div>
            <style>
                .thumb-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .score-board { font-weight: 800; color: var(--primary); margin-bottom: 0.5rem; }
                .game-msg { min-height: 2.5rem; font-size: 0.9rem; opacity: 0.8; }
                .war-area { 
                    height: 200px; width: 150px; position: relative; 
                    margin: 1rem 0; background: rgba(255,255,255,0.03); border-radius: 20px;
                    border: 1px solid var(--glass-border); overflow: hidden;
                }
                .thumb { position: absolute; font-size: 4rem; transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .thumb.cpu { top: 20px; left: 50%; transform: translateX(-50%); color: var(--secondary); }
                .thumb.cpu.down { top: 60px; filter: brightness(0.5); }
                .thumb.player { bottom: 20px; left: 50%; transform: translateX(-50%); color: var(--primary); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.ThumbWarGame = ThumbWarGame;
