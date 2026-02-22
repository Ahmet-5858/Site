const NimGame = {
    sticks: 15,
    maxTake: 3,
    isGameOver: false,
    currentPlayer: 1, // 1: User, 2: CPU

    init(container) {
        this.sticks = 15;
        this.isGameOver = false;
        this.currentPlayer = 1;
        this.render(container);
    },

    take(count, container) {
        if (this.isGameOver || this.currentPlayer !== 1) return;
        this.sticks -= count;

        if (this.sticks <= 0) {
            this.isGameOver = true;
            this.render(container, 'SON ÇUBUĞU ALDIN! KAYBETTİN! 💀');
            return;
        }

        this.currentPlayer = 2;
        this.render(container);
        setTimeout(() => this.cpuTurn(container), 1000);
    },

    cpuTurn(container) {
        if (this.isGameOver) return;

        // Winning strategy: leave 4*n + 1 sticks
        let count = (this.sticks - 1) % (this.maxTake + 1);
        if (count === 0) count = Math.floor(Math.random() * this.maxTake) + 1;
        count = Math.min(count, this.sticks);

        this.sticks -= count;
        if (this.sticks <= 0) {
            this.isGameOver = true;
            this.render(container, 'CPU SON ÇUBUĞU ALDI! KAZANDIN! 🏆');
            return;
        }

        this.currentPlayer = 1;
        this.render(container);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="nim-game">
                <div class="game-info">${status || (this.currentPlayer === 1 ? 'Sıra Sende!' : 'CPU Düşünüyor...')}</div>
                <div class="sticks-container">
                    ${Array(this.sticks).fill(0).map(() => '<div class="stick"></div>').join('')}
                </div>
                
                <div class="controls">
                    ${[1, 2, 3].map(n => `
                        <button class="primary-btn ${this.sticks < n || this.isGameOver || this.currentPlayer !== 1 ? 'disabled' : ''}" 
                                onclick="NimGame.take(${n}, document.getElementById('game-container'))">
                            ${n} Çubuk Al
                        </button>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="NimGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .nim-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .sticks-container { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 3rem; max-width: 300px; }
                .stick { width: 10px; height: 80px; background: linear-gradient(180deg, var(--primary), var(--primary-glow)); border-radius: 5px; box-shadow: 0 0 10px var(--primary-glow); }
                .controls { display: flex; gap: 10px; }
                .disabled { opacity: 0.3; pointer-events: none; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.NimGame = NimGame;
