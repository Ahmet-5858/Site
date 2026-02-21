const Connect4Game = {
    rows: 6,
    cols: 7,
    board: [],
    currentPlayer: 1, // 1 for Player 1, 2 for Player 2
    isGameOver: false,

    init(container) {
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
        this.currentPlayer = 1;
        this.isGameOver = false;
        this.render(container);
    },

    dropDisc(col, container) {
        if (this.isGameOver) return;

        // Find the lowest empty row in this column
        let row = -1;
        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.board[r][col] === null) {
                row = r;
                break;
            }
        }

        if (row === -1) return; // Column is full

        this.board[row][col] = this.currentPlayer;

        if (this.checkWin(row, col)) {
            this.isGameOver = true;
            this.render(container, `Oyuncu ${this.currentPlayer} Kazandı! 🎉`);
        } else if (this.isBoardFull()) {
            this.isGameOver = true;
            this.render(container, "Berabere!");
        } else {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            this.render(container);
        }
    },

    checkWin(r, c) {
        const p = this.board[r][c];
        const directions = [
            [0, 1], [1, 0], [1, 1], [1, -1] // Horiz, Vert, Diag1, Diag2
        ];

        for (const [dr, dc] of directions) {
            let count = 1;
            // Check one side
            for (let i = 1; i < 4; i++) {
                const nr = r + dr * i, nc = c + dc * i;
                if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.board[nr][nc] === p) count++;
                else break;
            }
            // Check other side
            for (let i = 1; i < 4; i++) {
                const nr = r - dr * i, nc = c - dc * i;
                if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.board[nr][nc] === p) count++;
                else break;
            }
            if (count >= 4) return true;
        }
        return false;
    },

    isBoardFull() {
        return this.board[0].every(cell => cell !== null);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="c4-game">
                <div class="game-status" style="color: ${this.currentPlayer === 1 ? '#a855f7' : '#3b82f6'}">
                    ${status || `Sıra: Oyuncu ${this.currentPlayer}`}
                </div>
                <div class="c4-grid">
                    ${this.board.map((row, r) => row.map((cell, c) => `
                        <div class="c4-cell" onclick="Connect4Game.dropDisc(${c}, document.getElementById('game-container'))">
                            <div class="disc ${cell === 1 ? 'p1' : (cell === 2 ? 'p2' : '')}"></div>
                        </div>
                    `).join('')).join('')}
                </div>
                <button class="primary-btn" onclick="Connect4Game.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeniden Başlat
                </button>
            </div>
            <style>
                .c4-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .c4-grid { 
                    display: grid; grid-template-columns: repeat(${this.cols}, 1fr); gap: 8px; 
                    background: #1e293b; padding: 12px; border-radius: 12px; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                }
                .c4-cell { width: 45px; height: 45px; background: #0f172a; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
                .disc { width: 85%; height: 85%; border-radius: 50%; transform: translateY(-50px); opacity: 0; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .disc.p1 { background: var(--primary); box-shadow: 0 0 15px var(--primary-glow); transform: translateY(0); opacity: 1; }
                .disc.p2 { background: var(--secondary); box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); transform: translateY(0); opacity: 1; }
                .game-status { font-size: 1.3rem; font-weight: 800; margin-bottom: 1.5rem; }
            </style>
        `;
    }
};

window.Connect4Game = Connect4Game;
