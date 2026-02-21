const ChineseWhispersGame = {
    phrases: [
        'Hızlı koşan atın yolu kısa olur.',
        'Ak akçe kara gün içindir.',
        'Gülme komşuna gelir başına.',
        'Damlaya damlaya göl olur.'
    ],
    currentPhrase: '',
    step: 0,
    isGameOver: false,

    init(container) {
        this.currentPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        this.step = 0;
        this.isGameOver = false;
        this.render(container);
    },

    next(container) {
        this.step++;
        if (this.step >= 5) {
            this.isGameOver = true;
            this.render(container, 'Oyun Bitti! Bakalım cümle ne hale geldi?');
        } else {
            this.render(container);
        }
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="whisper-game">
                <div class="game-info">${status || 'Kulaktan kulağa cümleyi fısılda!'}</div>
                
                <div class="phrase-box">
                    ${this.step === 0 ? `
                        <p class="label">İLK CÜMLE</p>
                        <p class="phrase">"${this.currentPhrase}"</p>
                    ` : `
                        <div class="whisper-visual">
                            <i class="fa-solid fa-comment-dots"></i>
                            <p>${this.step}. kişi fısıldıyor...</p>
                        </div>
                    `}
                </div>

                <div class="progress">
                    <div class="line"></div>
                    ${Array(6).fill(0).map((_, i) => `
                        <div class="step-dot ${i <= this.step ? 'active' : ''}"></div>
                    `).join('')}
                </div>

                <div class="controls">
                    ${!this.isGameOver ? `
                        <button class="primary-btn" onclick="ChineseWhispersGame.next(document.getElementById('game-container'))">
                            ${this.step === 0 ? 'Fısıltıyı Başlat' : 'Sıradaki Kişi'}
                        </button>
                    ` : `
                        <div class="final-reveal">
                            <p class="label">SONUÇ</p>
                            <p class="phrase">"${this.currentPhrase}"</p>
                            <small>(Cümle bozuldu mu yoksa aynı mı kaldı?)</small>
                        </div>
                    `}
                </div>

                <button class="primary-btn outline" onclick="ChineseWhispersGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .whisper-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .phrase-box { 
                    background: rgba(255,255,255,0.05); border: 2px solid var(--glass-border); padding: 2rem;
                    border-radius: 20px; width: 100%; max-width: 400px; margin-bottom: 2rem;
                }
                .phrase-box .label { font-size: 0.7rem; font-weight: 800; opacity: 0.5; margin-bottom: 10px; }
                .phrase-box .phrase { font-size: 1.5rem; font-weight: 700; color: var(--primary); }
                .whisper-visual { font-size: 3rem; color: var(--primary); opacity: 0.8; }
                .whisper-visual p { font-size: 1rem; margin-top: 10px; }
                .progress { display: flex; align-items: center; gap: 15px; margin-bottom: 2rem; position: relative; }
                .progress .line { position: absolute; top: 50%; left: 0; right: 0; height: 2px; background: rgba(255,255,255,0.1); z-index: 1; }
                .step-dot { width: 12px; height: 12px; border-radius: 50%; background: #333; z-index: 2; transition: 0.3s; }
                .step-dot.active { background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
                .final-reveal { margin-top: 1rem; }
                .final-reveal small { opacity: 0.5; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.ChineseWhispersGame = ChineseWhispersGame;
