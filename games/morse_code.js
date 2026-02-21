const MorseCodeGame = {
    codes: {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
        'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
        'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..'
    },
    currentTarget: '',
    isGameOver: false,

    init(container) {
        const letters = Object.keys(this.codes);
        this.currentTarget = letters[Math.floor(Math.random() * letters.length)];
        this.isGameOver = false;
        this.render(container);
    },

    check(value, container) {
        if (this.isGameOver) return;
        if (value.trim() === this.codes[this.currentTarget]) {
            this.isGameOver = true;
            this.render(container, 'MÜKEMMEL! ✅');
        } else {
            this.render(container, 'Hatalı kod, tekrar dene! ❌');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="morse-game">
                <div class="target-letter">${this.currentTarget}</div>
                <div class="game-info">${status || 'Bu harfin Mors kodu nedir?'}</div>
                
                <div class="input-area">
                    <input type="text" id="morse-input" placeholder=".- formatında yaz..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') MorseCodeGame.check(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="MorseCodeGame.check(document.getElementById('morse-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>GÖNDER</button>
                </div>

                <div class="morse-keys">
                    <span>İpucu: . = Nokta, - = Çizgi</span>
                </div>

                <button class="primary-btn outline" onclick="MorseCodeGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Harf</button>
            </div>
            <style>
                .morse-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .target-letter { font-size: 5rem; font-weight: 900; color: var(--primary); text-shadow: 0 0 20px var(--primary-glow); margin-bottom: 1rem; }
                .game-info { font-weight: 700; margin-bottom: 2rem; min-height: 1.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; margin-bottom: 1rem; }
                #morse-input { flex: 1; padding: 12px; font-size: 1.2rem; letter-spacing: 5px; text-align: center; }
                .morse-keys { font-size: 0.8rem; opacity: 0.5; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('morse-input').focus();
    }
};

window.MorseCodeGame = MorseCodeGame;
