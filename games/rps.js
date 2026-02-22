const RockPaperScissorsGame = {
    choices: [
        { name: 'Taş', icon: 'fa-solid fa-hand-back-fist' },
        { id: 'Kağıt', name: 'Kağıt', icon: 'fa-solid fa-hand' },
        { id: 'Makas', name: 'Makas', icon: 'fa-solid fa-hand-scissors' }
    ],
    userScore: 0,
    cpuScore: 0,

    init(container) {
        this.userScore = 0;
        this.cpuScore = 0;
        this.render(container);
    },

    play(userChoice, container) {
        const cpuChoice = ['Taş', 'Kağıt', 'Makas'][Math.floor(Math.random() * 3)];
        let result = '';

        if (userChoice === cpuChoice) {
            result = 'Berabere!';
        } else if (
            (userChoice === 'Taş' && cpuChoice === 'Makas') ||
            (userChoice === 'Kağıt' && cpuChoice === 'Taş') ||
            (userChoice === 'Makas' && cpuChoice === 'Kağıt')
        ) {
            this.userScore++;
            result = 'Kazandın! 🎉';
        } else {
            this.cpuScore++;
            result = 'Kaybettin! 🤖';
        }

        this.render(container, { userChoice, cpuChoice, result });
    },

    render(container, lastResult = null) {
        container.innerHTML = `
            <div class="rps-game">
                <div class="rps-header">
                    <div class="score-card">Sen: ${this.userScore}</div>
                    <div class="score-card">CPU: ${this.cpuScore}</div>
                </div>

                ${lastResult ? `
                    <div class="rps-result-visual">
                        <div class="choice-visual user">
                            <i class="${this.getIcon(lastResult.userChoice)}"></i>
                            <span>Sen</span>
                        </div>
                        <div class="vs">VS</div>
                        <div class="choice-visual cpu">
                            <i class="${this.getIcon(lastResult.cpuChoice)}"></i>
                            <span>CPU</span>
                        </div>
                    </div>
                    <div class="game-status">${lastResult.result}</div>
                ` : '<div class="game-status">Bir hamle seç!</div>'}

                <div class="rps-choices">
                    <button class="choice-btn" onclick="RockPaperScissorsGame.play('Taş', document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-back-fist"></i>
                        <span>Taş</span>
                    </button>
                    <button class="choice-btn" onclick="RockPaperScissorsGame.play('Kağıt', document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand"></i>
                        <span>Kağıt</span>
                    </button>
                    <button class="choice-btn" onclick="RockPaperScissorsGame.play('Makas', document.getElementById('game-container'))">
                        <i class="fa-solid fa-hand-scissors"></i>
                        <span>Makas</span>
                    </button>
                </div>

                <button class="primary-btn" onclick="RockPaperScissorsGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:2rem; padding: 10px 20px;">
                    Skoru Sıfırla
                </button>
            </div>
            <style>
                .rps-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .rps-header { display: flex; gap: 2rem; margin-bottom: 2rem; }
                .score-card { font-size: 1.2rem; font-weight: 700; color: var(--primary); }
                .rps-result-visual { display: flex; align-items: center; gap: 2rem; margin-bottom: 1.5rem; animation: bounceIn 0.5s ease; }
                .choice-visual { display: flex; flex-direction: column; align-items: center; gap: 10px; }
                .choice-visual i { font-size: 3rem; color: var(--secondary); text-shadow: 0 0 15px var(--secondary); }
                .choice-visual.user i { color: var(--primary); text-shadow: 0 0 15px var(--primary); }
                .vs { font-size: 1.5rem; font-weight: 800; opacity: 0.5; }
                .rps-choices { display: flex; gap: 1.5rem; margin-top: 1rem; }
                .choice-btn { 
                    display: flex; flex-direction: column; align-items: center; gap: 10px;
                    background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
                    padding: 1.5rem; border-radius: 16px; cursor: pointer; transition: 0.3s; color: white; min-width: 100px;
                }
                .choice-btn:hover { background: rgba(255,255,255,0.1); border-color: var(--primary); transform: translateY(-5px); }
                .choice-btn i { font-size: 2rem; }
                .game-status { font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 1rem; }
                @keyframes bounceIn {
                    0% { transform: scale(0.3); opacity: 0; }
                    50% { transform: scale(1.05); }
                    70% { transform: scale(0.9); }
                    100% { transform: scale(1); opacity: 1; }
                }
            </style>
        `;
    },

    getIcon(choice) {
        if (choice === 'Taş') return 'fa-solid fa-hand-back-fist';
        if (choice === 'Kağıt') return 'fa-solid fa-hand';
        return 'fa-solid fa-hand-scissors';
    }
};

window.RockPaperScissorsGame = RockPaperScissorsGame;
