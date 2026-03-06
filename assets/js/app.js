/**
 * app.js
 * Renders customer side (index.html), handles filters and animations.
 */

document.addEventListener('DOMContentLoaded', () => {

    const menuGrid = document.getElementById('menu-grid');
    const categoryFilters = document.getElementById('category-filters');

    let allProucts = [];

    // Initialize Menu
    function init() {
        allProucts = DB.getMenu();
        renderFilters();
        renderMenu(allProucts);
    }

    function renderFilters() {
        if (!categoryFilters) return;

        const categories = DB.getCategories();
        categoryFilters.innerHTML = '';

        categories.forEach((cat, index) => {
            const btn = document.createElement('button');
            btn.className = `cat-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = cat;

            btn.addEventListener('click', (e) => {
                // Update Active state
                document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter items
                if (cat === 'Hepsi') {
                    renderMenu(allProucts);
                } else {
                    const filtered = allProucts.filter(p => p.category === cat);
                    renderMenu(filtered);
                }
            });

            categoryFilters.appendChild(btn);
        });
    }

    function renderMenu(items) {
        if (!menuGrid) return;
        menuGrid.innerHTML = '';

        if (items.length === 0) {
            menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted)">Bu kategoride ürün bulunamadı.</p>';
            return;
        }

        items.forEach(item => {
            const hasDiscount = item.discount > 0;
            const finalPrice = hasDiscount ? (item.price * (1 - item.discount / 100)).toFixed(2) : item.price;

            // Image fallback
            const imgUrl = item.image ? item.image : `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`;

            const card = document.createElement('div');
            card.className = 'glass-card menu-item-card';

            card.innerHTML = `
                ${hasDiscount ? `<div class="discount-badge">%${item.discount}</div>` : ''}
                <div style="height: 200px; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; position:relative;">
                    <img src="${imgUrl}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="menu-item-header">
                    <h3 class="menu-title">${item.name}</h3>
                    <div class="menu-price-container">
                        ${hasDiscount ? `<span class="menu-old-price">${item.price} ₺</span>` : ''}
                        <span class="menu-price">${finalPrice} ₺</span>
                    </div>
                </div>
                <p class="menu-desc">${item.description}</p>
            `;

            menuGrid.appendChild(card);
        });
    }

    // Smooth Scrolling for Mobile Menu
    // Currently relying mostly on anchor links naturally

    // Boot App
    init();
});
