const ArmWrestlingGame = {
    power: 50, // 0 to 100, 50 is center
    isGameOver: false,

    init(container) {
        this.power = 50;
        this.isGameOver = false;
        this.render(container);
    },

    mash(container) {
        if (this.isGameOver) return;
        this.power += 5;
        this.checkWin(container);
    },

    cpuTick(container) {
        if (this.isGameOver) return;
        this.power -= 2; // CPU difficulty
        this.checkWin(container);
        this.render(container);
        setTimeout(() => this.cpuTick(container), 200);
    },

    start(container) {
        this.init(container);
        this.cpuTick(container);
    },

    checkWin(container) {
        if (this.power >= 100) {
            this.isGameOver = true;
            this.render(container, 'KAZANDIN! 💪');
        } else if (this.power <= 0) {
            this.isGameOver = true;
            this.render(container, 'KAYBETTİN! 💀');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="arm-game">
                <div class="arm-visual">
                    <div class="arm-bar">
                        <div class="arm-indicator" style="left: ${this.power}%">
                            <i class="fa-solid fa-handshake"></i>
                        </div>
                    </div>
                </div>

                <div class="status-msg">${status || (this.isGameOver ? '' : 'HIZLICA TIKLA!')}</div>

                <button class="primary-btn mash-btn" 
                    onmousedown="ArmWrestlingGame.mash(document.getElementById('game-container'))" 
                    ${this.isGameOver ? 'disabled' : ''}>
                    BAK! 💪
                </button>
                
                <button class="primary-btn outline" onclick="ArmWrestlingGame.start(document.getElementById('game-container'))" style="margin-top: 2rem;">
                    ${this.isGameOver ? 'Yeniden Başlat' : 'HAZIR OL!'}
                </button>
            </div>
            <style>
                .arm-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .arm-visual { width: 100%; max-width: 400px; margin-bottom: 2rem; }
                .arm-bar { 
                    height: 20px; background: rgba(255,255,255,0.05); border-radius: 10px; 
                    position: relative; border: 1px solid var(--glass-border);
                }
                .arm-bar::before { content: ''; position: absolute; left: 50%; top: -10px; bottom: -10px; width: 2px; background: var(--primary); opacity: 0.5; }
                .arm-indicator { position: absolute; top: 50%; transform: translate(-50%, -50%); transition: 0.1s; font-size: 2rem; color: white; text-shadow: 0 0 10px var(--primary); }
                .status-msg { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; min-height: 2rem; }
                .mash-btn { width: 120px; height: 120px; border-radius: 50%; font-size: 1.5rem; box-shadow: 0 0 20px var(--primary-glow); }
                .mash-btn:active { transform: scale(0.9); box-shadow: 0 0 10px var(--primary-glow); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.ArmWrestlingGame = ArmWrestlingGame;
