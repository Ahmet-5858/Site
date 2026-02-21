const SimonSaysGame = {
    sequence: [],
    playerSequence: [],
    level: 0,
    isLock: false,
    colors: ['purple', 'blue', 'pink', 'cyan'],

    init(container) {
        this.sequence = [];
        this.playerSequence = [];
        this.level = 0;
        this.isLock = false;
        this.nextLevel(container);
    },

    nextLevel(container) {
        this.level++;
        this.playerSequence = [];
        this.sequence.push(this.colors[Math.floor(Math.random() * 4)]);
        this.render(container);
        setTimeout(() => this.playSequence(container), 1000);
    },

    async playSequence(container) {
        this.isLock = true;
        for (const color of this.sequence) {
            await this.flash(color);
            await new Promise(r => setTimeout(r, 200));
        }
        this.isLock = false;
        this.render(container);
    },

    flash(color) {
        return new Promise(resolve => {
            const btn = document.querySelector(`.s-btn.${color}`);
            if (btn) {
                btn.classList.add('flash');
                setTimeout(() => {
                    btn.classList.remove('flash');
                    resolve();
                }, 500);
            } else resolve();
        });
    },

    handleInput(color, container) {
        if (this.isLock) return;

        this.playerSequence.push(color);
        const idx = this.playerSequence.length - 1;

        if (this.playerSequence[idx] !== this.sequence[idx]) {
            this.render(container, 'HATALI! 💀');
            this.isLock = true;
            return;
        }

        if (this.playerSequence.length === this.sequence.length) {
            this.render(container, 'GÜZEL! ✅');
            setTimeout(() => this.nextLevel(container), 800);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="simon-game">
                <div class="level-display">SEVİYE: ${this.level}</div>
                <div class="simon-grid">
                    ${this.colors.map(c => `
                        <div class="s-btn ${c}" onclick="SimonSaysGame.handleInput('${c}', document.getElementById('game-container'))"></div>
                    `).join('')}
                </div>
                ${status ? `<div class="game-status">${status}</div>` : ''}
                <button class="primary-btn outline" onclick="SimonSaysGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .simon-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .level-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 2rem; }
                .simon-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 200px; }
                .s-btn { 
                    width: 90px; height: 90px; border-radius: 12px; cursor: pointer; transition: 0.2s; 
                    border: 2px solid var(--glass-border); opacity: 0.5;
                }
                .s-btn.purple { background: var(--primary); }
                .s-btn.blue { background: var(--secondary); }
                .s-btn.pink { background: #ec4899; }
                .s-btn.cyan { background: #06b6d4; }
                .s-btn:active, .s-btn.flash { opacity: 1; transform: scale(1.05); box-shadow: 0 0 20px currentColor; }
                .game-status { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-top: 1.5rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.SimonSaysGame = SimonSaysGame;
