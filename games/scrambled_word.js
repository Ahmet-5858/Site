const ScrambledWordGame = {
    words: ['YAZILIM', 'GELİŞTİRİCİ', 'BİLGİSAYAR', 'LABİRENT', 'KÜTÜPHANE', 'TEKNOLOJİ', 'İLERLEME', 'OYUN'],
    currentWord: '',
    scrambled: '',
    isGameOver: false,

    init(container) {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.scrambled = this.scramble(this.currentWord);
        this.isGameOver = false;
        this.render(container);
    },

    scramble(word) {
        return word.split('').sort(() => Math.random() - 0.5).join('');
    },

    check(value, container) {
        if (this.isGameOver) return;
        if (value.trim().toUpperCase() === this.currentWord) {
            this.isGameOver = true;
            this.render(container, 'TEBRİKLER! 🎉 Doğru Kelime.');
        } else {
            this.render(container, 'Yanlış, tekrar dene! ❌');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="sw-game">
                <div class="scrambled-box">${this.scrambled}</div>
                <div class="game-info">${status || 'Karışık harfleri düzelt ve kelimeyi bul!'}</div>
                
                <div class="input-area">
                    <input type="text" id="sw-input" placeholder="Tahminini yaz..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') ScrambledWordGame.check(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="ScrambledWordGame.check(document.getElementById('sw-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>KONTROL ET</button>
                </div>

                <button class="primary-btn outline" onclick="ScrambledWordGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Kelime</button>
            </div>
            <style>
                .sw-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .scrambled-box { font-size: 3rem; font-weight: 900; letter-spacing: 5px; color: var(--primary); text-shadow: 0 0 15px var(--primary-glow); margin-bottom: 1.5rem; word-break: break-all; }
                .game-info { font-weight: 700; margin-bottom: 2rem; min-height: 1.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #sw-input { flex: 1; padding: 12px; font-size: 1.1rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('sw-input').focus();
    }
};

window.ScrambledWordGame = ScrambledWordGame;
