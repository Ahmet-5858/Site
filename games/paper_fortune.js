const PaperFortuneGame = {
    fortunes: [
        'Bugün senin şanslı günün! 🎉',
        'Beklediğin haber yakında gelecek. 📬',
        'Yeni bir maceraya hazır ol! ✈️',
        'Cüzdanın yakında bayram edecek. 💰',
        'Biri seni çok özlüyor... ❤️',
        'Sabırlı ol, meyvesini toplayacaksın. 🍎',
        'Bugün küçük bir hediye alabilirsin. 🎁',
        'Yıldızın parlak, yolun açık olsun! ✨'
    ],
    colors: ['#a855f7', '#3b82f6', '#ec4899', '#10b981'],

    init(container) {
        this.render(container);
    },

    getFortune(container) {
        const fortune = this.fortunes[Math.floor(Math.random() * this.fortunes.length)];
        this.render(container, fortune);
    },

    render(container, result = null) {
        container.innerHTML = `
            <div class="pf-game">
                <div class="fortune-teller">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                </div>
                
                <div class="fortune-display ${result ? 'active' : ''}">
                    ${result || 'Kağıdı seç ve geleceğini gör!'}
                </div>

                <div class="paper-grid">
                    ${this.colors.map((c, i) => `
                        <div class="fortune-paper" style="background: ${c}" onclick="PaperFortuneGame.getFortune(document.getElementById('game-container'))">
                            <span>${i + 1}</span>
                        </div>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="PaperFortuneGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .pf-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .fortune-teller { font-size: 4rem; color: var(--primary); margin-bottom: 1rem; animation: float 3s infinite; }
                .fortune-display { 
                    padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 12px;
                    border: 1px solid var(--glass-border); min-height: 4rem; margin-bottom: 2rem;
                    display: flex; align-items: center; justify-content: center; font-weight: 700;
                }
                .fortune-display.active { border-color: var(--primary); box-shadow: 0 0 15px var(--primary-glow); animation: scaleUp 0.3s ease; }
                .paper-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .fortune-paper { 
                    width: 100px; height: 100px; border-radius: 12px; cursor: pointer; transition: 0.3s;
                    display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 900; color: white;
                }
                .fortune-paper:hover { transform: rotate(15deg) scale(1.1); box-shadow: 0 0 20px rgba(0,0,0,0.5); }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.PaperFortuneGame = PaperFortuneGame;
