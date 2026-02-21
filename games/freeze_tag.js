const FreezeTagGame = {
    players: [],
    timer: null,
    isGameOver: false,
    timeLeft: 30,

    init(container) {
        this.players = Array(8).fill(0).map((_, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            frozen: Math.random() > 0.5
        }));
        this.timeLeft = 30;
        this.isGameOver = false;
        this.render(container);
        this.startLoop(container);
    },

    startLoop(container) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;

            // Randomly freeze more players
            if (Math.random() > 0.7) {
                const unfrozen = this.players.filter(p => !p.frozen);
                if (unfrozen.length > 0) {
                    unfrozen[Math.floor(Math.random() * unfrozen.length)].frozen = true;
                }
            }

            if (this.timeLeft <= 0) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, 'SÜRE BİTTİ! ❄️');
            } else if (this.players.every(p => !p.frozen)) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, 'HERKES ÇÖZÜLDÜ! ☀️ KAZANDIN!');
            } else if (this.players.every(p => p.frozen)) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, 'HERKES DONDU! 🥶 KAYBETTİN!');
            } else {
                this.render(container);
            }
        }, 1000);
    },

    unfreeze(id, container) {
        if (this.isGameOver) return;
        const player = this.players.find(p => p.id === id);
        if (player) player.frozen = false;
        this.render(container);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="ft-game">
                <div class="stats">
                    <div class="stat-badge">Kalan: ${this.timeLeft}s</div>
                    <div class="stat-badge">Donan: ${this.players.filter(p => p.frozen).length} / 8</div>
                </div>
                
                <div class="tag-area">
                    ${this.players.map(p => `
                        <div class="p-icon ${p.frozen ? 'frozen' : ''}" 
                             style="left: ${p.x}%; top: ${p.y}%"
                             onclick="FreezeTagGame.unfreeze(${p.id}, document.getElementById('game-container'))">
                            <i class="fa-solid ${p.frozen ? 'fa-ice-cream' : 'fa-person'}"></i>
                        </div>
                    `).join('')}
                </div>

                <div class="game-info">${status || 'Donan arkadaşlarını çözmek için üzerlerine tıkla!'}</div>

                <button class="primary-btn outline" onclick="FreezeTagGame.init(document.getElementById('game-container'))" style="margin-top: 1.5rem;">Sıfırla</button>
            </div>
            <style>
                .ft-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .stats { display: flex; gap: 20px; margin-bottom: 1.5rem; }
                .stat-badge { background: rgba(59, 130, 246, 0.2); padding: 8px 20px; border-radius: 20px; font-weight: 800; border: 1px solid var(--secondary); }
                .tag-area { 
                    width: 100%; max-width: 400px; height: 300px; background: rgba(255,255,255,0.03); 
                    border: 2px solid var(--glass-border); border-radius: 20px; position: relative; overflow: hidden;
                }
                .p-icon { position: absolute; transform: translate(-50%, -50%); cursor: pointer; transition: 0.3s; font-size: 1.5rem; }
                .p-icon.frozen { color: #3b82f6; text-shadow: 0 0 10px #3b82f6; animation: shiver 0.2s infinite; }
                .p-icon:not(.frozen) { color: var(--primary); }
                .game-info { font-weight: 700; color: var(--secondary); margin-top: 1.5rem; min-height: 1.5rem; }
                @keyframes shiver { 0% { transform: translate(-50%, -50%) rotate(2deg); } 100% { transform: translate(-50%, -50%) rotate(-2deg); } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.FreezeTagGame = FreezeTagGame;
