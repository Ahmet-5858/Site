const WouldYouRatherGame = {
    questions: [
        { a: 'Her zaman görünmez olmak', b: 'Her zaman uçabilmek' },
        { a: 'Sadece sıcak yemek yemek', b: 'Sadece soğuk yemek yemek' },
        { a: 'Zengin olup yalnız yaşamak', b: 'Fakir olup mutlu bir aileye sahip olmak' },
        { a: 'Geleceği görmek', b: 'Geçmişi değiştirmek' },
        { a: 'Mars\'ta ilk insan olmak', b: 'Okyanusun en dibine inen ilk insan olmak' }
    ],
    currentQ: null,

    init(container) {
        this.nextQuestion(container);
    },

    nextQuestion(container) {
        this.currentQ = this.questions[Math.floor(Math.random() * this.questions.length)];
        this.render(container);
    },

    select(option, container) {
        this.render(container, option);
    },

    render(container, selected = null) {
        container.innerHTML = `
            <div class="wyr-game">
                <h2 class="wyr-title">Hangisini Seçerdin?</h2>
                <div class="options-container">
                    <div class="wyr-option purple ${selected === 'A' ? 'selected' : ''}" onclick="WouldYouRatherGame.select('A', document.getElementById('game-container'))">
                        <p>${this.currentQ.a}</p>
                        ${selected ? `<div class="perc">${selected === 'A' ? '70%' : '30%'}</div>` : ''}
                    </div>
                    <div class="vs">VEYA</div>
                    <div class="wyr-option blue ${selected === 'B' ? 'selected' : ''}" onclick="WouldYouRatherGame.select('B', document.getElementById('game-container'))">
                        <p>${this.currentQ.b}</p>
                        ${selected ? `<div class="perc">${selected === 'B' ? '65%' : '35%'}</div>` : ''}
                    </div>
                </div>
                ${selected ? `
                    <button class="primary-btn" onclick="WouldYouRatherGame.nextQuestion(document.getElementById('game-container'))" style="width:auto; margin-top:2rem; padding: 10px 40px;">
                        SIRADAKİ SORU
                    </button>
                ` : ''}
            </div>
            <style>
                .wyr-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .wyr-title { margin-bottom: 2rem; color: var(--primary); text-transform: uppercase; letter-spacing: 2px; }
                .options-container { display: flex; align-items: center; gap: 1rem; width: 100%; max-width: 600px; }
                .wyr-option { 
                    flex: 1; padding: 2rem 1rem; border-radius: 20px; cursor: pointer; transition: 0.3s; 
                    background: rgba(255,255,255,0.05); border: 2px solid var(--glass-border); position: relative;
                    min-height: 150px; display: flex; flex-direction: column; justify-content: center;
                }
                .wyr-option:hover { transform: scale(1.02); }
                .wyr-option.purple:hover { border-color: var(--primary); box-shadow: 0 0 20px var(--primary-glow); }
                .wyr-option.blue:hover { border-color: var(--secondary); box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
                .wyr-option.selected { border-width: 4px; pointer-events: none; }
                .wyr-option.purple.selected { border-color: var(--primary); background: rgba(168, 85, 247, 0.1); }
                .wyr-option.blue.selected { border-color: var(--secondary); background: rgba(59, 130, 246, 0.1); }
                .vs { font-weight: 900; opacity: 0.3; font-size: 1.2rem; }
                .perc { margin-top: 1rem; font-size: 1.5rem; font-weight: 800; color: white; animation: fadeIn 0.5s ease; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            </style>
        `;
    }
};

window.WouldYouRatherGame = WouldYouRatherGame;
