const RhythmGame = {
    sequence: [],
    playerSequence: [],
    level: 0,
    isLock: false,

    init(container) {
        this.sequence = [];
        this.level = 0;
        this.nextLevel(container);
    },

    nextLevel(container) {
        this.level++;
        this.playerSequence = [];
        this.sequence.push(Math.random() > 0.5 ? 'clap' : 'snap');
        this.render(container);
        setTimeout(() => this.playSequence(container), 1000);
    },

    async playSequence(container) {
        this.isLock = true;
        for (const move of this.sequence) {
            await this.highlight(move);
            await new Promise(r => setTimeout(r, 400));
        }
        this.isLock = false;
        this.render(container);
    },

    highlight(move) {
        return new Promise(resolve => {
            const el = document.querySelector(`.r-btn.${move}`);
            if (el) {
                el.classList.add('active');
                setTimeout(() => {
                    el.classList.remove('active');
                    resolve();
                }, 300);
            } else resolve();
        });
    },

    input(move, container) {
        if (this.isLock) return;
        this.playerSequence.push(move);
        const idx = this.playerSequence.length - 1;

        if (this.playerSequence[idx] !== this.sequence[idx]) {
            this.render(container, 'RİTMİ BOZDUN! 💀');
            this.isLock = true;
            return;
        }

        if (this.playerSequence.length === this.sequence.length) {
            this.render(container, 'HARİKA RİTİM! ✅');
            setTimeout(() => this.nextLevel(container), 800);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="rhythm-game">
                <div class="level-display">RİTİM: ${this.level}</div>
                <div class="r-visual">
                    <div class="r-btn clap" onclick="RhythmGame.input('clap', document.getElementById('game-container'))">
                        <i class="fa-solid fa-hands-clapping"></i>
                        <span>ALKIIIŞ</span>
                    </div>
                    <div class="r-btn snap" onclick="RhythmGame.input('snap', document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-point-up"></i>
                        <span>ŞIKLAT</span>
                    </div>
                </div>
                ${status ? `<div class="game-status">${status}</div>` : ''}
                <button class="primary-btn outline" onclick="RhythmGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .rhythm-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .level-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 2rem; }
                .r-visual { display: flex; gap: 20px; }
                .r-btn { 
                    width: 120px; height: 120px; border-radius: 20px; border: 2px solid var(--glass-border);
                    background: rgba(255,255,255,0.05); cursor: pointer; display: flex; flex-direction: column;
                    align-items: center; justify-content: center; gap: 10px; transition: 0.2s;
                }
                .r-btn.active, .r-btn:active { background: var(--primary); border-color: var(--primary); box-shadow: 0 0 20px var(--primary-glow); transform: scale(1.1); }
                .r-btn i { font-size: 2.5rem; }
                .r-btn span { font-weight: 800; font-size: 0.8rem; }
                .game-status { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-top: 1.5rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.RhythmGame = RhythmGame;
