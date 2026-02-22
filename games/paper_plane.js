const PaperPlaneGame = {
    distance: 0,
    isFlying: false,
    power: 0,
    timer: null,

    init(container) {
        this.distance = 0;
        this.isFlying = false;
        this.power = 0;
        this.render(container);
    },

    launch(container) {
        if (this.isFlying) return;

        // Power up bar
        this.isFlying = true;
        let p = 0;
        const barInterval = setInterval(() => {
            p = (p + 5) % 110;
            this.power = p > 100 ? 100 - (p - 100) : p;
            this.render(container, 'GÜÇLÜ FIRLAT!');
        }, 50);

        // Click again to release
        const clickHandler = () => {
            clearInterval(barInterval);
            document.removeEventListener('mousedown', clickHandler);
            this.startFlight(this.power, container);
        };
        setTimeout(() => document.addEventListener('mousedown', clickHandler), 100);
    },

    startFlight(power, container) {
        const targetDist = Math.floor(power * (Math.random() * 2 + 1));
        let d = 0;
        const flightInterval = setInterval(() => {
            d += 2;
            this.distance = d;
            if (d >= targetDist) {
                clearInterval(flightInterval);
                this.isFlying = false;
                this.render(container, `Mesafe: ${targetDist}m ✈️`);
            } else {
                this.render(container, 'Uçuyor...');
            }
        }, 30);
    },

    render(container, status = 'Güç toplamak için fırlata bas ve uygun anda bırak!') {
        container.innerHTML = `
            <div class="plane-game">
                <div class="plane-area">
                    <div class="plane" style="left: ${this.distance / 3}%">
                        <i class="fa-solid fa-paper-plane"></i>
                    </div>
                </div>

                <div class="power-bar">
                    <div class="fill" style="width: ${this.power}%"></div>
                </div>

                <div class="game-status">${status}</div>

                <button class="primary-btn launch-btn" onclick="PaperPlaneGame.launch(document.getElementById('game-container'))" ${this.isFlying ? 'disabled' : ''}>
                    FIRLAT!
                </button>

                <button class="primary-btn outline" onclick="PaperPlaneGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .plane-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .plane-area { width: 100%; height: 100px; background: rgba(255,255,255,0.02); border-radius: 20px; position: relative; overflow: hidden; margin-bottom: 2rem; border: 1px dashed var(--glass-border); }
                .plane { position: absolute; bottom: 20px; font-size: 2rem; color: var(--primary); transition: 0.1s; text-shadow: 0 0 10px var(--primary-glow); }
                .power-bar { width: 100%; max-width: 300px; height: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; overflow: hidden; margin-bottom: 1rem; }
                .power-bar .fill { height: 100%; background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
                .game-status { font-weight: 700; color: var(--primary); min-height: 2rem; margin-bottom: 1.5rem; }
                .launch-btn { width: 100px; height: 100px; border-radius: 50%; font-weight: 900; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.PaperPlaneGame = PaperPlaneGame;
