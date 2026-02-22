const StickGame = {
    sticks: [],
    score: 0,
    isGameOver: false,

    init(container) {
        this.score = 0;
        this.isGameOver = false;
        this.sticks = Array(12).fill(0).map((_, i) => ({
            id: i,
            angle: Math.random() * 360,
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            color: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'
        }));
        this.render(container);
    },

    pick(id, container) {
        if (this.isGameOver) return;
        this.sticks = this.sticks.filter(s => s.id !== id);
        this.score++;

        if (this.sticks.length === 0) {
            this.isGameOver = true;
            this.render(container, 'HARİKA! Tüm çubukları topladın! 🏆');
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="pick-stick-game">
                <div class="game-info">Puan: ${this.score} / 12</div>
                <div class="status-msg">${status || 'Üstteki çubukları sırayla topla!'}</div>
                
                <div class="stick-area">
                    ${this.sticks.map(s => `
                        <div class="floating-stick" 
                             style="left: ${s.x}%; top: ${s.y}%; transform: translate(-50%, -50%) rotate(${s.angle}deg); background: ${s.color};"
                             onclick="StickGame.pick(${s.id}, document.getElementById('game-container'))">
                        </div>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="StickGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .pick-stick-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 800; color: var(--primary); }
                .status-msg { margin-bottom: 2rem; opacity: 0.7; font-size: 0.9rem; }
                .stick-area { 
                    width: 100%; max-width: 400px; height: 300px; background: rgba(255,255,255,0.03); 
                    border: 2px solid var(--glass-border); border-radius: 20px; position: relative; overflow: hidden;
                }
                .floating-stick { 
                    position: absolute; width: 100px; height: 6px; border-radius: 3px; cursor: pointer;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: 0.2s;
                }
                .floating-stick:hover { filter: brightness(1.5); box-shadow: 0 0 15px var(--primary-glow); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.StickGame = StickGame;
