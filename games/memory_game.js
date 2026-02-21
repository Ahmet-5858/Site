const MemoryGame = {
    icons: [
        'fa-solid fa-ghost', 'fa-solid fa-ghost',
        'fa-solid fa-bolt', 'fa-solid fa-bolt',
        'fa-solid fa-bomb', 'fa-solid fa-bomb',
        'fa-solid fa-heart', 'fa-solid fa-heart',
        'fa-solid fa-star', 'fa-solid fa-star',
        'fa-solid fa-moon', 'fa-solid fa-moon',
        'fa-solid fa-sun', 'fa-solid fa-sun',
        'fa-solid fa-cloud', 'fa-solid fa-cloud'
    ],
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    isLock: false,

    init(container) {
        this.cards = [...this.icons].sort(() => Math.random() - 0.5).map((icon, id) => ({
            id, icon, flipped: false, matched: false
        }));
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isLock = false;
        this.render(container);
    },

    flipCard(index, container) {
        if (this.isLock || this.cards[index].flipped || this.cards[index].matched) return;

        this.cards[index].flipped = true;
        this.flippedCards.push(index);
        this.render(container);

        if (this.flippedCards.length === 2) {
            this.checkMatch(container);
        }
    },

    checkMatch(container) {
        this.isLock = true;
        const [idx1, idx2] = this.flippedCards;
        const card1 = this.cards[idx1];
        const card2 = this.cards[idx2];

        if (card1.icon === card2.icon) {
            card1.matched = true;
            card2.matched = true;
            this.matchedPairs++;
            this.flippedCards = [];
            this.isLock = false;

            if (this.matchedPairs === this.icons.length / 2) {
                this.render(container, 'TEBRİKLER! Hepsini buldun! 🎉');
            } else {
                this.render(container);
            }
        } else {
            setTimeout(() => {
                card1.flipped = false;
                card2.flipped = false;
                this.flippedCards = [];
                this.isLock = false;
                this.render(container);
            }, 1000);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="memory-game">
                <div class="memory-grid">
                    ${this.cards.map((card, i) => `
                        <div class="card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}" 
                            onclick="MemoryGame.flipCard(${i}, document.getElementById('game-container'))">
                            <div class="card-front"><i class="fa-solid fa-question"></i></div>
                            <div class="card-back"><i class="${card.icon}"></i></div>
                        </div>
                    `).join('')}
                </div>
                ${status ? `<div class="game-status">${status}</div>` : ''}
                <button class="primary-btn outline" onclick="MemoryGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeniden Başlat</button>
            </div>
            <style>
                .memory-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .memory-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; perspective: 1000px; }
                .card { width: 70px; height: 90px; position: relative; transform-style: preserve-3d; transition: 0.6s transform; cursor: pointer; }
                .card.flipped { transform: rotateY(180deg); }
                .card.matched { opacity: 0.6; cursor: default; }
                .card-front, .card-back { 
                    position: absolute; width: 100%; height: 100%; backface-visibility: hidden; 
                    border-radius: 8px; border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;
                }
                .card-front { background: rgba(255,255,255,0.05); color: var(--primary); }
                .card-back { background: var(--primary); color: white; transform: rotateY(180deg); box-shadow: 0 0 15px var(--primary-glow); }
                .game-status { font-size: 1.4rem; font-weight: 800; color: var(--primary); margin-top: 1.5rem; text-align: center; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.MemoryGame = MemoryGame;
