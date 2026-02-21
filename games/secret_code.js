const SecretCodeGame = {
    code: '',
    attempts: [],
    maxAttempts: 8,
    isGameOver: false,

    init(container) {
        this.code = Array(4).fill(0).map(() => Math.floor(Math.random() * 6 + 1)).join('');
        this.attempts = [];
        this.isGameOver = false;
        this.render(container);
    },

    guess(container) {
        if (this.isGameOver) return;
        const input = document.getElementById('code-input').value;
        if (input.length !== 4) return;

        let exact = 0;
        let partial = 0;
        let codeArr = this.code.split('');
        let guessArr = input.split('');

        // Count exact matches
        for (let i = 0; i < 4; i++) {
            if (guessArr[i] === codeArr[i]) {
                exact++;
                codeArr[i] = guessArr[i] = null;
            }
        }

        // Count partial matches
        for (let i = 0; i < 4; i++) {
            if (guessArr[i] && codeArr.includes(guessArr[i])) {
                partial++;
                codeArr[codeArr.indexOf(guessArr[i])] = null;
            }
        }

        this.attempts.push({ guess: input, exact, partial });

        if (exact === 4) {
            this.isGameOver = true;
            this.render(container, 'KOD ÇÖZÜLDÜ! 🔓');
        } else if (this.attempts.length >= this.maxAttempts) {
            this.isGameOver = true;
            this.render(container, `HAKKIN BİTTİ! 🔒 Kod: ${this.code}`);
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="code-game">
                <div class="game-info">${status || '4 Haneli gizli kodu çöz! (1-6 arası rakamlar)'}</div>
                
                <div class="attempts-log">
                    ${this.attempts.map((a, i) => `
                        <div class="log-entry">
                            <span>#${i + 1}: ${a.guess}</span>
                            <div class="feedback">
                                <span class="exact">${'●'.repeat(a.exact)}</span>
                                <span class="partial">${'○'.repeat(a.partial)}</span>
                            </div>
                        </div>
                    `).reverse().join('')}
                </div>

                <div class="input-area" style="margin-top: 1.5rem;">
                    <input type="text" id="code-input" maxlength="4" placeholder="????" ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') SecretCodeGame.guess(document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="SecretCodeGame.guess(document.getElementById('game-container'))" ${this.isGameOver ? 'disabled' : ''}>DENE</button>
                </div>

                <button class="primary-btn outline" onclick="SecretCodeGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .code-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; min-height: 2.5rem; }
                .attempts-log { 
                    width: 100%; max-width: 300px; height: 200px; background: rgba(0,0,0,0.3); border-radius: 12px;
                    border: 1px solid var(--glass-border); overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 5px;
                }
                .log-entry { display: flex; justify-content: space-between; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px; }
                .log-entry span { font-family: monospace; font-weight: 700; letter-spacing: 2px; }
                .feedback { display: flex; gap: 3px; }
                .exact { color: #ef4444; }
                .partial { color: #fff; }
                #code-input { width: 100px; text-align: center; font-size: 1.5rem; letter-spacing: 5px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) document.getElementById('code-input').focus();
    }
};

window.SecretCodeGame = SecretCodeGame;
