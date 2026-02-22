const ShadowGuessGame = {
    shadows: [
        { id: 'cat', icon: 'fa-cat', name: 'Kedi' },
        { id: 'dog', icon: 'fa-dog', name: 'Köpek' },
        { id: 'bird', icon: 'fa-dove', name: 'Kuş' },
        { id: 'tree', icon: 'fa-tree', name: 'Ağaç' },
        { id: 'car', icon: 'fa-car', name: 'Araba' },
        { id: 'bike', icon: 'fa-bicycle', name: 'Bisiklet' }
    ],
    currentShadow: null,
    isGameOver: false,

    init(container) {
        this.nextShadow(container);
    },

    nextShadow(container) {
        this.currentShadow = this.shadows[Math.floor(Math.random() * this.shadows.length)];
        this.isGameOver = false;
        this.render(container);
    },

    guess(id, container) {
        if (this.isGameOver) return;
        if (id === this.currentShadow.id) {
            this.isGameOver = true;
            this.render(container, 'DOĞRU! ✅');
        } else {
            this.render(container, 'TEKRAR DENE! ❌');
        }
    },

    render(container, status = 'Bu gölge neye ait?') {
        container.innerHTML = `
            <div class="shadow-game">
                <div class="shadow-visual ${this.isGameOver ? 'reveal' : ''}">
                    <i class="fa-solid ${this.currentShadow.icon}"></i>
                </div>

                <div class="game-info">${status}</div>

                <div class="options-grid">
                    ${this.shadows.map(s => `
                        <button class="option-btn" onclick="ShadowGuessGame.guess('${s.id}', document.getElementById('game-container'))">
                            ${s.name}
                        </button>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="ShadowGuessGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .shadow-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .shadow-visual { 
                    width: 150px; height: 150px; background: rgba(0,0,0,0.8); border: 2px solid var(--glass-border);
                    border-radius: 20px; display: flex; align-items: center; justify-content: center;
                    font-size: 5rem; margin-bottom: 2rem; color: transparent; text-shadow: 0 0 0 black;
                    transition: 0.5s;
                }
                .shadow-visual.reveal { color: var(--primary); text-shadow: 0 0 20px var(--primary-glow); background: rgba(168,85,247,0.1); }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; }
                .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; max-width: 400px; }
                .option-btn { 
                    padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
                    color: white; border-radius: 12px; cursor: pointer; transition: 0.2s; font-weight: 700;
                }
                .option-btn:hover { background: var(--primary); border-color: var(--primary); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.ShadowGuessGame = ShadowGuessGame;
