const ISpyGame = {
    items: [
        { word: 'GÖZLÜK', hint: 'Gözlerin yardımcısıdır.' },
        { word: 'ANAHTAR', hint: 'Kapıları açar.' },
        { word: 'KİTAP', hint: 'İçinde binlerce dünya vardır.' },
        { word: 'SAAT', hint: 'Zamanın sesidir.' },
        { word: 'BARDAK', hint: 'Su içmek için kullanılır.' }
    ],
    currentItem: null,
    isGameOver: false,

    init(container) {
        this.currentItem = this.items[Math.floor(Math.random() * this.items.length)];
        this.isGameOver = false;
        this.render(container);
    },

    guess(value, container) {
        if (this.isGameOver) return;
        const cleanGuess = value.trim().toUpperCase();
        if (!cleanGuess) return;

        if (cleanGuess === this.currentItem.word) {
            this.isGameOver = true;
            this.render(container, `TEBRİKLER! 🎉 "${this.currentItem.word}" doğru cevap.`);
        } else {
            this.render(container, `Üzgünüm, "${cleanGuess}" değil. Tekrar dene!`);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="ispy-game">
                <div class="hint-card">
                    <span class="label">İpucu:</span>
                    <p class="hint-text">${this.currentItem.hint}</p>
                </div>

                <div class="spy-visual">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </div>

                ${status ? `<div class="game-status">${status}</div>` : '<div class="game-status">Aklımdan ne geçiyor?</div>'}

                <div class="input-area" style="margin-top: 1rem;">
                    <input type="text" id="spy-input" placeholder="Tahmin..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') ISpyGame.guess(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="ISpyGame.guess(document.getElementById('spy-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>BUL!</button>
                </div>

                <button class="primary-btn outline" onclick="ISpyGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:2rem; padding: 10px 20px;">
                    Yeni Soru
                </button>
            </div>
            <style>
                .ispy-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .hint-card { background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 12px; border-left: 5px solid var(--primary); margin-bottom: 2rem; width: 100%; max-width: 400px; text-align: left; }
                .label { font-weight: 800; font-size: 0.8rem; color: var(--primary); text-transform: uppercase; }
                .hint-text { font-size: 1.2rem; font-weight: 600; color: white; margin-top: 5px; }
                .spy-visual { margin-bottom: 2rem; }
                .spy-visual i { font-size: 4rem; color: var(--primary); opacity: 0.5; animation: pulse 2s infinite; }
                .game-status { font-size: 1.1rem; font-weight: 700; color: var(--primary); min-height: 2rem; margin-bottom: 1rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #spy-input { flex: 1; padding: 12px; }
                @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.6; } }
            </style>
        `;
    }
};

window.ISpyGame = ISpyGame;
