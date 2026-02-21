const TwoTruthsOneLieGame = {
    scenarios: [
        {
            truths: ['Daha önce paraşütle atladım.', 'İki tane kedim var.'],
            lie: 'Hiç pizza yemedim.',
            hint: 'Genelde herkes hayatında bir kez pizza yemiştir.'
        },
        {
            truths: ['Japonca konuşabiliyorum.', 'Eskiden profesyonel yüzücüydüm.'],
            lie: 'Mars\'ta koloni kurdum.',
            hint: 'Mars\'ta henüz koloni kurulmadı!'
        },
        {
            truths: ['Satranç turnuvasında birinci oldum.', 'Beş dil biliyorum.'],
            lie: 'Görünmezlik pelerinim var.',
            hint: 'Harry Potter gerçek değil!'
        }
    ],
    currentSet: null,
    options: [],
    isGameOver: false,

    init(container) {
        const set = this.scenarios[Math.floor(Math.random() * this.scenarios.length)];
        this.currentSet = set;
        this.options = [...set.truths, set.lie].sort(() => Math.random() - 0.5);
        this.isGameOver = false;
        this.render(container);
    },

    guess(value, container) {
        if (this.isGameOver) return;
        if (value === this.currentSet.lie) {
            this.isGameOver = true;
            this.render(container, 'TEBRİKLER! 🎉 Yalanı buldun!');
        } else {
            this.render(container, 'BU BİR GERÇEK! ✅ Başka bir seçeneği dene.');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="truths-game">
                <div class="game-info">${status || 'Aşağıdakilerden hangisi bir YALAN?'}</div>
                
                <div class="options-list">
                    ${this.options.map(o => `
                        <button class="option-btn" onclick="TwoTruthsOneLieGame.guess('${o}', document.getElementById('game-container'))" ${this.isGameOver ? 'disabled' : ''}>
                            ${o}
                        </button>
                    `).join('')}
                </div>

                ${this.isGameOver ? `<div class="hint-box">İpucu: ${this.currentSet.hint}</div>` : ''}

                <button class="primary-btn outline" onclick="TwoTruthsOneLieGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Kart</button>
            </div>
            <style>
                .truths-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .options-list { display: flex; flex-direction: column; gap: 15px; width: 100%; max-width: 400px; }
                .option-btn { 
                    padding: 1.5rem; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
                    color: white; border-radius: 15px; cursor: pointer; transition: 0.3s; font-weight: 700; text-align: left;
                }
                .option-btn:hover:not(:disabled) { background: var(--primary); border-color: var(--primary); transform: translateX(10px); }
                .hint-box { margin-top: 1.5rem; font-style: italic; opacity: 0.7; color: var(--primary); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.TwoTruthsOneLieGame = TwoTruthsOneLieGame;
