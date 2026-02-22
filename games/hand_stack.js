const HandStackGame = {
    hands: [],
    score: 0,
    isGameOver: false,
    timer: null,

    init(container) {
        this.hands = [];
        this.score = 0;
        this.isGameOver = false;
        this.render(container);
    },

    placeHand(container) {
        if (this.isGameOver) return;

        const lastHand = this.hands[this.hands.length - 1];
        const newHand = {
            id: Date.now(),
            side: Math.random() > 0.5 ? 'left' : 'right',
            offset: (Math.random() - 0.5) * 40 // Random rotation offset
        };

        this.hands.push(newHand);
        this.score++;

        if (this.hands.length > 5) {
            this.hands.shift(); // Keep only latest 5 for visual stack
        }

        this.render(container);

        // Randomly "fail" based on stack height if user isn't fast enough
        // (Just for gameplay mechanic feel)
        if (this.score > 20 && Math.random() > 0.95) {
            this.isGameOver = true;
            this.render(container, 'ELİN KAYDI! 🖐️');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="hand-stack-game">
                <div class="score-display">Puan: ${this.score}</div>
                <div class="game-info">${status || 'Elleri üst üste koy!'}</div>
                
                <div class="stack-area">
                    ${this.hands.map((h, i) => `
                        <div class="stack-hand" style="bottom: ${i * 30}px; transform: rotate(${h.offset}deg); z-index: ${i}">
                            <i class="fa-solid fa-hand"></i>
                        </div>
                    `).join('')}
                </div>

                <div class="controls">
                    <button class="primary-btn tap-btn" onclick="HandStackGame.placeHand(document.getElementById('game-container'))" ${this.isGameOver ? 'disabled' : ''}>
                        EL EKLE 🖐️
                    </button>
                </div>

                <button class="primary-btn outline" onclick="HandStackGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .hand-stack-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .score-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .stack-area { width: 100%; height: 250px; position: relative; margin-bottom: 2rem; overflow: hidden; }
                .stack-hand { 
                    position: absolute; left: 50%; transform-origin: center bottom;
                    font-size: 5rem; color: var(--primary); transition: 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-shadow: 0 -5px 15px rgba(0,0,0,0.5);
                    margin-left: -2.5rem;
                }
                .tap-btn { width: 120px; height: 120px; border-radius: 50%; font-weight: 900; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.HandStackGame = HandStackGame;
