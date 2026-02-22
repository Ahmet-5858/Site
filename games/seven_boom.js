const SevenBoomGame = {
    currentNum: 1,
    isGameOver: false,

    init(container) {
        this.currentNum = 1;
        this.isGameOver = false;
        this.render(container);
    },

    play(value, container) {
        if (this.isGameOver) return;

        const isBoomTarget = (this.currentNum % 7 === 0 || this.currentNum.toString().includes('7'));
        const userSaidBoom = value.toUpperCase() === 'BOOM';
        const userSaidNum = parseInt(value) === this.currentNum;

        if ((isBoomTarget && userSaidBoom) || (!isBoomTarget && userSaidNum)) {
            this.currentNum++;
            this.render(container, 'DOĞRU! ✅ Sıradaki sayıyı veya "BOOM" yaz.');

            // CPU auto-turn
            setTimeout(() => {
                const cpuBoom = (this.currentNum % 7 === 0 || this.currentNum.toString().includes('7'));
                this.currentNum++;
                this.render(container, `CPU: ${cpuBoom ? 'BOOM 💥' : this.currentNum - 1}`);
            }, 1000);
        } else {
            this.isGameOver = true;
            this.render(container, `HATALI! 💀<br>Cevap ${isBoomTarget ? 'BOOM' : this.currentNum} olmalıydı.`);
        }
    },

    render(container, status = '7 ve katlarında veya içinde 7 geçen sayılarda "BOOM" de!') {
        container.innerHTML = `
            <div class="boom-game">
                <div class="game-status">${status}</div>
                <div class="num-display">${this.currentNum}</div>
                
                <div class="input-area">
                    <input type="text" id="boom-input" placeholder="Sayı veya BOOM..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') SevenBoomGame.play(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="SevenBoomGame.play(document.getElementById('boom-input').value, document.getElementById('game-container'))"
                        ${this.isGameOver ? 'disabled' : ''}>Gönder</button>
                </div>

                <button class="primary-btn outline" onclick="SevenBoomGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .boom-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-status { font-weight: 800; color: var(--primary); margin-bottom: 2rem; min-height: 3rem; }
                .num-display { font-size: 4rem; font-weight: 900; color: white; text-shadow: 0 0 20px var(--primary-glow); margin-bottom: 2rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #boom-input { flex: 1; padding: 12px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('boom-input').focus();
    }
};

window.SevenBoomGame = SevenBoomGame;
