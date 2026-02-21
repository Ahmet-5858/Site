const MinesweeperGame = {
    rows: 10,
    cols: 10,
    minesCount: 15,
    board: [],
    revealed: [],
    flagged: [],
    isGameOver: false,

    init(container) {
        this.board = Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
        this.revealed = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.flagged = Array(this.rows).fill(null).map(() => Array(this.cols).fill(false));
        this.isGameOver = false;

        this.placeMines();
        this.calculateNumbers();
        this.render(container);
    },

    placeMines() {
        let placed = 0;
        while (placed < this.minesCount) {
            const r = Math.floor(Math.random() * this.rows);
            const c = Math.floor(Math.random() * this.cols);
            if (this.board[r][c] !== 'M') {
                this.board[r][c] = 'M';
                placed++;
            }
        }
    },

    calculateNumbers() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] === 'M') continue;
                let count = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const nr = r + i, nc = c + j;
                        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.board[nr][nc] === 'M') {
                            count++;
                        }
                    }
                }
                this.board[r][c] = count;
            }
        }
    },

    handleClick(r, c, container, isRightClick = false) {
        if (this.isGameOver || this.revealed[r][c]) return;

        if (isRightClick) {
            this.flagged[r][c] = !this.flagged[r][c];
        } else {
            if (this.flagged[r][c]) return;
            if (this.board[r][c] === 'M') {
                this.gameOver(false, container);
                return;
            }
            this.reveal(r, c);
            if (this.checkWin()) {
                this.gameOver(true, container);
                return;
            }
        }
        this.render(container);
    },

    reveal(r, c) {
        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols || this.revealed[r][c]) return;
        this.revealed[r][c] = true;
        if (this.board[r][c] === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    this.reveal(r + i, c + j);
                }
            }
        }
    },

    checkWin() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c] !== 'M' && !this.revealed[r][c]) return false;
            }
        }
        return true;
    },

    gameOver(isWin, container) {
        this.isGameOver = true;
        this.revealed = this.revealed.map(() => Array(this.cols).fill(true));
        this.render(container, isWin ? "Kazandın! 🎉" : "Mayınlı Bölge! 💥");
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="mines-game">
                <div class="mines-info">
                    <span>💣: ${this.minesCount}</span>
                    ${status ? `<span class="game-status">${status}</span>` : ''}
                </div>
                <div class="mines-grid" oncontextmenu="return false">
                    ${this.board.map((row, r) => row.map((cell, c) => {
            let content = '';
            let classes = 'mines-cell';
            if (this.revealed[r][c]) {
                classes += ' revealed';
                if (cell === 'M') content = '<i class="fa-solid fa-bomb"></i>';
                else if (cell > 0) {
                    content = cell;
                    classes += ` n-${cell}`;
                }
            } else if (this.flagged[r][c]) {
                content = '<i class="fa-solid fa-flag"></i>';
                classes += ' flagged';
            }

            return `<div class="${classes}" 
                            onclick="MinesweeperGame.handleClick(${r}, ${c}, document.getElementById('game-container'))"
                            oncontextmenu="MinesweeperGame.handleClick(${r}, ${c}, document.getElementById('game-container'), true)">
                            ${content}
                        </div>`;
        }).join('')).join('')}
                </div>
                <button class="primary-btn" onclick="MinesweeperGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeniden Başlat
                </button>
            </div>
            <style>
                .mines-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .mines-info { display: flex; gap: 2rem; margin-bottom: 1rem; font-weight: 700; font-size: 1.1rem; }
                .game-status { color: var(--primary); }
                .mines-grid { display: grid; grid-template-columns: repeat(${this.cols}, 1fr); gap: 4px; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 8px; }
                .mines-cell { width: 32px; height: 32px; background: rgba(255,255,255,0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: 800; font-size: 0.9rem; transition: 0.2s; }
                .mines-cell:hover:not(.revealed) { background: rgba(255,255,255,0.2); }
                .mines-cell.revealed { background: rgba(255,255,255,0.02); cursor: default; }
                .mines-cell.flagged { color: var(--error); }
                .mines-cell.n-1 { color: #3b82f6; } .mines-cell.n-2 { color: #10b981; } .mines-cell.n-3 { color: #ef4444; }
                .mines-cell i.fa-bomb { color: #ef4444; animation: shake 0.5s infinite; }
                @keyframes shake { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
            </style>
        `;
    }
};

window.MinesweeperGame = MinesweeperGame;
