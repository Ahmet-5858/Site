const BookBalanceGame = {
    balance: 0, // -50 to 50
    score: 0,
    timer: null,
    isGameOver: false,

    init(container) {
        this.balance = 0;
        this.score = 0;
        this.isGameOver = false;
        this.render(container);
        this.startLoop(container);
    },

    startLoop(container) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            // Random tilt
            this.balance += (Math.random() - 0.5) * 10;

            if (Math.abs(this.balance) > 45) {
                this.gameOver(container);
            } else {
                this.score++;
                this.render(container);
            }
        }, 100);
    },

    adjust(dir, container) {
        if (this.isGameOver) return;
        this.balance += dir * 8;
        this.render(container);
    },

    gameOver(container) {
        clearInterval(this.timer);
        this.isGameOver = true;
        this.render(container, 'KİTAP DÜŞTÜ! 📚');
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="balance-game">
                <div class="score-display">Denge Süresi: ${Math.floor(this.score / 10)}s</div>
                <div class="game-info">${status || 'Kitabı dengede tutmak için sağ/sol yap!'}</div>
                
                <div class="balance-area">
                    <div class="head-line"></div>
                    <div class="book" style="transform: translateX(-50%) rotate(${this.balance}deg)">
                        <i class="fa-solid fa-book"></i>
                    </div>
                </div>

                <div class="controls">
                    <button class="primary-btn" onclick="BookBalanceGame.adjust(-1, document.getElementById('game-container'))">← SOL</button>
                    <button class="primary-btn" onclick="BookBalanceGame.adjust(1, document.getElementById('game-container'))">SAĞ →</button>
                </div>

                <button class="primary-btn outline" onclick="BookBalanceGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .balance-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .score-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .balance-area { width: 100%; height: 150px; position: relative; margin-bottom: 3rem; }
                .head-line { position: absolute; bottom: 0; left: 50%; width: 2px; height: 50px; background: var(--glass-border); transform: translateX(-50%); }
                .book { 
                    position: absolute; bottom: 50px; left: 50%; font-size: 4rem; color: var(--primary); 
                    transition: 0.1s linear; transform-origin: bottom center;
                    filter: drop-shadow(0 0 10px var(--primary-glow));
                }
                .controls { display: flex; gap: 20px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.BookBalanceGame = BookBalanceGame;
