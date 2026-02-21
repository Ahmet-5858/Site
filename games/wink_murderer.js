const WinkMurdererGame = {
    players: [],
    murdererId: null,
    isGameOver: false,

    init(container) {
        this.players = Array(6).fill(0).map((_, i) => ({
            id: i,
            name: `Oyuncu ${i + 1}`,
            eliminated: false,
            role: 'civilian'
        }));
        this.murdererId = Math.floor(Math.random() * 6);
        this.players[this.murdererId].role = 'murderer';
        this.isGameOver = false;
        this.render(container);
    },

    guess(id, container) {
        if (this.isGameOver) return;

        if (id === this.murdererId) {
            this.isGameOver = true;
            this.render(container, 'KATİLİ BULDUN! 🕵️‍♂️ Harika dedektiflik!');
        } else {
            this.players[id].eliminated = true;
            // Simulated murderer action
            this.murderAction(container);
        }
    },

    murderAction(container) {
        const remaining = this.players.filter(p => !p.eliminated && p.role !== 'murderer');
        if (remaining.length === 0) {
            this.isGameOver = true;
            this.render(container, 'KATİL HERKESİ ELENDİRDİ! 🔪 KAYBETTİN.');
            return;
        }

        // Randomly eliminate one civilian
        const toEliminate = remaining[Math.floor(Math.random() * remaining.length)];
        toEliminate.eliminated = true;
        this.render(container, `Birisi göz kırptı ve ${toEliminate.name} elendi! 😱`);
    },

    render(container, status = 'Katil kim? Şüpheli birine tıkla!') {
        container.innerHTML = `
            <div class="wink-game">
                <div class="game-info">${status}</div>
                
                <div class="player-grid">
                    ${this.players.map(p => `
                        <div class="player-card ${p.eliminated ? 'dead' : ''}" onclick="WinkMurdererGame.guess(${p.id}, document.getElementById('game-container'))">
                            <i class="fa-solid ${p.eliminated ? 'fa-skull' : 'fa-user-secret'}"></i>
                            <p>${p.name}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="stats">Kalan Oyuncu: ${this.players.filter(p => !p.eliminated).length}</div>

                <button class="primary-btn outline" onclick="WinkMurdererGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .wink-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; max-width: 400px; }
                .player-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; width: 100%; }
                .player-card { 
                    background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 1rem; border-radius: 12px;
                    cursor: pointer; transition: 0.3s;
                }
                .player-card:hover:not(.dead) { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 0 15px var(--primary-glow); }
                .player-card.dead { opacity: 0.3; cursor: default; }
                .player-card i { font-size: 2rem; margin-bottom: 10px; color: var(--primary); }
                .player-card p { font-size: 0.8rem; font-weight: 700; }
                .stats { margin-top: 2rem; font-weight: 800; opacity: 0.5; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.WinkMurdererGame = WinkMurdererGame;
