const PaperSoccerGame = {
    rows: 11,
    cols: 9,
    ballPos: { r: 5, c: 4 },
    history: [],
    gridEdges: {}, // Store occupied edges
    currentPlayer: 1,

    init(container) {
        this.ballPos = { r: 5, c: 4 };
        this.gridEdges = {};
        this.history = [];
        this.currentPlayer = 1;
        this.render(container);
    },

    move(dr, dc, container) {
        const nr = this.ballPos.r + dr;
        const nc = this.ballPos.c + dc;

        if (nr < 0 || nr >= this.rows || nc < 0 || nc >= this.cols) return;

        const edgeKey = this.getEdgeKey(this.ballPos.r, this.ballPos.c, nr, nc);
        if (this.gridEdges[edgeKey]) return; // Already occupied

        this.gridEdges[edgeKey] = this.currentPlayer;
        this.ballPos = { r: nr, c: nc };

        // Goal Check
        if (nr === 0 && (nc >= 3 && nc <= 5)) {
            this.render(container, 'OYUNCU 2 GOL ATTI! ⚽');
            return;
        }
        if (nr === this.rows - 1 && (nc >= 3 && nc <= 5)) {
            this.render(container, 'OYUNCU 1 GOL ATTI! ⚽');
            return;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.render(container);
    },

    getEdgeKey(r1, c1, r2, c2) {
        const p1 = `${r1},${c1}`;
        const p2 = `${r2},${c2}`;
        return [p1, p2].sort().join('-');
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="soccer-game">
                <div class="game-status" style="color: ${this.currentPlayer === 1 ? 'var(--primary)' : 'var(--secondary)'}">
                    ${status || `Sıra: Oyuncu ${this.currentPlayer}`}
                </div>
                <div class="pitch">
                    ${this.renderPitch()}
                </div>
                <div class="controls">
                    <div class="row"><button class="dir-btn" onclick="PaperSoccerGame.move(-1, -1, document.getElementById('game-container'))">↖</button><button class="dir-btn" onclick="PaperSoccerGame.move(-1, 0, document.getElementById('game-container'))">↑</button><button class="dir-btn" onclick="PaperSoccerGame.move(-1, 1, document.getElementById('game-container'))">↗</button></div>
                    <div class="row"><button class="dir-btn" onclick="PaperSoccerGame.move(0, -1, document.getElementById('game-container'))">←</button><div class="ball-icon">⚽</div><button class="dir-btn" onclick="PaperSoccerGame.move(0, 1, document.getElementById('game-container'))">→</button></div>
                    <div class="row"><button class="dir-btn" onclick="PaperSoccerGame.move(1, -1, document.getElementById('game-container'))">↙</button><button class="dir-btn" onclick="PaperSoccerGame.move(1, 0, document.getElementById('game-container'))">↓</button><button class="dir-btn" onclick="PaperSoccerGame.move(1, 1, document.getElementById('game-container'))">↘</button></div>
                </div>
                <button class="primary-btn outline" onclick="PaperSoccerGame.init(document.getElementById('game-container'))" style="margin-top: 1rem;">Sıfırla</button>
            </div>
            <style>
                .soccer-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .game-status { font-weight: 800; margin-bottom: 1rem; height: 1.5rem; }
                .pitch { 
                    width: 250px; height: 300px; background: rgba(255,255,255,0.05); 
                    border: 2px solid var(--glass-border); position: relative; border-radius: 10px;
                    display: grid; grid-template-rows: repeat(${this.rows}, 1fr); grid-template-columns: repeat(${this.cols}, 1fr);
                }
                .dot { width: 4px; height: 4px; background: white; border-radius: 50%; opacity: 0.3; justify-self: center; align-self: center; }
                .dot.active { opacity: 1; background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); width: 8px; height: 8px; z-index: 10; }
                .goal-area { position: absolute; left: 33%; right: 33%; height: 10px; background: rgba(168, 85, 247, 0.3); border: 2px solid var(--primary); }
                .goal-top { top: -5px; }
                .goal-bottom { bottom: -5px; }
                .controls { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 5px; }
                .row { display: flex; gap: 5px; }
                .dir-btn { width: 40px; height: 40px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white; border-radius: 8px; cursor: pointer; font-size: 1.2rem; }
                .dir-btn:hover { background: var(--primary); }
                .ball-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    },

    renderPitch() {
        let html = '<div class="goal-area goal-top"></div><div class="goal-area goal-bottom"></div>';
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const isActive = this.ballPos.r === r && this.ballPos.c === c;
                html += `<div class="dot ${isActive ? 'active' : ''}"></div>`;
            }
        }
        return html;
    }
};

window.PaperSoccerGame = PaperSoccerGame;
