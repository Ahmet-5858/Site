const OneLineDrawGame = {
    points: [],
    lines: [],
    isGameOver: false,
    currentPath: [],

    init(container) {
        this.points = [
            { x: 50, y: 50, id: 0 },
            { x: 150, y: 50, id: 1 },
            { x: 150, y: 150, id: 2 },
            { x: 50, y: 150, id: 3 },
            { x: 100, y: 100, id: 4 }
        ];
        this.lines = [
            [0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 4], [2, 4], [3, 4]
        ];
        this.currentPath = [];
        this.isGameOver = false;
        this.render(container);
    },

    selectPoint(id, container) {
        if (this.isGameOver) return;

        const lastPoint = this.currentPath[this.currentPath.length - 1];
        if (lastPoint !== undefined) {
            // Check if there is a line between lastPoint and this point
            const exists = this.lines.some(l => (l[0] === lastPoint && l[1] === id) || (l[0] === id && l[1] === lastPoint));
            const alreadyDrawn = this.currentPath.some((p, i) => {
                if (i === 0) return false;
                const prev = this.currentPath[i - 1];
                return (prev === lastPoint && p === id) || (prev === id && p === lastPoint);
            });

            if (exists && !alreadyDrawn) {
                this.currentPath.push(id);
            } else if (exists && alreadyDrawn) {
                this.render(container, 'Bu çizgiyi zaten çizdin! ❌');
                return;
            } else {
                this.render(container, 'Buraya çizgi çizemezsin! ❌');
                return;
            }
        } else {
            this.currentPath.push(id);
        }

        if (this.currentPath.length - 1 === this.lines.length) {
            this.isGameOver = true;
            this.render(container, 'TEBRİKLER! 🎉 Şekli tek seferde tamamladın!');
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="line-game">
                <div class="game-info">${status || 'Tüm çizgileri kalemi kaldırmadan (ve aynı çizgiden geçmeden) çiz!'}</div>
                
                <div class="drawing-area">
                    <svg viewBox="0 0 200 200" width="300" height="300">
                        <!-- Possible Lines -->
                        ${this.lines.map(l => {
            const p1 = this.points[l[0]];
            const p2 = this.points[l[1]];
            return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="base-line" />`;
        }).join('')}
                        
                        <!-- Drawn Lines -->
                        ${this.currentPath.map((p, i) => {
            if (i === 0) return '';
            const p1 = this.points[this.currentPath[i - 1]];
            const p2 = this.points[p];
            return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" class="drawn-line" />`;
        }).join('')}

                        <!-- Points -->
                        ${this.points.map(p => `
                            <circle cx="${p.x}" cy="${p.y}" r="8" class="point ${this.currentPath.includes(p.id) ? 'active' : ''}" 
                                onclick="OneLineDrawGame.selectPoint(${p.id}, document.getElementById('game-container'))" />
                        `).join('')}
                    </svg>
                </div>

                <div class="stats">Çizgi: ${this.currentPath.length > 0 ? this.currentPath.length - 1 : 0} / ${this.lines.length}</div>

                <button class="primary-btn outline" onclick="OneLineDrawGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .line-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; max-width: 400px; }
                .drawing-area { background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px solid var(--glass-border); padding: 20px; }
                .base-line { stroke: rgba(255,255,255,0.1); stroke-width: 2; }
                .drawn-line { stroke: var(--primary); stroke-width: 4; stroke-linecap: round; filter: drop-shadow(0 0 5px var(--primary-glow)); }
                .point { fill: #333; cursor: pointer; transition: 0.3s; }
                .point.active { fill: var(--primary); filter: drop-shadow(0 0 8px var(--primary-glow)); }
                .point:hover { fill: #555; }
                .stats { margin-top: 1.5rem; font-weight: 800; opacity: 0.7; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.OneLineDrawGame = OneLineDrawGame;
