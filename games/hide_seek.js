const HideAndSeekGame = {
    targetPos: { x: 0, y: 0 },
    isFound: false,
    attempts: 0,

    init(container) {
        this.targetPos = {
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80
        };
        this.isFound = false;
        this.attempts = 0;
        this.render(container);
    },

    check(e, container) {
        if (this.isFound) return;
        this.attempts++;

        const rect = e.target.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;

        const dist = Math.sqrt(Math.pow(px - this.targetPos.x, 2) + Math.pow(py - this.targetPos.y, 2));

        let msg = '';
        if (dist < 5) {
            this.isFound = true;
            msg = `BULDUN! 🥳 ${this.attempts}. denemede saklanan objeyi buldun!`;
        } else if (dist < 15) {
            msg = 'ÇOK SICAK! 🔥';
        } else if (dist < 30) {
            msg = 'ILIK... 🌤️';
        } else {
            msg = 'SOĞUK... ❄️';
        }

        this.render(container, msg);
    },

    render(container, status = 'Karanlıkta saklanan bir şey var... Tıklayarak bulmaya çalış!') {
        container.innerHTML = `
            <div class="hs-game">
                <div class="hs-status">${status}</div>
                <div class="hs-area" onclick="HideAndSeekGame.check(event, document.getElementById('game-container'))">
                    ${this.isFound ? `<div class="target" style="left: ${this.targetPos.x}%; top: ${this.targetPos.y}%"><i class="fa-solid fa-ghost"></i></div>` : ''}
                    <div class="overlay"></div>
                </div>
                <button class="primary-btn outline" onclick="HideAndSeekGame.init(document.getElementById('game-container'))" style="margin-top: 1.5rem;">Yeniden Sakla</button>
            </div>
            <style>
                .hs-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .hs-status { font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; min-height: 2.5rem; }
                .hs-area { 
                    width: 100%; max-width: 400px; height: 300px; background: #050505; 
                    border: 2px solid var(--glass-border); border-radius: 20px; position: relative; cursor: crosshair; overflow: hidden;
                }
                .target { position: absolute; transform: translate(-50%, -50%); font-size: 2rem; color: var(--primary); text-shadow: 0 0 10px var(--primary-glow); animation: fadeIn 0.5s ease; }
                .overlay { position: absolute; inset: 0; background: radial-gradient(circle at center, transparent, rgba(0,0,0,0.8)); pointer-events: none; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
                @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
            </style>
        `;
    }
};

window.HideAndSeekGame = HideAndSeekGame;
