const DotsBoxesGame = {
    rows: 5,
    cols: 5,
    dots: [],
    lines: { horizontal: [], vertical: [] },
    boxes: [],
    currentPlayer: 'Mavi',
    scores: { 'Mavi': 0, 'Kırmızı': 0 },

    init(container) {
        this.dots = Array(this.rows).fill(null).map(() => Array(this.cols).fill(null));
        this.lines = {
            horizontal: Array(this.rows).fill(null).map(() => Array(this.cols - 1).fill(null)),
            vertical: Array(this.rows - 1).fill(null).map(() => Array(this.cols).fill(null))
        };
        this.boxes = Array(this.rows - 1).fill(null).map(() => Array(this.cols - 1).fill(null));
        this.currentPlayer = 'Mavi';
        this.scores = { 'Mavi': 0, 'Kırmızı': 0 };
        this.render(container);
    },

    handleLineClick(type, r, c, container) {
        if (this.lines[type][r][c]) return;

        this.lines[type][r][c] = this.currentPlayer;
        const boxesCaptured = this.checkBlocks(type, r, c);

        if (boxesCaptured > 0) {
            this.scores[this.currentPlayer] += boxesCaptured;
            if (this.isBoardFull()) {
                this.render(container, this.getWinnerMessage());
            } else {
                this.render(container);
            }
        } else {
            this.currentPlayer = this.currentPlayer === 'Mavi' ? 'Kırmızı' : 'Mavi';
            this.render(container);
        }
    },

    checkBlocks(type, r, c) {
        let captured = 0;
        if (type === 'horizontal') {
            // Check box above
            if (r > 0) {
                if (this.lines.horizontal[r - 1][c] && this.lines.vertical[r - 1][c] && this.lines.vertical[r - 1][c + 1]) {
                    this.boxes[r - 1][c] = this.currentPlayer;
                    captured++;
                }
            }
            // Check box below
            if (r < this.rows - 1) {
                if (this.lines.horizontal[r + 1][c] && this.lines.vertical[r][c] && this.lines.vertical[r][c + 1]) {
                    this.boxes[r][c] = this.currentPlayer;
                    captured++;
                }
            }
        } else { // vertical
            // Check box left
            if (c > 0) {
                if (this.lines.vertical[r][c - 1] && this.lines.horizontal[r][c - 1] && this.lines.horizontal[r + 1][c - 1]) {
                    this.boxes[r][c - 1] = this.currentPlayer;
                    captured++;
                }
            }
            // Check box right
            if (c < this.cols - 1) {
                if (this.lines.vertical[r][c + 1] && this.lines.horizontal[r][c] && this.lines.horizontal[r + 1][c]) {
                    this.boxes[r][c] = this.currentPlayer;
                    captured++;
                }
            }
        }
        return captured;
    },

    isBoardFull() {
        return this.boxes.every(row => row.every(box => box !== null));
    },

    getWinnerMessage() {
        if (this.scores['Mavi'] > this.scores['Kırmızı']) return "Mavi Kazandı!";
        if (this.scores['Kırmızı'] > this.scores['Mavi']) return "Kırmızı Kazandı!";
        return "Berabere!";
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="dots-game">
                <div class="game-header">
                    <div class="score-card ${this.currentPlayer === 'Mavi' ? 'active' : ''}" style="color: #3b82f6">Mavi: ${this.scores['Mavi']}</div>
                    <div class="score-card ${this.currentPlayer === 'Kırmızı' ? 'active' : ''}" style="color: #ef4444">Kırmızı: ${this.scores['Kırmızı']}</div>
                </div>
                <div class="dots-grid-container" style="--rows: ${this.rows}; --cols: ${this.cols};">
                    <div class="dots-grid">
                        ${this.renderGrid()}
                    </div>
                </div>
                ${status ? `<div class="game-status">${status}</div>` : ''}
                <button class="primary-btn" onclick="DotsBoxesGame.init(document.getElementById('game-container'))" style="width:auto; margin-top:1.5rem; padding: 10px 20px;">
                    Yeniden Başlat
                </button>
            </div>
            <style>
                .dots-game { display: flex; flex-direction: column; align-items: center; width: 100%; }
                .game-header { display: flex; gap: 2rem; margin-bottom: 2rem; }
                .score-card { font-size: 1.1rem; font-weight: 700; padding: 5px 15px; border-radius: 8px; border: 1px solid transparent; }
                .score-card.active { background: rgba(255,255,255,0.05); border-color: currentColor; box-shadow: 0 0 10px currentColor; }
                .dots-grid-container { position: relative; width: 300px; height: 300px; }
                .dots-grid { position: relative; width: 100%; height: 100%; }
                
                .dot { position: absolute; width: 8px; height: 8px; background: white; border-radius: 50%; z-index: 10; transform: translate(-50%, -50%); box-shadow: 0 0 5px rgba(255,255,255,0.5); }
                
                .line { position: absolute; background: rgba(255,255,255,0.05); cursor: pointer; transition: 0.3s; z-index: 5; }
                .line:hover:not(.taken) { background: rgba(255,255,255,0.2); }
                .line.taken { background: currentColor; }
                .line.horizontal { height: 6px; transform: translate(0, -50%); border-radius: 3px; }
                .line.vertical { width: 6px; transform: translate(-50%, 0); border-radius: 3px; }
                
                .line.taken.Mavi { color: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
                .line.taken.Kırmızı { color: #ef4444; box-shadow: 0 0 8px #ef4444; }
                
                .box-fill { position: absolute; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.5rem; opacity: 0.3; pointer-events: none; }
                .box-fill.Mavi { color: #3b82f6; }
                .box-fill.Kırmızı { color: #ef4444; }
                
                .game-status { margin-top: 1rem; font-size: 1.2rem; font-weight: 800; color: var(--primary); }
            </style>
        `;
    },

    renderGrid() {
        let html = '';
        const step = 100 / (this.cols - 1);

        // Render Dots
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                html += `<div class="dot" style="top: ${r * step}%; left: ${c * step}%;"></div>`;
            }
        }

        // Render Horizontal Lines
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols - 1; c++) {
                const takenClass = this.lines.horizontal[r][c] ? `taken ${this.lines.horizontal[r][c]}` : '';
                html += `<div class="line horizontal ${takenClass}" 
                    style="top: ${r * step}%; left: ${c * step}%; width: ${step}%;"
                    onclick="DotsBoxesGame.handleLineClick('horizontal', ${r}, ${c}, document.getElementById('game-container'))"></div>`;
            }
        }

        // Render Vertical Lines
        for (let r = 0; r < this.rows - 1; r++) {
            for (let c = 0; c < this.cols; c++) {
                const takenClass = this.lines.vertical[r][c] ? `taken ${this.lines.vertical[r][c]}` : '';
                html += `<div class="line vertical ${takenClass}" 
                    style="top: ${r * step}%; left: ${c * step}%; height: ${step}%;"
                    onclick="DotsBoxesGame.handleLineClick('vertical', ${r}, ${c}, document.getElementById('game-container'))"></div>`;
            }
        }

        // Render Boxes
        for (let r = 0; r < this.rows - 1; r++) {
            for (let c = 0; c < this.cols - 1; c++) {
                if (this.boxes[r][c]) {
                    html += `<div class="box-fill ${this.boxes[r][c]}" 
                        style="top: ${r * step}%; left: ${c * step}%; width: ${step}%; height: ${step}%;">
                        ${this.boxes[r][c][0]}
                    </div>`;
                }
            }
        }

        return html;
    }
};

window.DotsBoxesGame = DotsBoxesGame;
