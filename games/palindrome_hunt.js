const PalindromeGame = {
    isGameOver: false,
    score: 0,

    init(container) {
        this.score = 0;
        this.isGameOver = false;
        this.render(container);
    },

    check(value, container) {
        const clean = value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!clean || clean.length < 3) {
            this.render(container, 'En az 3 harfli bir kelime girmelisin!');
            return;
        }

        const reversed = clean.split('').reverse().join('');
        if (clean === reversed) {
            this.score++;
            this.render(container, `DOĞRU! ✅ "${value}" bir palindromdur.`);
        } else {
            this.render(container, `MAALESEF! ❌ "${value}" palindrom değil.`);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="pal-game">
                <div class="score-display">Bulunan Palindrom: ${this.score}</div>
                <div class="game-info">${status || 'Tersten ve düzden aynı olan bir kelime yaz.'}</div>
                
                <div class="input-area">
                    <input type="text" id="pal-input" placeholder="Kelime gir... (örn: KAZAK)"
                        onkeypress="if(event.key === 'Enter') PalindromeGame.check(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="PalindromeGame.check(document.getElementById('pal-input').value, document.getElementById('game-container'))">KONTROL ET</button>
                </div>

                <div class="examples">
                    <span>Örnekler:</span> KÜÇÜK, KAZAK, NEDEN, ARA, YAY
                </div>

                <button class="primary-btn outline" onclick="PalindromeGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .pal-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .score-display { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                .game-info { font-weight: 700; margin-bottom: 2rem; min-height: 1.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; margin-bottom: 1.5rem; }
                #pal-input { flex: 1; padding: 12px; font-size: 1.1rem; }
                .examples { font-size: 0.8rem; opacity: 0.4; }
                .examples span { font-weight: 800; color: var(--primary); }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        document.getElementById('pal-input').focus();
    }
};

window.PalindromeGame = PalindromeGame;
