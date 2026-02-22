const TwentyQuestionsGame = {
    categories: [
        { name: 'Hayvan', items: ['Aslan', 'Zürafa', 'Köpek', 'Kedi', 'Fil', 'Kartal', 'Balık', 'Yılan'] },
        { name: 'Eşya', items: ['Masa', 'Kalem', 'Telefon', 'Bilgisayar', 'Gözlük', 'Saat', 'Cüzdan', 'Şemsiye'] },
        { name: 'Meyve', items: ['Elma', 'Muz', 'Çilek', 'Karpuz', 'Erik', 'Kiraz', 'Üzüm', 'Şeftali'] }
    ],
    targetItem: '',
    questionsLeft: 20,
    isGameOver: false,

    init(container) {
        const cat = this.categories[Math.floor(Math.random() * this.categories.length)];
        this.targetItem = cat.items[Math.floor(Math.random() * cat.items.length)];
        this.questionsLeft = 20;
        this.isGameOver = false;
        this.render(container, `Bir ${cat.name} tuttum. Tahmin et bakalım!`);
    },

    guess(value, container) {
        if (this.isGameOver) return;
        const cleanGuess = value.trim().toUpperCase();
        if (!cleanGuess) return;

        this.questionsLeft--;

        if (cleanGuess === this.targetItem.toUpperCase()) {
            this.isGameOver = true;
            this.render(container, `TEBRİKLER! 🎉 Doğru cevap: ${this.targetItem}`);
        } else if (this.questionsLeft <= 0) {
            this.isGameOver = true;
            this.render(container, `Kaybettin! 💀 Hakkın bitti. Cevap: ${this.targetItem}`);
        } else {
            this.render(container, `Yanlış! ${this.questionsLeft} hakkın kaldı.`);
        }
    },

    render(container, status = '') {
        container.innerHTML = `
            <div class="q20-game">
                <div class="game-status">${status}</div>
                <div class="q-badge">${this.questionsLeft} Soru Hakkın Var</div>
                <div class="input-area" style="margin-top: 2rem;">
                    <input type="text" id="q-input" placeholder="Tahminini yaz..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') TwentyQuestionsGame.guess(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="TwentyQuestionsGame.guess(document.getElementById('q-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>Tahmin Et</button>
                </div>
                <button class="primary-btn outline" onclick="TwentyQuestionsGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:2rem; padding: 10px 20px;">
                    Yeni Oyun
                </button>
            </div>
            <style>
                .q20-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-status { font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; min-height: 4rem; }
                .q-badge { background: rgba(168, 85, 247, 0.2); color: var(--primary); padding: 8px 20px; border-radius: 20px; font-weight: 700; border: 1px solid var(--primary); }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #q-input { flex: 1; padding: 12px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.TwentyQuestionsGame = TwentyQuestionsGame;
