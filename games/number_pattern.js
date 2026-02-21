const NumberPatternGame = {
    patterns: [
        { sequence: [2, 4, 6, 8], answer: 10, hint: '+2 artıyor' },
        { sequence: [1, 3, 9, 27], answer: 81, hint: '3 ile çarpılıyor' },
        { sequence: [100, 95, 90, 85], answer: 80, hint: '-5 azalıyor' },
        { sequence: [1, 4, 9, 16], answer: 25, hint: 'Kare sayılar' }
    ],
    currentPattern: null,
    isGameOver: false,

    init(container) {
        this.currentPattern = this.patterns[Math.floor(Math.random() * this.patterns.length)];
        this.isGameOver = false;
        this.render(container);
    },

    check(value, container) {
        if (this.isGameOver) return;
        if (parseInt(value) === this.currentPattern.answer) {
            this.isGameOver = true;
            this.render(container, 'DOĞRU! 🧠 Sayı dehasısın!');
        } else {
            this.render(container, 'Hatalı rakam, tekrar düşün! ❌');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="pattern-game">
                <div class="sequence-box">
                    ${this.currentPattern.sequence.map(n => `<div class="num-card">${n}</div>`).join('')}
                    <div class="num-card question">?</div>
                </div>

                <div class="game-info">${status || 'Örüntüyü tamamla! Bir sonraki sayı nedir?'}</div>
                
                <div class="input-area">
                    <input type="number" id="pattern-input" placeholder="?" ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') NumberPatternGame.check(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="NumberPatternGame.check(document.getElementById('pattern-input').value, document.getElementById('game-container'))">KONTROL</button>
                </div>

                ${this.isGameOver ? `<div class="hint-box">Kural: ${this.currentPattern.hint}</div>` : ''}

                <button class="primary-btn outline" onclick="NumberPatternGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Örüntü</button>
            </div>
            <style>
                .pattern-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .sequence-box { display: flex; gap: 15px; margin-bottom: 2rem; justify-content: center; }
                .num-card { 
                    width: 60px; height: 60px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
                    border-radius: 12px; display: flex; align-items: center; justify-content: center;
                    font-size: 1.5rem; font-weight: 800; color: var(--primary);
                }
                .num-card.question { border-color: var(--secondary); color: var(--secondary); animation: pulse 2s infinite; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 300px; }
                #pattern-input { flex: 1; padding: 12px; font-size: 1.2rem; text-align: center; }
                .hint-box { margin-top: 1.5rem; font-style: italic; color: var(--secondary); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) {
            const el = document.getElementById('pattern-input');
            if (el) el.focus();
        }
    }
};

window.NumberPatternGame = NumberPatternGame;
