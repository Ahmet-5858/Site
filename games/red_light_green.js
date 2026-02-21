const RedLightGreenLightGame = {
    distance: 0,
    maxDistance: 100,
    isGreen: false,
    timer: null,
    isGameOver: false,

    init(container) {
        this.distance = 0;
        this.isGreen = false;
        this.isGameOver = false;
        this.render(container);
        this.startLoop(container);
    },

    startLoop(container) {
        if (this.isGameOver) return;

        this.isGreen = !this.isGreen;
        const delay = this.isGreen ? (1500 + Math.random() * 2000) : (1000 + Math.random() * 1000);

        this.render(container);
        this.timer = setTimeout(() => this.startLoop(container), delay);
    },

    move(container) {
        if (this.isGameOver) return;

        if (!this.isGreen) {
            this.distance = 0;
            this.render(container, 'YAKALANDIN! 🛑 Başa dönüyoruz.');
            return;
        }

        this.distance += 5;
        if (this.distance >= this.maxDistance) {
            this.isGameOver = true;
            this.render(container, 'FINISH! 🏁 Kazandın!');
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="rlgl-game">
                <div class="light-container">
                    <div class="light ${this.isGreen ? 'green' : 'red'}"></div>
                </div>
                
                <div class="track">
                    <div class="runner" style="left: ${this.distance}%">
                        <i class="fa-solid fa-person-running"></i>
                    </div>
                </div>

                <div class="game-status">${status || (this.isGreen ? 'KOŞ! 🏃' : 'DUR! 🛑')}</div>

                <button class="primary-btn run-btn" 
                    onmousedown="RedLightGreenLightGame.move(document.getElementById('game-container'))"
                    ${this.isGameOver ? 'disabled' : ''}>
                    İLERLE
                </button>
                
                <button class="primary-btn outline" onclick="RedLightGreenLightGame.init(document.getElementById('game-container'))" style="margin-top: 1.5rem;">
                    Sıfırla
                </button>
            </div>
            <style>
                .rlgl-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .light-container { width: 60px; height: 60px; border-radius: 50%; background: #222; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; border: 4px solid #444; }
                .light { width: 40px; height: 40px; border-radius: 50%; transition: 0.2s; }
                .light.red { background: #ef4444; box-shadow: 0 0 20px #ef4444; }
                .light.green { background: #10b981; box-shadow: 0 0 20px #10b981; }
                .track { width: 100%; height: 40px; background: rgba(255,255,255,0.05); border-radius: 20px; position: relative; margin-bottom: 2rem; border: 1px solid var(--glass-border); }
                .runner { position: absolute; top: 50%; transform: translate(-50%, -50%); transition: 0.1s; font-size: 1.5rem; color: var(--primary); }
                .game-status { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; height: 1.5rem; }
                .run-btn { width: 100px; height: 100px; border-radius: 50%; font-size: 1.2rem; font-weight: 900; box-shadow: 0 0 15px var(--primary-glow); }
                .run-btn:active { transform: scale(0.95); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.RedLightGreenLightGame = RedLightGreenLightGame;
