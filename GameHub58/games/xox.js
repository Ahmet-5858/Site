const XOXGame = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    isGameOver: false,

    init(container) {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.isGameOver = false;
        render(container);
    },

    handleMove(index, container) {
        if (this.board[index] || this.isGameOver) return;

        this.board[index] = this.currentPlayer;
        const winner = checkWinner(this.board);

        if (winner) {
            this.isGameOver = true;
            render(container, winner === 'Draw' ? 'Berabere!' : `${winner} Kazandı!`);
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            render(container);
        }
    }
};

function checkWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diags
    ];

    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (!board.includes(null)) return 'Draw';
    return null;
}

function render(container, status = null) {
    const statusText = status || `Sıra: ${XOXGame.currentPlayer}`;

    container.innerHTML = `
        <div class="xox-game">
            <div class="game-status">${statusText}</div>
            <div class="xox-grid">
                ${XOXGame.board.map((cell, i) => `
                    <div class="xox-cell ${cell || ''}" onclick="XOXGame.handleMove(${i}, document.getElementById('game-container'))">
                        ${cell || ''}
                    </div>
                `).join('')}
            </div>
            <button class="primary-btn" onclick="XOXGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                Yeniden Başlat
            </button>
        </div>
        <style>
            .xox-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
            .game-status { font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary); }
            .xox-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; width: 300px; aspect-ratio: 1; }
            .xox-cell {
                background: rgba(255,255,255,0.05);
                border: 1px solid var(--glass-border);
                border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                font-size: 2.5rem; font-weight: 800; cursor: pointer; transition: 0.3s;
            }
            .xox-cell:hover { background: rgba(255,255,255,0.1); border-color: var(--primary); }
            .xox-cell.X { color: var(--primary); }
            .xox-cell.O { color: var(--secondary); }
        </style>
    `;
}

// Attach to window so onclick works in this basic implementation
window.XOXGame = XOXGame;
