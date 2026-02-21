const PictionaryGame = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    words: ['ELMA', 'EV', 'GÜNEŞ', 'AĞAÇ', 'ARABA', 'KEDİ', 'BİLGİSAYAR', 'UÇAK'],
    currentWord: '',

    init(container) {
        this.currentWord = this.words[Math.floor(Math.random() * this.words.length)];
        this.render(container);
        this.setupCanvas();
    },

    setupCanvas() {
        this.canvas = document.getElementById('p-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';

        this.canvas.onmousedown = (e) => {
            this.isDrawing = true;
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
        };
        this.canvas.onmousemove = (e) => {
            if (this.isDrawing) {
                this.ctx.lineTo(e.offsetX, e.offsetY);
                this.ctx.stroke();
            }
        };
        this.canvas.onmouseup = () => this.isDrawing = false;
        this.canvas.onmouseleave = () => this.isDrawing = false;
    },

    clear(container) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    finish(container) {
        this.render(container, `Güzel çizim! Kelime şuydu: <span>${this.currentWord}</span>`);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="p-game">
                <div class="p-header">
                    ${status ? `<div class="p-status">${status}</div>` : `<p>Çizmen gereken kelime: <strong>${this.currentWord}</strong></p>`}
                </div>
                
                <canvas id="p-canvas" width="350" height="300" class="glass" style="border: 2px solid var(--glass-border); border-radius: 12px; cursor: crosshair; touch-action: none;"></canvas>

                <div class="p-controls">
                    <button class="primary-btn outline" onclick="PictionaryGame.clear(document.getElementById('game-container'))">Temizle</button>
                    <button class="primary-btn" onclick="PictionaryGame.finish(document.getElementById('game-container'))">Tamamla!</button>
                </div>
                
                <button class="primary-btn outline" onclick="PictionaryGame.init(document.getElementById('game-container'))" style="margin-top: 1rem;">Yeni Kelime</button>
            </div>
            <style>
                .p-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .p-header { margin-bottom: 1rem; min-height: 3rem; }
                .p-header strong { color: var(--primary); font-size: 1.4rem; text-shadow: 0 0 10px var(--primary-glow); }
                .p-status { font-size: 1.2rem; font-weight: 700; }
                .p-status span { color: var(--primary); font-size: 1.5rem; }
                .p-controls { display: flex; gap: 10px; margin-top: 1rem; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
        if (!status) this.setupCanvas();
    }
};

window.PictionaryGame = PictionaryGame;
