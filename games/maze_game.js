const MazeGame = {
    gridSize: 15,
    maze: [],
    playerPos: { r: 1, c: 1 },
    endPos: { r: 13, c: 13 },
    isGameOver: false,

    init(container) {
        this.generateMaze();
        this.playerPos = { r: 1, c: 1 };
        this.isGameOver = false;
        this.render(container);
    },

    generateMaze() {
        // Simple Maze Generation (Recursive Backtracker simplified or hardcoded for better playability)
        this.maze = Array(this.gridSize).fill(1).map(() => Array(this.gridSize).fill(1));

        // Carve a path
        for (let r = 1; r < this.gridSize - 1; r++) {
            for (let c = 1; c < this.gridSize - 1; c++) {
                if (Math.random() > 0.3) this.maze[r][c] = 0;
            }
        }
        this.maze[1][1] = 0;
        this.maze[13][13] = 0;
        // Ensure some path (rough)
        for (let i = 1; i < 14; i++) {
            this.maze[i][1] = 0;
            this.maze[13][i] = 0;
        }
    },

    move(dr, dc, container) {
        if (this.isGameOver) return;
        const nr = this.playerPos.r + dr;
        const nc = this.playerPos.c + dc;

        if (nr >= 0 && nr < this.gridSize && nc >= 0 && nc < this.gridSize && this.maze[nr][nc] === 0) {
            this.playerPos = { r: nr, c: nc };
            if (nr === this.endPos.r && nc === this.endPos.c) {
                this.isGameOver = true;
                this.render(container, 'TEBRİKLER! Çıkışı buldun! 🏁');
            } else {
                this.render(container);
            }
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="maze-game">
                <div class="maze-grid" style="grid-template-columns: repeat(${this.gridSize}, 1fr)">
                    ${this.maze.map((row, r) => row.map((cell, c) => {
            let content = '';
            let classes = 'maze-cell ' + (cell === 1 ? 'wall' : 'path');
            if (r === this.playerPos.r && c === this.playerPos.c) {
                classes += ' player';
                content = '<i class="fa-solid fa-person-running"></i>';
            } else if (r === this.endPos.r && c === this.endPos.c) {
                classes += ' finish';
                content = '<i class="fa-solid fa-flag-checkered"></i>';
            }
            return `<div class="${classes}">${content}</div>`;
        }).join('')).join('')}
                </div>
                
                ${status ? `<div class="game-status">${status}</div>` : ''}

                <div class="controls" style="margin-top: 1rem;">
                    <div style="display:flex; justify-content:center"><button class="dir-btn" onclick="MazeGame.move(-1, 0, document.getElementById('game-container'))">↑</button></div>
                    <div style="display:flex; gap: 5px;">
                        <button class="dir-btn" onclick="MazeGame.move(0, -1, document.getElementById('game-container'))">←</button>
                        <button class="dir-btn" onclick="MazeGame.move(1, 0, document.getElementById('game-container'))">↓</button>
                        <button class="dir-btn" onclick="MazeGame.move(0, 1, document.getElementById('game-container'))">→</button>
                    </div>
                </div>

                <button class="primary-btn outline" onclick="MazeGame.init(document.getElementById('game-container'))" style="margin-top: 1.5rem;">Sıfırla</button>
            </div>
            <style>
                .maze-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .maze-grid { display: grid; background: var(--glass-bg); padding: 5px; border-radius: 8px; border: 1px solid var(--glass-border); width: 300px; aspect-ratio: 1; }
                .maze-cell { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; }
                .maze-cell.wall { background: rgba(255,255,255,0.1); border-radius: 2px; }
                .maze-cell.path { background: transparent; }
                .maze-cell.player { color: var(--primary); font-size: 1rem; text-shadow: 0 0 10px var(--primary-glow); }
                .maze-cell.finish { color: var(--secondary); font-size: 1rem; }
                .game-status { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-top: 1rem; }
                .dir-btn { width: 50px; height: 40px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white; border-radius: 8px; cursor: pointer; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.MazeGame = MazeGame;
