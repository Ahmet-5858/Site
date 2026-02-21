const SoundGuessGame = {
    sounds: [
        { id: 'lion', icon: 'fa-cat', name: 'Aslan', hint: 'Kükremesiyle tanınır.' },
        { id: 'cow', icon: 'fa-cow', name: 'İnek', hint: 'Sütü sevilir.' },
        { id: 'elephant', icon: 'fa-elephant', name: 'Fil', hint: 'Hortumu vardır.' },
        { id: 'car', icon: 'fa-car', name: 'Araba', hint: 'Trafikte korna çalar.' },
        { id: 'bell', icon: 'fa-bell', name: 'Zil', hint: 'Ders bittiğini haber verir.' }
    ],
    currentSound: null,
    isGameOver: false,

    init(container) {
        this.nextSound(container);
    },

    nextSound(container) {
        this.currentSound = this.sounds[Math.floor(Math.random() * this.sounds.length)];
        this.isGameOver = false;
        this.render(container);
    },

    guess(id, container) {
        if (this.isGameOver) return;
        if (id === this.currentSound.id) {
            this.isGameOver = true;
            this.render(container, 'DOĞRU! ✅');
        } else {
            this.render(container, 'TEKRAR DENE! ❌');
        }
    },

    render(container, status = 'Sesi zihninde canlandır ve tahmin et!') {
        container.innerHTML = `
            <div class="sound-game">
                <div class="sound-visual ${this.isGameOver ? 'active' : 'pulse'}">
                    <i class="fa-solid ${this.isGameOver ? this.currentSound.icon : 'fa-ear-listen'}"></i>
                </div>

                <div class="game-info">${status}</div>
                <div class="hint-box">İpucu: ${this.currentSound.hint}</div>

                <div class="options-grid" style="margin-top: 2rem;">
                    ${this.sounds.map(s => `
                        <button class="option-btn" onclick="SoundGuessGame.guess('${s.id}', document.getElementById('game-container'))">
                            ${s.name}
                        </button>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="SoundGuessGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .sound-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .sound-visual { 
                    width: 120px; height: 120px; border-radius: 50%; background: rgba(59, 130, 246, 0.1);
                    border: 2px solid var(--secondary); display: flex; align-items: center; justify-content: center;
                    font-size: 3.5rem; color: var(--secondary); margin-bottom: 1.5rem; transition: 0.5s;
                }
                .sound-visual.active { border-color: var(--primary); color: var(--primary); text-shadow: 0 0 20px var(--primary-glow); transform: scale(1.1); }
                .sound-visual.pulse { animation: ripple 2s infinite; }
                .game-info { font-weight: 800; color: var(--secondary); margin-bottom: 0.5rem; }
                .hint-box { font-size: 0.9rem; opacity: 0.6; font-style: italic; }
                .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 400px; }
                .option-btn { 
                    padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
                    color: white; border-radius: 12px; cursor: pointer; transition: 0.2s; font-weight: 700;
                }
                .option-btn:hover { background: var(--secondary); border-color: var(--secondary); }
                @keyframes ripple { 0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); } 100% { box-shadow: 0 0 0 30px rgba(59, 130, 246, 0); } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.SoundGuessGame = SoundGuessGame;
