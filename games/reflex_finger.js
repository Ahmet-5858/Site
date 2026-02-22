const ReflexFingerGame = {
    score: 0,
    isGameOver: false,
    timer: null,
    targetX: 50,
    targetY: 50,

    init(container) {
        this.score = 0;
        this.isGameOver = false;
        this.moveTarget();
        this.render(container);
        this.startLoop(container);
    },

    moveTarget() {
        this.targetX = 10 + Math.random() * 80;
        this.targetY = 10 + Math.random() * 80;
    },

    startLoop(container) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.moveTarget();
            this.render(container);
        }, 1200); // Target moves every 1.2s
    },

    catch(container) {
        if (this.isGameOver) return;
        this.score++;
        this.moveTarget();
        if (this.score >= 10) {
            this.isGameOver = true;
            clearInterval(this.timer);
            this.render(container, 'HARİKA REFLEKSLER! ⚡ 10 parmak yakaladın!');
        } else {
            this.render(container, 'YAKALADIN! 🎯');
            // Speed up
            this.startLoop(container);
        }
    },

    render(container, status = 'Hareket eden parmağı yakalamaya çalış!') {
        container.innerHTML = `
            <div class="reflex-game">
                <div class="score-display">Puan: ${this.score} / 10</div>
                <div class="game-info">${status}</div>
                
                <div class="reflex-area">
                    <div class="finger-target" 
                         style="left: ${this.targetX}%; top: ${this.targetY}%"
                         onclick="ReflexFingerGame.catch(document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-pointer"></i>
                    </div>
                </div>

                <button class="primary-btn outline" onclick="ReflexFingerGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .reflex-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .score-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .game-info { font-weight: 700; opacity: 0.8; margin-bottom: 1.5rem; min-height: 2rem; }
                .reflex-area { 
                    width: 100%; max-width: 400px; height: 300px; background: rgba(255,255,255,0.03); 
                    border: 2px solid var(--glass-border); border-radius: 20px; position: relative; overflow: hidden;
                }
                .finger-target { 
                    position: absolute; transform: translate(-50%, -50%); 
                    font-size: 2.5rem; color: var(--primary); cursor: pointer;
                    text-shadow: 0 0 15px var(--primary-glow); transition: 0.1s linear;
                }
                .finger-target:hover { color: white; scale: 1.2; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.ReflexFingerGame = ReflexFingerGame;
