const WordAssociationGame = {
    chain: [],
    isGameOver: false,

    init(container) {
        this.chain = ['KİTAP'];
        this.isGameOver = false;
        this.render(container);
    },

    submit(value, container) {
        const lastWord = this.chain[this.chain.length - 1];
        const newWord = value.trim().toUpperCase();

        if (!newWord) return;

        if (this.chain.includes(newWord)) {
            this.render(container, 'BU KELİME DAHA ÖNCE SÖYLENDİ! ❌');
            return;
        }

        // Logic check: in a real game, this would be semantic. 
        // Here we just allow it but track the chain.
        this.chain.push(newWord);
        this.render(container, `"${newWord}" harika bir çağrışım! ✅`);

        // Simulated CPU response
        setTimeout(() => {
            const cpuResponses = ['OKUL', 'KALEM', 'KAĞIT', 'BİLGİ', 'KÜTÜPHANE', 'YAZI'];
            const response = cpuResponses[Math.floor(Math.random() * cpuResponses.length)];
            if (!this.chain.includes(response)) {
                this.chain.push(response);
                this.render(container, `Rakip "${response}" dedi.`);
            }
        }, 800);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="assoc-game">
                <div class="chain-box">
                    ${this.chain.map(w => `<span class="word-node">${w}</span>`).join('<i class="fa-solid fa-arrow-right"></i>')}
                </div>

                <div class="game-info">${status || 'Son kelimeyle ilgili bir kelime yaz!'}</div>
                
                <div class="input-area">
                    <input type="text" id="assoc-input" placeholder="Çağrışım..." ${this.isGameOver ? 'disabled' : ''}
                        onkeypress="if(event.key === 'Enter') WordAssociationGame.submit(this.value, document.getElementById('game-container'))">
                    <button class="primary-btn" onclick="WordAssociationGame.submit(document.getElementById('assoc-input').value, document.getElementById('game-container'))">GÖNDER</button>
                </div>

                <button class="primary-btn outline" onclick="WordAssociationGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .assoc-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .chain-box { 
                    max-width: 100%; overflow-x: auto; display: flex; align-items: center; gap: 10px; 
                    padding: 20px; background: rgba(0,0,0,0.2); border-radius: 15px; margin-bottom: 2rem;
                }
                .word-node { background: var(--primary); padding: 8px 15px; border-radius: 20px; font-weight: 800; font-size: 0.9rem; white-space: nowrap; }
                .chain-box i { color: opacity: 0.3; font-size: 0.8rem; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 1.5rem; min-height: 1.5rem; }
                .input-area { display: flex; gap: 10px; width: 100%; max-width: 400px; }
                #assoc-input { flex: 1; padding: 12px; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!this.isGameOver) {
            const el = document.getElementById('assoc-input');
            if (el) el.focus();
        }
    }
};

window.WordAssociationGame = WordAssociationGame;
