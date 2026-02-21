const CoinFlipGuessGame = {
    score: 0,
    isSpinning: false,

    init(container) {
        this.score = 0;
        this.isSpinning = false;
        this.render(container);
    },

    flip(guess, container) {
        if (this.isSpinning) return;
        this.isSpinning = true;
        this.render(container, 'Para Dönüyor...');

        setTimeout(() => {
            const result = Math.random() > 0.5 ? 'Yazı' : 'Tura';
            const win = guess === result;
            if (win) this.score++;
            this.isSpinning = false;
            this.render(container, `${result}! ${win ? 'DOĞRU! ✅' : 'YANLIŞ! ❌'}`);
        }, 1200);
    },

    render(container, status = 'Yazı mı? Tura mı?') {
        container.innerHTML = `
            <div class="coin-game">
                <div class="score-badge">Puan: ${this.score}</div>
                
                <div class="coin-visual ${this.isSpinning ? 'spinning' : ''}">
                    <div class="coin-face front">Y</div>
                    <div class="coin-face back">T</div>
                </div>

                <div class="game-status">${status}</div>

                <div class="controls">
                    <button class="primary-btn" onclick="CoinFlipGuessGame.flip('Yazı', document.getElementById('game-container'))" ${this.isSpinning ? 'disabled' : ''}>Yazı</button>
                    <button class="primary-btn blue" onclick="CoinFlipGuessGame.flip('Tura', document.getElementById('game-container'))" ${this.isSpinning ? 'disabled' : ''}>Tura</button>
                </div>

                <button class="primary-btn outline" onclick="CoinFlipGuessGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .coin-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .score-badge { font-weight: 800; color: var(--primary); margin-bottom: 2rem; }
                .coin-visual { 
                    width: 100px; height: 100px; position: relative; 
                    transform-style: preserve-3d; transition: 1s cubic-bezier(0.4, 0, 0.2, 1);
                    margin-bottom: 2rem;
                }
                .coin-visual.spinning { animation: coinSpin 0.2s infinite linear; }
                .coin-face { 
                    position: absolute; width: 100%; height: 100%; border-radius: 50%;
                    backface-visibility: hidden; display: flex; align-items: center; justify-content: center;
                    font-size: 2.5rem; font-weight: 900; color: white; border: 4px solid var(--primary);
                    background: linear-gradient(45deg, #a855f7, #3b82f6); box-shadow: 0 0 20px var(--primary-glow);
                }
                .coin-face.back { transform: rotateY(180deg); border-color: var(--secondary); }
                .game-status { font-size: 1.5rem; font-weight: 800; min-height: 2.5rem; margin-bottom: 1.5rem; }
                .controls { display: flex; gap: 15px; }
                .blue { background: var(--secondary); }
                @keyframes coinSpin { from { transform: rotateY(0); } to { transform: rotateY(360deg); } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.CoinFlipGuessGame = CoinFlipGuessGame;
