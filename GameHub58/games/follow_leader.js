const FollowLeaderGame = {
    moves: ['hop', 'spin', 'wave', 'bow'],
    sequence: [],
    playerPos: 0,
    isGameOver: false,
    isPlaying: false,

    init(container) {
        this.sequence = [];
        this.isGameOver = false;
        this.nextLevel(container);
    },

    nextLevel(container) {
        this.playerPos = 0;
        this.sequence.push(this.moves[Math.floor(Math.random() * this.moves.length)]);
        this.render(container);
        setTimeout(() => this.playSequence(container), 800);
    },

    async playSequence(container) {
        this.isPlaying = true;
        for (const move of this.sequence) {
            this.render(container, move);
            await new Promise(r => setTimeout(r, 600));
            this.render(container);
            await new Promise(r => setTimeout(r, 200));
        }
        this.isPlaying = false;
        this.render(container);
    },

    input(move, container) {
        if (this.isPlaying || this.isGameOver) return;

        if (move === this.sequence[this.playerPos]) {
            this.playerPos++;
            if (this.playerPos === this.sequence.length) {
                this.render(container, 'Mükemmel Takip! 👍');
                setTimeout(() => this.nextLevel(container), 1000);
            }
        } else {
            this.isGameOver = true;
            this.render(container, 'Sırayı Şaşırdın! ❌');
        }
    },

    render(container, activeMove = null) {
        const moveIcons = { hop: 'fa-arrow-up', spin: 'fa-rotate', wave: 'fa-hand-wave', bow: 'fa-person-falling' };
        container.innerHTML = `
            <div class="leader-game">
                <div class="leader-visual">
                    <div class="leader-icon ${activeMove ? 'active ' + activeMove : ''}">
                        <i class="fa-solid ${activeMove ? moveIcons[activeMove] : 'fa-user-tie'}"></i>
                    </div>
                </div>

                <div class="game-info">Puan: ${this.sequence.length}</div>
                
                <div class="controls">
                    ${this.moves.map(m => `
                        <button class="primary-btn ${this.isPlaying ? 'disabled' : ''}" onclick="FollowLeaderGame.input('${m}', document.getElementById('game-container'))">
                            <i class="fa-solid ${moveIcons[m]}"></i>
                        </button>
                    `).join('')}
                </div>

                <button class="primary-btn outline" onclick="FollowLeaderGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .leader-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .leader-visual { height: 150px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; }
                .leader-icon { font-size: 4rem; color: var(--primary); transition: 0.3s; }
                .leader-icon.active { transform: scale(1.3); color: white; text-shadow: 0 0 20px var(--primary-glow); }
                .leader-icon.hop { transform: translateY(-30px) scale(1.2); }
                .leader-icon.spin { transform: rotate(360deg); }
                .game-info { font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; }
                .controls { display: flex; gap: 10px; }
                .disabled { opacity: 0.3; pointer-events: none; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.FollowLeaderGame = FollowLeaderGame;
