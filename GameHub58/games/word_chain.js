const WordChainGame = {
    vocabulary: ['ELMA', 'ARMUT', 'TURUNCU', 'UÇAK', 'KALEM', 'MASA', 'ARABA', 'ASLAN', 'NAR', 'ROBOT', 'TRAKTÖR', 'RADYO', 'OYUN', 'NUMARA', 'ANNE', 'ELBİSE', 'ESKİ', 'IŞIK', 'KAPI', 'İNCİ'],
    history: [],
    currentPlayer: 'Sen', // Sen vs CPU
    isGameOver: false,

    init(container) {
        this.history = [];
        this.currentPlayer = 'Sen';
        this.isGameOver = false;
        this.render(container);
    },

    submitWord(word, container) {
        if (this.isGameOver) return;
        const cleanWord = word.trim().toUpperCase();

        if (!cleanWord) return;

        // Check rules
        if (this.history.length > 0) {
            const lastWord = this.history[this.history.length - 1].word;
            const lastChar = lastWord[lastWord.length - 1];
            if (cleanWord[0] !== lastChar) {
                this.render(container, `Hata! Kelime "${lastChar}" harfi ile başlamalı.`);
                return;
            }
        }

        if (this.history.some(h => h.word === cleanWord)) {
            this.render(container, `Bu kelime daha önce kullanıldı!`);
            return;
        }

        this.history.push({ player: 'Sen', word: cleanWord });
        this.currentPlayer = 'CPU';
        this.render(container);

        setTimeout(() => this.cpuTurn(container), 1000);
    },

    cpuTurn(container) {
        if (this.isGameOver) return;
        const lastWord = this.history[this.history.length - 1].word;
        const lastChar = lastWord[lastWord.length - 1];

        const possibleWords = this.vocabulary.filter(w => w[0] === lastChar && !this.history.some(h => h.word === w));

        if (possibleWords.length === 0) {
            this.isGameOver = true;
            this.render(container, "Tebrikler! CPU kelime bulamadı, sen kazandın! 🎉");
            return;
        }

        const cpuWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
        this.history.push({ player: 'CPU', word: cpuWord });
        this.currentPlayer = 'Sen';
        this.render(container);
    },

    render(container, error = null) {
        container.innerHTML = `
            <div class="word-game">
                <div class="game-status">${this.isGameOver ? '' : (this.currentPlayer === 'Sen' ? 'Sıra Sende!' : 'CPU Düşünüyor...')}</div>
                
                <div class="word-history">
                    ${this.history.map(h => `
                        <div class="word-tag ${h.player}">
                            <span class="p-name">${h.player}:</span>
                            <span class="word">${h.word}</span>
                        </div>
                    `).join('')}
                    ${this.history.length === 0 ? '<p style="opacity:0.5; text-align:center">İlk kelimeyi yazarak başlat!</p>' : ''}
                </div>

                ${error ? `<div class="error-msg">${error}</div>` : ''}

                <div class="input-area">
                    <input type="text" id="word-input" placeholder="Kelime girin..." ${this.currentPlayer === 'CPU' || this.isGameOver ? 'disabled' : ''} 
                        onkeypress="if(event.key === 'Enter') WordChainGame.submitWord(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="WordChainGame.submitWord(document.getElementById('word-input').value, document.getElementById('game-container'))"
                        ${this.currentPlayer === 'CPU' || this.isGameOver ? 'disabled' : ''}>Gönder</button>
                </div>

                <button class="primary-btn outline" onclick="WordChainGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeniden Başlat
                </button>
            </div>
            <style>
                .word-game { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 400px; }
                .game-status { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .word-history { 
                    width: 100%; height: 200px; overflow-y: auto; 
                    background: rgba(255,255,255,0.05); border-radius: 12px;
                    padding: 1rem; display: flex; flex-direction: column; gap: 8px; margin-bottom: 1rem;
                    border: 1px solid var(--glass-border);
                }
                .word-tag { padding: 8px 12px; border-radius: 8px; font-size: 0.9rem; animation: slideUp 0.3s ease; }
                .word-tag.Sen { background: rgba(168, 85, 247, 0.1); border-left: 3px solid var(--primary); align-self: flex-start; }
                .word-tag.CPU { background: rgba(59, 130, 246, 0.1); border-right: 3px solid var(--secondary); align-self: flex-end; }
                .p-name { font-weight: 700; margin-right: 5px; opacity: 0.7; }
                .word { font-weight: 700; letter-spacing: 1px; }
                .input-area { display: flex; gap: 10px; width: 100%; }
                #word-input { flex: 1; padding: 12px; }
                .error-msg { color: var(--error); font-size: 0.85rem; margin-bottom: 1rem; font-weight: 600; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
                @keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            </style>
        `;
        if (this.currentPlayer === 'Sen' && !this.isGameOver) {
            document.getElementById('word-input').focus();
        }
    }
};

window.WordChainGame = WordChainGame;
