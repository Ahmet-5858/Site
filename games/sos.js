const SOSGame = {
    gridSize: 8,
    board: [],
    currentPlayer: 'Mavi', // Mavi vs Kırmızı
    scores: { 'Mavi': 0, 'Kırmızı': 0 },
    currentSymbol: 'S',

    init(container) {
        this.board = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(null));
        this.currentPlayer = 'Mavi';
        this.scores = { 'Mavi': 0, 'Kırmızı': 0 };
        this.currentSymbol = 'S';
        this.render(container);
    },

    handleCellClick(row, col, container) {
        if (this.board[row][col]) return;

        this.board[row][col] = this.currentSymbol;
        const sosCount = this.checkSOS(row, col);

        if (sosCount > 0) {
            this.scores[this.currentPlayer] += sosCount;
            if (this.isBoardFull()) {
                this.render(container, this.getWinnerMessage());
            } else {
                this.render(container);
            }
        } else {
            if (this.isBoardFull()) {
                this.render(container, this.getWinnerMessage());
            } else {
                this.currentPlayer = this.currentPlayer === 'Mavi' ? 'Kırmızı' : 'Mavi';
                this.render(container);
            }
        }
    },

    setSymbol(symbol) {
        this.currentSymbol = symbol;
        document.querySelectorAll('.symbol-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    },

    checkSOS(r, c) {
        let count = 0;
        const s = this.board[r][c];
        const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1] // Horiz, Vert, Diag1, Diag2
        ];

        if (s === 'S') {
            // Check for S-O-S where this is the first or last S
            directions.forEach(([dr, dc]) => {
                // Check forward: S(r,c) - O(r+dr, c+dc) - S(r+2dr, c+2dc)
                if (this.isSymbolAt(r + dr, c + dc, 'O') && this.isSymbolAt(r + 2 * dr, c + 2 * dc, 'S')) count++;
                // Check backward: S(r,c) - O(r-dr, c-dc) - S(r-2dr, c-2dc)
                if (this.isSymbolAt(r - dr, c - dc, 'O') && this.isSymbolAt(r - 2 * dr, c - 2 * dc, 'S')) count++;
            });
        } else if (s === 'O') {
            // Check for S-O-S where this is the middle O
            directions.forEach(([dr, dc]) => {
                if (this.isSymbolAt(r - dr, c - dc, 'S') && this.isSymbolAt(r + dr, c + dc, 'S')) count++;
            });
        }
        return count;
    },

    isSymbolAt(r, c, sym) {
        return r >= 0 && r < this.gridSize && c >= 0 && c < this.gridSize && this.board[r][c] === sym;
    },

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell !== null));
    },

    getWinnerMessage() {
        if (this.scores['Mavi'] > this.scores['Kırmızı']) return "Mavi Kazandı!";
        if (this.scores['Kırmızı'] > this.scores['Mavi']) return "Kırmızı Kazandı!";
        return "Berabere!";
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="sos-game">
                <div class="sos-header">
                    <div class="score-card ${this.currentPlayer === 'Mavi' ? 'active' : ''}" style="color: #3b82f6">Mavi: ${this.scores['Mavi']}</div>
                    <div class="score-card ${this.currentPlayer === 'Kırmızı' ? 'active' : ''}" style="color: #ef4444">Kırmızı: ${this.scores['Kırmızı']}</div>
                </div>
                <div class="symbol-selector">
                    <button class="symbol-btn ${this.currentSymbol === 'S' ? 'active' : ''}" onclick="SOSGame.setSymbol('S')">S</button>
                    <button class="symbol-btn ${this.currentSymbol === 'O' ? 'active' : ''}" onclick="SOSGame.setSymbol('O')">O</button>
                </div>
                <div class="sos-grid">
                    ${this.board.map((row, r) => row.map((cell, c) => `
                        <div class="sos-cell ${cell || ''}" onclick="SOSGame.handleCellClick(${r}, ${c}, document.getElementById('game-container'))">
                            ${cell || ''}
                        </div>
                    `).join('')).join('')}
                </div>
                ${status ? `<div class="game-status">${status}</div>` : ''}
                <button class="primary-btn" onclick="SOSGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeniden Başlat
                </button>
            </div>
            <style>
                .sos-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .sos-header { display: flex; gap: 2rem; margin-bottom: 1rem; }
                .score-card { font-size: 1.1rem; font-weight: 700; padding: 5px 15px; border-radius: 8px; border: 1px solid transparent; }
                .score-card.active { background: rgba(255,255,255,0.05); border-color: currentColor; box-shadow: 0 0 10px currentColor; }
                .symbol-selector { display: flex; gap: 10px; margin-bottom: 1rem; }
                .symbol-btn { width: 40px; height: 40px; border: 1px solid var(--glass-border); background: none; color: white; border-radius: 8px; cursor: pointer; font-weight: 700; transition: 0.3s; }
                .symbol-btn.active { background: var(--primary); border-color: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
                .sos-grid { display: grid; grid-template-columns: repeat(${this.gridSize}, 1fr); gap: 5px; width: 350px; aspect-ratio: 1; }
                .sos-cell { background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 700; cursor: pointer; }
                .sos-cell:hover { background: rgba(255,255,255,0.08); border-color: var(--primary); }
                .game-status { margin-top: 1rem; font-size: 1.2rem; font-weight: 800; color: var(--primary); }
            </style>
        `;
    }
};

window.SOSGame = SOSGame;
