const ChopsticksGame = {
    hands: [1, 1, 1, 1], // [PlayerL, PlayerR, CPUL, CPUR]
    turn: 0, // 0: Player, 1: CPU
    selectedHand: null,
    isGameOver: false,

    init(container) {
        this.hands = [1, 1, 1, 1];
        this.turn = 0;
        this.selectedHand = null;
        this.isGameOver = false;
        this.render(container);
    },

    selectHand(index, container) {
        if (this.isGameOver || this.turn !== 0) return;
        if (index < 2 && this.hands[index] > 0) {
            this.selectedHand = index;
            this.render(container);
        } else if (index >= 2 && this.selectedHand !== null && this.hands[index] > 0) {
            this.attack(this.selectedHand, index, container);
        }
    },

    attack(from, to, container) {
        this.hands[to] = (this.hands[to] + this.hands[from]) % 5;
        this.selectedHand = null;
        this.checkGameOver(container);
        if (!this.isGameOver) {
            this.turn = 1;
            this.render(container);
            setTimeout(() => this.cpuTurn(container), 1000);
        }
    },

    cpuTurn(container) {
        if (this.isGameOver) return;
        const myHands = [2, 3].filter(i => this.hands[i] > 0);
        const targetHands = [0, 1].filter(i => this.hands[i] > 0);

        if (myHands.length && targetHands.length) {
            const from = myHands[Math.floor(Math.random() * myHands.length)];
            const to = targetHands[Math.floor(Math.random() * targetHands.length)];
            this.hands[to] = (this.hands[to] + this.hands[from]) % 5;
        }

        this.checkGameOver(container);
        this.turn = 0;
        this.render(container);
    },

    checkGameOver(container) {
        if (this.hands[0] === 0 && this.hands[1] === 0) {
            this.isGameOver = true;
            this.render(container, 'CPU KAZANDI! 💀');
        } else if (this.hands[2] === 0 && this.hands[3] === 0) {
            this.isGameOver = true;
            this.render(container, 'KAZANDIN! 🏆');
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="chopsticks-game">
                <div class="cpu-area">
                    <div class="hand ${this.hands[2] === 0 ? 'dead' : ''}" onclick="ChopsticksGame.selectHand(2, document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-pointer"></i>
                        <span>${this.hands[2]}</span>
                    </div>
                    <div class="hand ${this.hands[3] === 0 ? 'dead' : ''}" onclick="ChopsticksGame.selectHand(3, document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-pointer"></i>
                        <span>${this.hands[3]}</span>
                    </div>
                    <label>RAKİP (CPU)</label>
                </div>

                <div class="msg-area">${status || (this.turn === 0 ? 'Kendi elini seç ve rakibe vur!' : 'CPU Hamle Yapıyor...')}</div>

                <div class="player-area">
                    <label>SEN</label>
                    <div class="hand-row">
                        <div class="hand ${this.hands[0] === 0 ? 'dead' : ''} ${this.selectedHand === 0 ? 'selected' : ''}" 
                             onclick="ChopsticksGame.selectHand(0, document.getElementById('game-container'))">
                            <i class="fa-solid fa-hand-pointer"></i>
                            <span>${this.hands[0]}</span>
                        </div>
                        <div class="hand ${this.hands[1] === 0 ? 'dead' : ''} ${this.selectedHand === 1 ? 'selected' : ''}" 
                             onclick="ChopsticksGame.selectHand(1, document.getElementById('game-container'))">
                            <i class="fa-solid fa-hand-pointer"></i>
                            <span>${this.hands[1]}</span>
                        </div>
                    </div>
                </div>

                <button class="primary-btn outline" onclick="ChopsticksGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .chopsticks-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .cpu-area, .player-area { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 1rem; border-radius: 20px; background: rgba(255,255,255,0.02); }
                .hand-row, .cpu-area { display: flex; flex-direction: row; gap: 20px; }
                .cpu-area { flex-direction: row-reverse; }
                .hand { 
                    width: 70px; height: 90px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); 
                    border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center;
                    cursor: pointer; transition: 0.3s;
                }
                .hand i { font-size: 1.5rem; color: var(--primary); }
                .hand span { font-size: 1.5rem; font-weight: 900; margin-top: 5px; }
                .hand.selected { border-color: var(--primary); box-shadow: 0 0 15px var(--primary-glow); transform: scale(1.1); }
                .hand.dead { opacity: 0.2; cursor: default; }
                .msg-area { min-height: 2rem; margin: 1.5rem 0; font-weight: 700; color: var(--primary); }
                label { font-size: 0.7rem; font-weight: 900; opacity: 0.5; letter-spacing: 2px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.ChopsticksGame = ChopsticksGame;
