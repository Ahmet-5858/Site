const NameCityGame = {
    currentLetter: '',
    results: { name: '', city: '', animal: '', object: '' },
    isGameOver: false,

    init(container) {
        const letters = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';
        this.currentLetter = letters[Math.floor(Math.random() * letters.length)];
        this.results = { name: '', city: '', animal: '', object: '' };
        this.isGameOver = false;
        this.render(container);
    },

    submit(container) {
        this.results.name = document.getElementById('nc-name').value.trim().toUpperCase();
        this.results.city = document.getElementById('nc-city').value.trim().toUpperCase();
        this.results.animal = document.getElementById('nc-animal').value.trim().toUpperCase();
        this.results.object = document.getElementById('nc-object').value.trim().toUpperCase();

        let score = 0;
        const valid = (val) => val && val[0] === this.currentLetter;

        if (valid(this.results.name)) score += 10;
        if (valid(this.results.city)) score += 10;
        if (valid(this.results.animal)) score += 10;
        if (valid(this.results.object)) score += 10;

        this.isGameOver = true;
        this.render(container, `Toplam Puanın: ${score} / 40`);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="nc-game">
                <div class="letter-display">Harf: <span>${this.currentLetter}</span></div>
                
                <div class="input-grid">
                    <div class="nc-field">
                        <label>İsim</label>
                        <input type="text" id="nc-name" placeholder="${this.currentLetter}..." ${this.isGameOver ? 'disabled' : ''}>
                    </div>
                    <div class="nc-field">
                        <label>Şehir</label>
                        <input type="text" id="nc-city" placeholder="${this.currentLetter}..." ${this.isGameOver ? 'disabled' : ''}>
                    </div>
                    <div class="nc-field">
                        <label>Hayvan</label>
                        <input type="text" id="nc-animal" placeholder="${this.currentLetter}..." ${this.isGameOver ? 'disabled' : ''}>
                    </div>
                    <div class="nc-field">
                        <label>Eşya</label>
                        <input type="text" id="nc-object" placeholder="${this.currentLetter}..." ${this.isGameOver ? 'disabled' : ''}>
                    </div>
                </div>

                ${status ? `<div class="game-status">${status}</div>` : ''}

                <div class="controls">
                    <button class="primary-btn" onclick="NameCityGame.submit(document.getElementById('game-container'))" ${this.isGameOver ? 'disabled' : ''}>Puanla</button>
                    <button class="primary-btn outline" onclick="NameCityGame.init(document.getElementById('game-container'))">Yeni Harf</button>
                </div>
            </div>
            <style>
                .nc-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .letter-display { font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; }
                .letter-display span { color: var(--primary); font-size: 3rem; text-shadow: 0 0 15px var(--primary-glow); }
                .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%; max-width: 500px; margin-bottom: 1.5rem; }
                .nc-field { display: flex; flex-direction: column; gap: 5px; text-align: left; }
                .nc-field label { font-size: 0.8rem; font-weight: 700; color: var(--primary); text-transform: uppercase; }
                .nc-field input { padding: 10px; border-radius: 8px; }
                .game-status { font-size: 1.5rem; font-weight: 800; color: var(--success); margin: 1rem 0; }
                .controls { display: flex; gap: 10px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.NameCityGame = NameCityGame;
