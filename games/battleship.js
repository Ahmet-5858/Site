const BattleshipGame = {
    gridSize: 7,
    playerGrid: [],
    cpuGrid: [],
    playerShips: [],
    cpuShips: [],
    isPlacementPhase: true,
    message: 'Gemilerini yerleştir (4 adet 1x1 gemi)',

    init(container) {
        this.playerGrid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(null));
        this.cpuGrid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(null));
        this.playerShips = [];
        this.cpuShips = [];
        this.isPlacementPhase = true;
        this.message = 'Gemilerini yerleştir (4 adet 1x1 gemi)';
        this.placeCpuShips();
        this.render(container);
    },

    placeCpuShips() {
        let placed = 0;
        while (placed < 4) {
            const r = Math.floor(Math.random() * this.gridSize);
            const c = Math.floor(Math.random() * this.gridSize);
            if (!this.cpuShips.some(s => s.r === r && s.c === c)) {
                this.cpuShips.push({ r, c, hit: false });
                placed++;
            }
        }
    },

    handleCellClick(r, c, container) {
        if (this.isPlacementPhase) {
            if (this.playerShips.some(s => s.r === r && s.c === c)) return;
            this.playerShips.push({ r, c, hit: false });
            if (this.playerShips.length === 4) {
                this.isPlacementPhase = false;
                this.message = 'Saldırı Zamanı! Düşman haritasına tıkla.';
            }
        }
        this.render(container);
    },

    attackCpu(r, c, container) {
        if (this.isPlacementPhase || this.cpuGrid[r][c]) return;

        const ship = this.cpuShips.find(s => s.r === r && s.c === c);
        if (ship) {
            ship.hit = true;
            this.cpuGrid[r][c] = 'HIT';
            this.message = 'VURDUN! 💥 Sıra sende devam et.';
            if (this.cpuShips.every(s => s.hit)) {
                this.render(container, 'Tebrikler! Düşman filosunu yok ettin! 🎉');
                return;
            }
        } else {
            this.cpuGrid[r][c] = 'MISS';
            this.message = 'Karavana... Düşman saldırıyor!';
            this.render(container);
            setTimeout(() => this.cpuAttack(container), 1000);
            return;
        }
        this.render(container);
    },

    cpuAttack(container) {
        let r, c;
        do {
            r = Math.floor(Math.random() * this.gridSize);
            c = Math.floor(Math.random() * this.gridSize);
        } while (this.playerGrid[r][c]);

        const ship = this.playerShips.find(s => s.r === r && s.c === c);
        if (ship) {
            ship.hit = true;
            this.playerGrid[r][c] = 'HIT';
            this.message = 'DÜŞMAN SENİ VURDU! 🔥';
            if (this.playerShips.every(s => s.hit)) {
                this.render(container, 'Kaybettin! Filon yok edildi. 💀');
                return;
            }
            setTimeout(() => this.cpuAttack(container), 1000);
        } else {
            this.playerGrid[r][c] = 'MISS';
            this.message = 'Düşman ıskaladı. Sıra sende!';
        }
        this.render(container);
    },

    render(container, gameOverMsg = null) {
        container.innerHTML = `
            <div class="battle-game">
                <div class="game-status">${gameOverMsg || this.message}</div>
                <div class="grids-wrapper">
                    <div class="grid-box">
                        <h4>Senin Donanman</h4>
                        <div class="battle-grid player">
                            ${this.renderGrid(this.playerGrid, this.playerShips, true)}
                        </div>
                    </div>
                    <div class="grid-box">
                        <h4>Düşman Haritası</h4>
                        <div class="battle-grid cpu">
                            ${this.renderGrid(this.cpuGrid, null, false)}
                        </div>
                    </div>
                </div>
                <button class="primary-btn" onclick="BattleshipGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeniden Başlat
                </button>
            </div>
            <style>
                .battle-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .game-status { font-size: 1.1rem; font-weight: 700; color: var(--primary); margin-bottom: 1.5rem; text-align: center; height: 3rem; }
                .grids-wrapper { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
                .grid-box { text-align: center; }
                .grid-box h4 { margin-bottom: 10px; color: var(--text-dim); font-size: 0.9rem; }
                .battle-grid { display: grid; grid-template-columns: repeat(${this.gridSize}, 1fr); gap: 4px; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 8px; }
                .b-cell { width: 30px; height: 30px; background: rgba(59, 130, 246, 0.1); border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid rgba(255,255,255,0.05); }
                .b-cell:hover { background: rgba(59, 130, 246, 0.2); }
                .b-cell.ship { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
                .b-cell.hit { color: #ef4444; background: rgba(239, 68, 68, 0.2); border-color: #ef4444; font-size: 1.2rem; }
                .b-cell.miss { color: white; opacity: 0.3; }
                .cpu .b-cell.hit { background: rgba(168, 85, 247, 0.2); color: var(--primary); border-color: var(--primary); }
            </style>
        `;
    },

    renderGrid(gridData, ships, isPlayer) {
        let html = '';
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                const state = gridData[r][c];
                const ship = ships ? ships.find(s => s.r === r && s.c === c) : null;
                let classes = 'b-cell';
                let content = '';

                if (state === 'HIT') {
                    classes += ' hit';
                    content = '×';
                } else if (state === 'MISS') {
                    classes += ' miss';
                    content = '·';
                } else if (ship) {
                    classes += ' ship';
                }

                const clickFn = isPlayer
                    ? `onclick="BattleshipGame.handleCellClick(${r}, ${c}, document.getElementById('game-container'))"`
                    : `onclick="BattleshipGame.attackCpu(${r}, ${c}, document.getElementById('game-container'))"`;

                html += `<div class="${classes}" ${clickFn}>${content}</div>`;
            }
        }
        return html;
    }
};

window.BattleshipGame = BattleshipGame;
