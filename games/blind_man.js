const BlindManBuffGame = {
    targetPos: { x: 50, y: 50 },
    playerPos: { x: 10, y: 10 },
    isGameOver: false,

    init(container) {
        this.targetPos = { x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 };
        this.playerPos = { x: 10, y: 10 };
        this.isGameOver = false;
        this.render(container);
    },

    move(dx, dy, container) {
        if (this.isGameOver) return;
        this.playerPos.x = Math.max(5, Math.min(95, this.playerPos.x + dx));
        this.playerPos.y = Math.max(5, Math.min(95, this.playerPos.y + dy));

        const dist = Math.sqrt(Math.pow(this.playerPos.x - this.targetPos.x, 2) + Math.pow(this.playerPos.y - this.targetPos.y, 2));

        if (dist < 8) {
            this.isGameOver = true;
            this.render(container, 'YAKALADIN! 👁️ Gözlerin açıldı.');
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        const dist = Math.sqrt(Math.pow(this.playerPos.x - this.targetPos.x, 2) + Math.pow(this.playerPos.y - this.targetPos.y, 2));
        const blurAmount = Math.max(0, (dist - 10) / 2);

        container.innerHTML = `
            <div class="bmb-game">
                <div class="game-info">${status || 'Bulanık dünyada sesi takip et!'}</div>
                
                <div class="blind-area">
                    <div class="blur-overlay" style="backdrop-filter: blur(${blurAmount}px)"></div>
                    <div class="bm-target" style="left: ${this.targetPos.x}%; top: ${this.targetPos.y}%; opacity: ${this.isGameOver ? 1 : 0}">
                        <i class="fa-solid fa-bell fa-shake"></i>
                    </div>
                    <div class="bm-player" style="left: ${this.playerPos.x}%; top: ${this.playerPos.y}%">
                        <i class="fa-solid fa-eye-slash"></i>
                    </div>
                </div>

                <div class="controls" style="margin-top: 1.5rem;">
                    <div style="display:flex; justify-content:center"><button class="dir-btn" onclick="BlindManBuffGame.move(0, -5, document.getElementById('game-container'))">↑</button></div>
                    <div style="display:flex; gap: 5px;">
                        <button class="dir-btn" onclick="BlindManBuffGame.move(-5, 0, document.getElementById('game-container'))">←</button>
                        <button class="dir-btn" onclick="BlindManBuffGame.move(0, 5, document.getElementById('game-container'))">↓</button>
                        <button class="dir-btn" onclick="BlindManBuffGame.move(5, 0, document.getElementById('game-container'))">→</button>
                    </div>
                </div>

                <button class="primary-btn outline" onclick="BlindManBuffGame.init(document.getElementById('game-container'))" style="margin-top: 1rem;">Sıfırla</button>
            </div>
            <style>
                .bmb-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; min-height: 2rem; }
                .blind-area { 
                    width: 100%; max-width: 400px; height: 300px; background: #111; 
                    border: 2px solid var(--glass-border); border-radius: 20px; position: relative; overflow: hidden;
                }
                .blur-overlay { position: absolute; inset: 0; z-index: 5; transition: 0.2s; }
                .bm-target { position: absolute; transform: translate(-50%, -50%); font-size: 2rem; color: var(--secondary); z-index: 1; }
                .bm-player { position: absolute; transform: translate(-50%, -50%); font-size: 1.5rem; color: var(--primary); z-index: 10; text-shadow: 0 0 10px var(--primary-glow); }
                .dir-btn { width: 50px; height: 40px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white; border-radius: 8px; cursor: pointer; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.BlindManBuffGame = BlindManBuffGame;
