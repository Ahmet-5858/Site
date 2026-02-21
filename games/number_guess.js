const NumberGuessGame = {
    targetNum: 0,
    attempts: 0,
    isGameOver: false,

    init(container) {
        this.targetNum = Math.floor(Math.random() * 100) + 1;
        this.attempts = 0;
        this.isGameOver = false;
        this.render(container, '1 ile 100 arasında bir sayı tuttum. Tahmin et!');
    },

    guess(value, container) {
        if (this.isGameOver) return;
        const guess = parseInt(value);
        if (isNaN(guess)) return;

        this.attempts++;
        if (guess === this.targetNum) {
            this.isGameOver = true;
            this.render(container, `TEBRİKLER! 🎉 ${this.attempts}. denemede buldun!`);
        } else if (guess < this.targetNum) {
            this.render(container, 'Daha YÜKSEK! ⬆️');
        } else {
            this.render(container, 'Daha DÜŞÜK! ⬇️');
        }
    },

    render(container, status = '') {
        container.innerHTML = `
            <div class="guess-game">
                <div class="game-status">${status}</div>
                <div class="attempt-badge">Deneme: ${this.attempts}</div>
                
                <div class="input-area" style="margin-top: 2rem;">
                    <input type="number" id="guess-input" placeholder="Sayı gir..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') NumberGuessGame.guess(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="NumberGuessGame.guess(document.getElementById('guess-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>Tahmin Et</button>
                </div>

                <button class="primary-btn outline" onclick="NumberGuessGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeniden Başlat</button>
            </div>
            <style>
                .guess-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-status { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; min-height: 4rem; }
                .attempt-badge { padding: 5px 15px; background: rgba(255,255,255,0.05); border-radius: 10px; opacity: 0.7; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #guess-input { flex: 1; padding: 12px; -moz-appearance: textfield; }
                #guess-input::-webkit-outer-spin-button, #guess-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('guess-input').focus();
    }
};

window.NumberGuessGame = NumberGuessGame;
