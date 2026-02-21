const HangmanGame = {
    words: ['YAZILIM', 'DEVELOPER', 'BILGISAYAR', 'INTERNET', 'TEKNOLOJI', 'OYUN', 'KODLAMA', 'ALGORITMA', 'PROJE', 'TASARIM'],
    currentWord: '',
    guessedLetters: [],
    mistakes: 0,
    maxMistakes: 6,

    init(container) {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.guessedLetters = [];
        this.mistakes = 0;
        this.render(container);
    },

    guess(letter, container) {
        if (this.guessedLetters.includes(letter) || this.mistakes >= this.maxMistakes || this.isWin()) return;

        this.guessedLetters.push(letter);
        if (!this.currentWord.includes(letter)) {
            this.mistakes++;
        }

        if (this.mistakes >= this.maxMistakes) {
            this.render(container, `Kaybettiniz! Kelime: ${this.currentWord}`);
        } else if (this.isWin()) {
            this.render(container, `Tebrikler, Kazandınız! 🎉`);
        } else {
            this.render(container);
        }
    },

    isWin() {
        return [...this.currentWord].every(l => this.guessedLetters.includes(l));
    },

    render(container, status = null) {
        const alphabet = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ'.split('');

        container.innerHTML = `
            <div class="hangman-game">
                <div class="hangman-visual">
                    <svg width="200" height="200" viewBox="0 0 200 200" class="hangman-svg">
                        <!-- Scaffold -->
                        <line x1="20" y1="180" x2="180" y2="180" stroke="white" stroke-width="4" />
                        <line x1="50" y1="180" x2="50" y2="20" stroke="white" stroke-width="4" />
                        <line x1="50" y1="20" x2="130" y2="20" stroke="white" stroke-width="4" />
                        <line x1="130" y1="20" x2="130" y2="50" stroke="white" stroke-width="4" />
                        
                        <!-- Body parts (conditional) -->
                        ${this.mistakes >= 1 ? '<circle cx="130" cy="70" r="20" stroke="white" stroke-width="3" fill="none" />' : ''}
                        ${this.mistakes >= 2 ? '<line x1="130" y1="90" x2="130" y2="140" stroke="white" stroke-width="3" />' : ''}
                        ${this.mistakes >= 3 ? '<line x1="130" y1="100" x2="100" y2="120" stroke="white" stroke-width="3" />' : ''}
                        ${this.mistakes >= 4 ? '<line x1="130" y1="100" x2="160" y2="120" stroke="white" stroke-width="3" />' : ''}
                        ${this.mistakes >= 5 ? '<line x1="130" y1="140" x2="110" y2="170" stroke="white" stroke-width="3" />' : ''}
                        ${this.mistakes >= 6 ? '<line x1="130" y1="140" x2="150" y2="170" stroke="white" stroke-width="3" />' : ''}
                    </svg>
                </div>

                <div class="hangman-word">
                    ${[...this.currentWord].map(l => `
                        <span class="letter-box ${this.guessedLetters.includes(l) ? 'revealed' : ''}">
                            ${this.guessedLetters.includes(l) ? l : ''}
                        </span>
                    `).join('')}
                </div>

                <div class="hangman-keyboard">
                    ${alphabet.map(l => `
                        <button class="key ${this.guessedLetters.includes(l) ? 'used' : ''} ${this.currentWord.includes(l) && this.guessedLetters.includes(l) ? 'correct' : ''}" 
                            onclick="HangmanGame.guess('${l}', document.getElementById('game-container'))"
                            ${this.guessedLetters.includes(l) || status ? 'disabled' : ''}>
                            ${l}
                        </button>
                    `).join('')}
                </div>

                ${status ? `<div class="game-status">${status}</div>` : ''}
                <button class="primary-btn" onclick="HangmanGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeni Kelime
                </button>
            </div>
            <style>
                .hangman-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .hangman-svg { margin-bottom: 2rem; filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.3)); }
                .hangman-word { display: flex; gap: 10px; margin-bottom: 2rem; }
                .letter-box { 
                    width: 35px; height: 45px; border-bottom: 3px solid var(--primary); 
                    display: flex; align-items: center; justify-content: center; 
                    font-size: 1.8rem; font-weight: 800; color: white;
                }
                .letter-box.revealed { border-bottom-color: var(--success); text-shadow: 0 0 10px var(--success); }
                .hangman-keyboard { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; max-width: 500px; }
                .key { 
                    width: 35px; height: 35px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.05);
                    border-radius: 8px; color: white; cursor: pointer; font-weight: 700; transition: 0.2s;
                }
                .key:hover:not(:disabled) { background: var(--primary); border-color: var(--primary); box-shadow: 0 4px 12px var(--primary-glow); }
                .key.used { opacity: 0.3; cursor: default; }
                .key.correct { border-color: var(--success); color: var(--success); opacity: 1; }
                .game-status { margin-top: 1.5rem; font-size: 1.2rem; font-weight: 800; color: var(--primary); text-align: center; }
            </style>
        `;
    }
};

window.HangmanGame = HangmanGame;
