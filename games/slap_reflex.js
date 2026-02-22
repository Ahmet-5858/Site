const SlapReflexGame = {
    state: 'idle', // idle, waiting, cue, result
    timer: null,
    startTime: 0,
    bestTime: Infinity,

    init(container) {
        this.state = 'idle';
        this.render(container);
    },

    start(container) {
        this.state = 'waiting';
        this.render(container);

        const delay = 1000 + Math.random() * 3000;
        this.timer = setTimeout(() => {
            this.state = 'cue';
            this.startTime = Date.now();
            this.render(container);
        }, delay);
    },

    slap(container) {
        if (this.state === 'waiting') {
            clearTimeout(this.timer);
            this.state = 'result';
            this.render(container, 'ERKEN BASALDIN! ❌');
        } else if (this.state === 'cue') {
            const reactionTime = Date.now() - this.startTime;
            if (reactionTime < this.bestTime) this.bestTime = reactionTime;
            this.state = 'result';
            this.render(container, `TEBRİKLER! 🎉<br><span style="font-size: 2rem;">${reactionTime}ms</span>`);
        }
    },

    render(container, resultMsg = '') {
        let bg = 'rgba(255,255,255,0.05)';
        let icon = 'fa-regular fa-hand';
        let mainText = 'BAŞLAMAK İÇİN TIKLA';

        if (this.state === 'waiting') {
            bg = 'rgba(239, 68, 68, 0.1)';
            mainText = 'BEKLE... 🛑';
            icon = 'fa-solid fa-hand-dots';
        } else if (this.state === 'cue') {
            bg = 'rgba(16, 185, 129, 0.3)';
            mainText = 'ŞİMDİ VUR! 🔥';
            icon = 'fa-solid fa-hand-back-fist';
        } else if (this.state === 'result') {
            mainText = resultMsg;
            icon = 'fa-solid fa-stopwatch';
        }

        container.innerHTML = `
            <div class="slap-game">
                <div class="best-score">En İyi: ${this.bestTime === Infinity ? '--' : this.bestTime + 'ms'}</div>
                
                <div class="slap-area ${this.state}" 
                    style="background: ${bg}"
                    onclick="${this.state === 'idle' || this.state === 'result' ? 'SlapReflexGame.start(document.getElementById(\'game-container\'))' : 'SlapReflexGame.slap(document.getElementById(\'game-container\'))'}">
                    <i class="${icon}"></i>
                    <h2>${mainText}</h2>
                    ${this.state === 'result' ? '<p style="margin-top:10px; opacity:0.6;">Tekrar denemek için tıkla</p>' : ''}
                </div>
            </div>
            <style>
                .slap-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .best-score { font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; }
                .slap-area { 
                    width: 100%; max-width: 400px; height: 300px; border-radius: 20px;
                    border: 2px solid var(--glass-border); cursor: pointer;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    transition: 0.1s; user-select: none;
                }
                .slap-area:active { transform: scale(0.98); }
                .slap-area.cue { border-color: #10b981; box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); }
                .slap-area i { font-size: 4rem; margin-bottom: 1.5rem; }
                .slap-area h2 { font-weight: 900; letter-spacing: 1px; }
            </style>
        `;
    }
};

window.SlapReflexGame = SlapReflexGame;
