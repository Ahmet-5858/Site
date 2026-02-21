const MashGame = {
    categories: {
        house: ['Malikane', 'Apartman', 'Saray', 'Hücre'],
        spouse: ['Ünlü Oyuncu', 'Çocukluk Aşkın', 'Zengin İş Adamı', 'Issız Adam'],
        kids: ['0', '2', '5', '12'],
        car: ['Lamborghini', 'Bisiklet', 'Tofaş', 'Uçan Araba']
    },
    results: {},
    isGameOver: false,

    init(container) {
        this.results = {};
        this.isGameOver = false;
        this.render(container);
    },

    play(container) {
        for (let cat in this.categories) {
            const list = this.categories[cat];
            this.results[cat] = list[Math.floor(Math.random() * list.length)];
        }
        this.isGameOver = true;
        this.render(container);
    },

    render(container) {
        container.innerHTML = `
            <div class="mash-game">
                <h2 class="mash-title">Gelecek Tahmini (MASH)</h2>
                
                <div class="mash-grid">
                    <div class="mash-cardhouse ${this.isGameOver ? 'revealed' : ''}">
                        <label>EVİN</label>
                        <p>${this.results.house || '?'}</p>
                    </div>
                    <div class="mash-card spouse ${this.isGameOver ? 'revealed' : ''}">
                        <label>EŞİN</label>
                        <p>${this.results.spouse || '?'}</p>
                    </div>
                    <div class="mash-card kids ${this.isGameOver ? 'revealed' : ''}">
                        <label>ÇOCUK SAYISI</label>
                        <p>${this.results.kids || '?'}</p>
                    </div>
                    <div class="mash-card car ${this.isGameOver ? 'revealed' : ''}">
                        <label>ARABAN</label>
                        <p>${this.results.car || '?'}</p>
                    </div>
                </div>

                <div class="mash-controls">
                    ${!this.isGameOver ? `
                        <button class="primary-btn pulse" onclick="MashGame.play(document.getElementById('game-container'))">Kaderini Gör ✨</button>
                    ` : `
                        <button class="primary-btn outline" onclick="MashGame.init(document.getElementById('game-container'))">Tekrar Dene</button>
                    `}
                </div>
            </div>
            <style>
                .mash-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .mash-title { color: var(--primary); margin-bottom: 2rem; letter-spacing: 2px; }
                .mash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%; max-width: 500px; margin-bottom: 2rem; }
                .mash-card { 
                    background: rgba(255,255,255,0.03); border: 1px solid var(--glass-border); padding: 1.5rem; border-radius: 16px;
                    transition: 0.5s;
                }
                .mash-card.revealed { background: rgba(168, 85, 247, 0.1); border-color: var(--primary); transform: translateY(-5px); }
                .mash-card label { font-size: 0.7rem; font-weight: 800; color: var(--primary); opacity: 0.6; }
                .mash-card p { font-size: 1.2rem; font-weight: 700; color: white; margin-top: 5px; }
                .pulse { animation: pulse 2s infinite; }
                @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 var(--primary-glow); } 50% { box-shadow: 0 0 20px 5px var(--primary-glow); } }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.MashGame = MashGame;
