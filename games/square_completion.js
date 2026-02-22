const SquareCompletionGame = {
    grid: Array(9).fill(false),
    currentSquare: [],
    isGameOver: false,

    init(container) {
        this.grid = Array(9).fill(false);
        this.currentSquare = [];
        this.isGameOver = false;
        this.render(container);
    },

    toggleNode(index, container) {
        if (this.isGameOver) return;

        if (this.currentSquare.includes(index)) {
            this.currentSquare = this.currentSquare.filter(i => i !== index);
        } else if (this.currentSquare.length < 4) {
            this.currentSquare.push(index);
        }

        if (this.currentSquare.length === 4) {
            this.checkSquare(container);
        } else {
            this.render(container);
        }
    },

    checkSquare(container) {
        const sorted = [...this.currentSquare].sort((a, b) => a - b);
        // Valid squares indices: [0,1,3,4], [1,2,4,5], [3,4,6,7], [4,5,7,8]
        const valid = [
            [0, 1, 3, 4], [1, 2, 4, 5], [3, 4, 6, 7], [4, 5, 7, 8]
        ];

        const isValid = valid.some(v => v.every((val, i) => val === sorted[i]));

        if (isValid) {
            sorted.forEach(idx => this.grid[idx] = true);
            this.currentSquare = [];
            if (this.grid.every(v => v)) {
                this.isGameOver = true;
                this.render(container, 'Tebrikler! Tüm kareleri tamamladın! 🟩');
            } else {
                this.render(container, 'Mükemmel Kare! ✅');
            }
        } else {
            this.currentSquare = [];
            this.render(container, 'Geçersiz Kare! ❌');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="square-comp-game">
                <div class="game-info">${status || '4 noktayı birleştirerek bir kare oluştur!'}</div>
                
                <div class="square-grid">
                    ${this.grid.map((done, i) => `
                        <div class="node ${done ? 'done' : ''} ${this.currentSquare.includes(i) ? 'selected' : ''}" 
                             onclick="SquareCompletionGame.toggleNode(${i}, document.getElementById('game-container'))">
                        </div>
                    `).join('')}
                </div>

                <div class="stats">İlerleme: ${this.grid.filter(v => v).length} / 9</div>

                <button class="primary-btn outline" onclick="SquareCompletionGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .square-comp-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .square-grid { display: grid; grid-template-columns: repeat(3, 60px); gap: 40px; }
                .node { 
                    width: 20px; height: 20px; background: rgba(255,255,255,0.1); border-radius: 50%;
                    cursor: pointer; transition: 0.3s; position: relative;
                }
                .node.selected { background: var(--primary); box-shadow: 0 0 15px var(--primary-glow); }
                .node.done { background: #10b981; box-shadow: 0 0 10px #10b981; }
                .node:hover { transform: scale(1.2); }
                .stats { margin-top: 2rem; font-weight: 800; opacity: 0.6; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.SquareCompletionGame = SquareCompletionGame;
