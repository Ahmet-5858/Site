const TagGame = {
    targetPos: { x: 50, y: 50 },
    score: 0,
    timeLeft: 30,
    isGameOver: false,
    timer: null,

    init(container) {
        this.score = 0;
        this.timeLeft = 30;
        this.isGameOver = false;
        this.moveTarget();
        this.render(container);
        this.startTimer(container);
    },

    startTimer(container) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, `Süre Bitti! Puanın: ${this.score}`);
            } else {
                this.render(container);
            }
        }, 1000);
    },

    moveTarget() {
        this.targetPos = {
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80
        };
    },

    tag(container) {
        if (this.isGameOver) return;
        this.score++;
        this.moveTarget();
        this.render(container);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="tag-game">
                <div class="stats">
                    <div class="stat-badge">Puan: ${this.score}</div>
                    <div class="stat-badge ${this.timeLeft <= 5 ? 'urgent' : ''}">Süre: ${this.timeLeft}s</div>
                </div>
                
                <div class="tag-area">
                    <div class="tag-target" 
                         style="left: ${this.targetPos.x}%; top: ${this.targetPos.y}%"
                         onclick="TagGame.tag(document.getElementById('game-container'))">
                        <i class="fa-solid fa-bolt"></i>
                    </div>
                </div>

                <div class="game-info">${status || 'Ebe sensin! Hızlıca yakala!'}</div>

                <button class="primary-btn outline" onclick="TagGame.init(document.getElementById('game-container'))" style="margin-top: 1.5rem;">Sıfırla</button>
            </div>
            <style>
                .tag-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .stats { display: flex; gap: 20px; margin-bottom: 1.5rem; }
                .stat-badge { background: rgba(168, 85, 247, 0.2); padding: 8px 20px; border-radius: 20px; font-weight: 800; border: 1px solid var(--primary); }
                .stat-badge.urgent { color: #ef4444; border-color: #ef4444; animation: flash 0.5s infinite; }
                .tag-area { 
                    width: 100%; max-width: 400px; height: 300px; background: rgba(255,255,255,0.03); 
                    border: 2px solid var(--glass-border); border-radius: 20px; position: relative; overflow: hidden;
                }
                .tag-target { 
                    position: absolute; transform: translate(-50%, -50%); 
                    font-size: 2rem; color: var(--primary); cursor: pointer;
                    text-shadow: 0 0 15px var(--primary-glow); transition: 0.1s;
                }
                .tag-target:hover { transform: translate(-50%, -50%) scale(1.2); }
                .game-info { font-weight: 700; color: var(--primary); margin-top: 1.5rem; min-height: 1.5rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
                @keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            </style>
        `;
    }
};

window.TagGame = TagGame;
