const TableTapperGame = {
    taps: 0,
    timeLeft: 10,
    isGameOver: false,
    timer: null,

    init(container) {
        this.taps = 0;
        this.timeLeft = 10;
        this.isGameOver = false;
        this.render(container);
    },

    tap(container) {
        if (this.isGameOver) return;

        if (this.taps === 0) {
            this.startTimer(container);
        }

        this.taps++;
        this.render(container);

        // Add a visual 'hit' effect
        const table = container.querySelector('.table-visual');
        table.classList.add('hit');
        setTimeout(() => table.classList.remove('hit'), 50);
    },

    startTimer(container) {
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, `SÜRE BİTTİ! 🛑 Toplam Vuruş: ${this.taps}`);
            } else {
                this.render(container);
            }
        }, 1000);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="tapper-game">
                <div class="stats">
                    <div class="stat-badge">Vuruş: ${this.taps}</div>
                    <div class="stat-badge ${this.timeLeft <= 3 ? 'urgent' : ''}">Süre: ${this.timeLeft}s</div>
                </div>

                <div class="game-info">${status || 'Masaya en hızlı sen vur! 10 saniyen var.'}</div>
                
                <div class="table-area">
                    <div class="table-visual" onclick="TableTapperGame.tap(document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-back-fist"></i>
                    </div>
                </div>

                <button class="primary-btn outline" onclick="TableTapperGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .tapper-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .stats { display: flex; gap: 20px; margin-bottom: 2rem; }
                .stat-badge { background: rgba(255,255,255,0.05); padding: 10px 25px; border-radius: 12px; border: 1px solid var(--glass-border); font-weight: 800; font-size: 1.2rem; }
                .stat-badge.urgent { color: #ef4444; border-color: #ef4444; animation: flash 0.5s infinite; }
                .game-info { font-weight: 700; color: var(--primary); min-height: 2.5rem; margin-bottom: 1rem; }
                .table-area { width: 100%; max-width: 400px; height: 200px; display: flex; align-items: center; justify-content: center; }
                .table-visual { 
                    width: 150px; height: 150px; background: rgba(168, 85, 247, 0.1); border: 2px solid var(--primary); 
                    border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;
                    font-size: 4rem; color: var(--primary); transition: 0.1s;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .table-visual.hit { transform: scale(0.9) translateY(10px); background: var(--primary); color: white; box-shadow: 0 0 30px var(--primary-glow); }
                @keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.TableTapperGame = TableTapperGame;
