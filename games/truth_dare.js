const TruthOrDareGame = {
    content: {
        truth: [
            'En büyük korkun nedir?',
            'Son söylediğin yalan nedir?',
            'Görünmez olsan ilk nereye giderdin?',
            'Çocukken en çok kime hayrandın?',
            'En utanç verici anın nedir?'
        ],
        dare: [
            '30 saniye boyunca tavuk gibi dans et.',
            'En sevdiğin şarkıyı yüksek sesle söyle.',
            'Ağzına bir kaşık su alıp 1 dakika beklet.',
            'Burnuna parmağınla dokunmaya çalış.',
            'Odadaki birine komik bir şiir yaz.'
        ]
    },
    currentResult: null,

    init(container) {
        this.currentResult = null;
        this.render(container);
    },

    spin(type, container) {
        const list = this.content[type];
        this.currentResult = {
            type: type === 'truth' ? 'DOĞRULUK' : 'CESARET',
            text: list[Math.floor(Math.random() * list.length)]
        };
        this.render(container);
    },

    render(container) {
        container.innerHTML = `
            <div class="td-game">
                <div class="td-display ${this.currentResult ? 'active' : ''}">
                    ${this.currentResult ? `
                        <div class="result-badge ${this.currentResult.type === 'DOĞRULUK' ? 't' : 'd'}">${this.currentResult.type}</div>
                        <p class="result-text">${this.currentResult.text}</p>
                    ` : '<p class="placeholder-text">Bir seçim yap ve çark dönsün!</p>'}
                </div>

                <div class="td-controls">
                    <button class="choice-btn truth" onclick="TruthOrDareGame.spin('truth', document.getElementById('game-container'))">
                        <i class="fa-solid fa-scale-balanced"></i>
                        <span>Doğruluk</span>
                    </button>
                    <button class="choice-btn dare" onclick="TruthOrDareGame.spin('dare', document.getElementById('game-container'))">
                        <i class="fa-solid fa-bolt"></i>
                        <span>Cesaret</span>
                    </button>
                </div>
            </div>
            <style>
                .td-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .td-display { 
                    width: 100%; min-height: 180px; padding: 2rem; border-radius: 20px;
                    background: rgba(255,255,255,0.03); border: 2px dashed var(--glass-border);
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    margin-bottom: 2rem; transition: 0.3s;
                }
                .td-display.active { background: rgba(255,255,255,0.08); border-style: solid; border-color: var(--primary); }
                .result-badge { padding: 4px 15px; border-radius: 10px; font-weight: 800; font-size: 0.8rem; margin-bottom: 1rem; }
                .result-badge.t { background: #10b981; }
                .result-badge.d { background: #ef4444; }
                .result-text { font-size: 1.4rem; font-weight: 700; color: white; line-height: 1.4; animation: scaleUp 0.3s ease; }
                .placeholder-text { opacity: 0.4; font-style: italic; }
                .td-controls { display: flex; gap: 1.5rem; }
                .choice-btn { 
                    display: flex; flex-direction: column; align-items: center; gap: 10px;
                    padding: 1.5rem 2.5rem; border-radius: 16px; cursor: pointer; transition: 0.3s;
                    border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05); color: white;
                }
                .choice-btn:hover { transform: translateY(-5px); background: rgba(255,255,255,0.1); }
                .choice-btn.truth:hover { border-color: #10b981; color: #10b981; }
                .choice-btn.dare:hover { border-color: #ef4444; color: #ef4444; }
                .choice-btn i { font-size: 2rem; }
                @keyframes scaleUp { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            </style>
        `;
    }
};

window.TruthOrDareGame = TruthOrDareGame;
