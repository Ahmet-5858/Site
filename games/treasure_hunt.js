const TreasureHuntGame = {
    grid: [],
    treasurePos: 0,
    attempts: 0,
    isGameOver: false,

    init(container) {
        this.grid = Array(25).fill('vault');
        this.treasurePos = Math.floor(Math.random() * 25);
        this.attempts = 0;
        this.isGameOver = false;
        this.render(container);
    },

    dig(index, container) {
        if (this.isGameOver || this.grid[index] !== 'vault') return;

        this.attempts++;
        if (index === this.treasurePos) {
            this.grid[index] = 'treasure';
            this.isGameOver = true;
            this.render(container, `BULDUN! 💎 ${this.attempts}. denemede hazineye ulaştın!`);
        } else {
            this.grid[index] = 'empty';
            if (this.attempts >= 10) {
                this.isGameOver = true;
                this.grid[this.treasurePos] = 'treasure';
                this.render(container, 'HAKKIN BİTTİ! 🔒 Hazine buradaydı.');
            } else {
                this.render(container);
            }
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="treasure-game">
                <div class="stats">Kalan Hak: ${10 - this.attempts}</div>
                <div class="game-info">${status || 'Hazine 5x5 gridde bir yerde saklı. Bulabilir misin?'}</div>
                
                <div class="treasure-grid">
                    ${this.grid.map((cell, i) => `
                        <div class="grid-cell ${cell}" onclick="TreasureHuntGame.dig(${i}, document.getElementById('game-container'))">
                            <i class="fa-solid ${cell === 'vault' ? 'fa-square' : (cell === 'treasure' ? 'fa-gem' : 'fa-xmark')}"></i>
                        </div>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="TreasureHuntGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .treasure-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .stats { font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .game-info { font-weight: 700; opacity: 0.8; margin-bottom: 2rem; min-height: 2.5rem; max-width: 400px; }
                .treasure-grid { display: grid; grid-template-columns: repeat(5, 50px); gap: 10px; }
                .grid-cell { 
                    width: 50px; height: 50px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); 
                    border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;
                    font-size: 1.2rem;
                }
                .grid-cell:hover { background: rgba(255,255,255,0.1); transform: scale(1.05); }
                .grid-cell.treasure { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border-color: #fbbf24; box-shadow: 0 0 15px #fbbf24; animation: pulseGem 1s infinite; }
                .grid-cell.empty { opacity: 0.3; cursor: default; }
                @keyframes pulseGem { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.TreasureHuntGame = TreasureHuntGame;
