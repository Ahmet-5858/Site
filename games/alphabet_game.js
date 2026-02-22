const AlphabetGame = {
    alphabet: 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split(''),
    currentIndex: 0,
    isGameOver: false,

    init(container) {
        this.currentIndex = 0;
        this.isGameOver = false;
        this.render(container);
    },

    submit(container) {
        const val = document.getElementById('abc-input').value.trim().toUpperCase();
        if (!val || val[0] !== this.alphabet[this.currentIndex]) return;

        this.currentIndex++;
        if (this.currentIndex >= this.alphabet.length) {
            this.isGameOver = true;
            this.render(container, 'TEBRİKLER! Tüm alfabeyi tamamladın! 🏆');
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="abc-game">
                <div class="progress-bar">
                    <div class="progress" style="width: ${(this.currentIndex / this.alphabet.length) * 100}%"></div>
                </div>
                
                <div class="letter-box">${this.alphabet[this.currentIndex] || '✓'}</div>
                <p class="instr">${this.alphabet[this.currentIndex] ? `"${this.alphabet[this.currentIndex]}" harfiyle bir kelime yaz.` : ''}</p>

                <div class="input-area">
                    <input type="text" id="abc-input" placeholder="Kelime..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') AlphabetGame.submit(document.getElementById('game-container'))">
                </div>

                ${status ? `<div class="game-status">${status}</div>` : ''}

                <button class="primary-btn outline" onclick="AlphabetGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .abc-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .progress-bar { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; margin-bottom: 2rem; overflow: hidden; }
                .progress { height: 100%; background: var(--primary); transition: 0.3s; box-shadow: 0 0 10px var(--primary-glow); }
                .letter-box { width: 80px; height: 80px; background: var(--primary); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 3rem; font-weight: 900; color: white; margin-bottom: 1rem; box-shadow: 0 8px 20px var(--primary-glow); }
                .instr { font-size: 1rem; opacity: 0.7; margin-bottom: 1.5rem; }
                #abc-input { padding: 15px; width: 100%; max-width: 300px; text-align: center; font-size: 1.2rem; font-weight: 700; border-radius: 12px; }
                .game-status { font-size: 1.4rem; font-weight: 800; color: var(--success); margin-top: 1rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('abc-input').focus();
    }
};

window.AlphabetGame = AlphabetGame;
