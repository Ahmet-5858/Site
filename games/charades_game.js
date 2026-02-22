const CharadesGame = {
    words: ['ARABA SÜRMEK', 'FUTBOL OYNAMAK', 'GİTAR ÇALMAK', 'BALIK TUTMAK', 'YEMEK YAPMAK', 'UÇAK UÇURMAK'],
    currentWord: '',
    timeLeft: 60,
    isGameOver: false,
    timer: null,

    init(container) {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.timeLeft = 60;
        this.isGameOver = false;
        this.render(container);
    },

    start(container) {
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                this.isGameOver = true;
                clearInterval(this.timer);
                this.render(container, 'Süre doldu! ⌛');
            } else {
                this.render(container);
            }
        }, 1000);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="charades-game">
                <div class="timer-badge ${this.timeLeft <= 10 ? 'low' : ''}">Süre: ${this.timeLeft}s</div>
                
                <div class="word-card">
                    <label>ANLATILACAK KELİME</label>
                    <div class="word">${this.currentWord}</div>
                </div>

                <div class="game-info">${status || 'Bu kelimeyi sessizce anlat, arkadaşların tahmin etsin!'}</div>
                
                <div class="controls">
                    ${!this.timer && !this.isGameOver ? `
                        <button class="primary-btn pulse" onclick="CharadesGame.start(document.getElementById('game-container'))">SÜREYİ BAŞLAT</button>
                    ` : ''}
                </div>

                <button class="primary-btn outline" onclick="CharadesGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Yeni Kelime</button>
            </div>
            <style>
                .charades-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .timer-badge { background: rgba(255,255,255,0.05); padding: 5px 20px; border-radius: 20px; font-weight: 800; margin-bottom: 2rem; border: 1px solid var(--glass-border); }
                .timer-badge.low { color: #ef4444; border-color: #ef4444; animation: blink 0.5s infinite; }
                .word-card { 
                    background: rgba(168, 85, 247, 0.1); border: 2px solid var(--primary); padding: 2rem; 
                    border-radius: 20px; width: 100%; max-width: 400px; margin-bottom: 2rem;
                    box-shadow: 0 0 20px var(--primary-glow);
                }
                .word-card label { font-size: 0.8rem; font-weight: 800; opacity: 0.6; display: block; margin-bottom: 10px; }
                .word-card .word { font-size: 2rem; font-weight: 900; color: white; letter-spacing: 3px; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 1.5rem; min-height: 2.5rem; }
                .pulse { animation: pulse 2s infinite; }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.CharadesGame = CharadesGame;
