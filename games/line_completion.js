const LineCompletionGame = {
    targetPath: [[50, 50], [150, 50], [150, 150], [50, 150], [50, 50]],
    playerPoints: [],
    isDrawing: false,
    isGameOver: false,

    init(container) {
        this.playerPoints = [];
        this.isGameOver = false;
        this.render(container);
    },

    startDraw(e, container) {
        if (this.isGameOver) return;
        this.isDrawing = true;
        this.addPoint(e, container);
    },

    draw(e, container) {
        if (!this.isDrawing || this.isGameOver) return;
        this.addPoint(e, container);
    },

    stopDraw(container) {
        this.isDrawing = false;
        this.checkAccuracy(container);
    },

    addPoint(e, container) {
        const rect = container.querySelector('svg').getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.playerPoints.push([x, y]);
        this.render(container);
    },

    checkAccuracy(container) {
        // Simplified accuracy check based on point density/bounds
        if (this.playerPoints.length < 10) return;

        this.isGameOver = true;
        this.render(container, 'Çizim tamamlandı! Harika görünüy贴! 🎨');
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="line-comp-game">
                <div class="game-info">${status || 'Kesik çizgileri takip ederek şekli tamamla!'}</div>
                
                <div class="drawing-area" 
                     onmousedown="LineCompletionGame.startDraw(event, document.getElementById('game-container'))"
                     onmousemove="LineCompletionGame.draw(event, document.getElementById('game-container'))"
                     onmouseup="LineCompletionGame.stopDraw(document.getElementById('game-container'))"
                     onmouseleave="LineCompletionGame.stopDraw(document.getElementById('game-container'))">
                    <svg viewBox="0 0 200 200" width="300" height="300">
                        <polyline points="${this.targetPath.map(p => p.join(',')).join(' ')}" class="target-path" />
                        <polyline points="${this.playerPoints.map(p => p.join(',')).join(' ')}" class="player-path" />
                    </svg>
                </div>

                <button class="primary-btn outline" onclick="LineCompletionGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .line-comp-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .drawing-area { background: rgba(255,255,255,0.02); border: 2px solid var(--glass-border); border-radius: 20px; cursor: crosshair; }
                .target-path { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 4; stroke-dasharray: 8; }
                .player-path { fill: none; stroke: var(--primary); stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 5px var(--primary-glow)); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.LineCompletionGame = LineCompletionGame;
