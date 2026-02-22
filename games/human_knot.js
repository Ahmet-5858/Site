const HumanKnotGame = {
    nodes: [],
    connections: [],
    isGameOver: false,

    init(container) {
        // Points in a "knot"
        this.nodes = [
            { id: 0, x: 100, y: 50 },
            { id: 1, x: 150, y: 100 },
            { id: 2, x: 100, y: 150 },
            { id: 3, x: 50, y: 100 }
        ];
        this.connections = [[0, 2], [1, 3]]; // Crossed lines
        this.isGameOver = false;
        this.render(container);
    },

    untangle(nodeId, container) {
        if (this.isGameOver) return;

        // Simple mechanic: Moving nodes to uncross
        const node = this.nodes[nodeId];
        node.x = 20 + Math.random() * 160;
        node.y = 20 + Math.random() * 160;

        // Success check (simplified): Nodes should be far enough
        this.checkSuccess(container);
    },

    checkSuccess(container) {
        // Logic: if nodes are roughly in a circle/diamond and not overlapping lines
        // For simplicity, we celebrate the "untangling" action
        this.render(container);
    },

    render(container, status = null) {
        container.innerHTML = `
            <div class="knot-game">
                <div class="game-info">${status || 'İnsan Düğümünü çözmek için noktaları hareket ettir!'}</div>
                
                <div class="knot-area">
                    <svg viewBox="0 0 200 200" width="300" height="300">
                        ${this.connections.map(c => `
                            <line x1="${this.nodes[c[0]].x}" y1="${this.nodes[c[0]].y}" 
                                  x2="${this.nodes[c[1]].x}" y2="${this.nodes[c[1]].y}" class="knot-line" />
                        `).join('')}
                        ${this.nodes.map(n => `
                            <circle cx="${n.x}" cy="${n.y}" r="12" class="knot-node" 
                                    onclick="HumanKnotGame.untangle(${n.id}, document.getElementById('game-container'))" />
                        `).join('')}
                    </svg>
                </div>

                <div class="controls">
                    <p>Düğümü çözmek için "insanlara" (noktalara) tıkla!</p>
                </div>

                <button class="primary-btn outline" onclick="HumanKnotGame.init(document.getElementById('game-container'))" style="margin-top: 2rem;">Sıfırla</button>
            </div>
            <style>
                .knot-game { display: flex; flex-direction: column; align-items: center; width: 100%; text-align: center; }
                .game-info { font-weight: 700; color: var(--primary); margin-bottom: 2rem; min-height: 2.5rem; }
                .knot-area { background: rgba(0,0,0,0.2); border-radius: 50%; padding: 20px; border: 2px solid var(--glass-border); }
                .knot-line { stroke: var(--primary); stroke-width: 4; opacity: 0.5; filter: drop-shadow(0 0 5px var(--primary-glow)); }
                .knot-node { fill: var(--primary); cursor: pointer; transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .knot-node:hover { fill: white; r: 15; }
                .controls { margin-top: 1.5rem; font-size: 0.8rem; opacity: 0.6; }
                .outline { background: none; border: 1px solid var(--primary); color: var(--primary); }
            </style>
        `;
    }
};

window.HumanKnotGame = HumanKnotGame;
