const ForbiddenWordGame = {
    wordPairs: [
        { target: 'ELMA', forbidden: ['MEYVE', 'KIRMIZI', 'AĞAÇ', 'YEŞİL', 'AMASYA'] },
        { target: 'GÜNEŞ', forbidden: ['SICAK', 'YILDIZ', 'GÜNDÜZ', 'SARI', 'GÖKYÜZÜ'] },
        { target: 'KİTAP', forbidden: ['OKUMAK', 'SAYFA', 'KÜTÜPHANE', 'YAZAR', 'KAĞIT'] },
        { id: 'TELEFON', target: 'TELEFON', forbidden: ['KONUŞMAK', 'ARAMAK', 'EKRAN', 'AKILLI', 'MESAJ'] }
    ],
    currentPair: null,
    isGameOver: false,

    init(container) {
        this.currentPair = this.wordPairs[Math.floor(Math.random() * this.wordPairs.length)];
        this.isGameOver = false;
        this.render(container);
    },

    check(value, container) {
        const guess = value.trim().toUpperCase();
        if (this.currentPair.forbidden.includes(guess)) {
            this.isGameOver = true;
            this.render(container, `YASAKLI KELİME SÖYLEDİN! 🚫 (${guess})`);
        } else if (guess === this.currentPair.target) {
            this.render(container, 'Hedef kelimeyi yazamasın! Onu anlatman lazım. 😉');
        } else {
            this.render(container, 'Anlatmaya devam et... (Sanal arkadaşın düşünüyor 🤔)');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="forbidden-game">
                <div class="target-card">
                    <label>HEDEF KELİME</label>
                    <div class="word">${this.currentPair.target}</div>
                </div>

                <div class="forbidden-list">
                    <label>YASAKLI KELİMELER</label>
                    <ul>
                        ${this.currentPair.forbidden.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>

                <div class="game-info">${status || 'Arkadaşına bu kelimeyi anlatıyormuş gibi yaz!'}</div>
                
                <div class="input-area">
                    <input type="text" id="forbidden-input" placeholder="Anlat..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') ForbiddenWordGame.check(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="ForbiddenWordGame.check(document.getElementById('forbidden-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>KONTROL</button>
                </div>

                <button class="primary-btn outline" onclick="ForbiddenWordGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Kelime</button>
            </div>
            <style>
                .forbidden-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .target-card { 
                    background: rgba(168, 85, 247, 0.1); border: 2px solid var(--primary); padding: 1.5rem; 
                    border-radius: 20px; width: 100%; max-width: 300px; margin-bottom: 2rem;
                }
                .target-card label { font-size: 0.7rem; font-weight: 800; opacity: 0.6; }
                .target-card .word { font-size: 2.5rem; font-weight: 900; color: white; letter-spacing: 2px; }
                .forbidden-list { width: 100%; max-width: 300px; margin-bottom: 2rem; }
                .forbidden-list label { color: #ef4444; font-weight: 800; font-size: 0.8rem; margin-bottom: 10px; display: block; }
                .forbidden-list ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
                .forbidden-list li { background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; padding: 5px 12px; border-radius: 20px; font-size: 0.9rem; font-weight: 700; color: #ef4444; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 1.5rem; min-height: 1.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #forbidden-input { flex: 1; padding: 12px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('forbidden-input').focus();
    }
};

window.ForbiddenWordGame = ForbiddenWordGame;
