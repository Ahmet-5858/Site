/**
 * app.js
 * Renders customer side (index.html), handles cart and animations.
 * ES Module Entry Point
 */

import { getYazarlar } from './db.js';

// Define Cart State
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.desktop-nav');

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

            const discountBadge = hasDiscount ? `<div class="discount-badge">%${item.discount}</div>` : '';
            const imgHtml = `<div style="height: 200px; border-radius: 8px; overflow: hidden; margin-bottom: 1rem; position:relative;">
                                <img src="${imgUrl}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>`;
            const priceHtml = `<div class="menu-price-container">
                                ${hasDiscount ? `<span class="menu-old-price">${item.price} ₺</span>` : ''}
                                <span class="menu-price">${finalPrice} ₺</span>
                            </div>`;

            const div = document.createElement('div');
            div.className = 'glass-card menu-item-card';
            div.innerHTML = `
                ${discountBadge}
                ${imgHtml}
                <div class="menu-item-info">
                    <div class="menu-item-header">
                        <h3>${item.name}</h3>
                        ${priceHtml}
                    </div>
                    <p class="menu-item-desc">${item.description}</p>
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        <i class="fa-solid fa-cart-plus"></i> Sepete Ekle
                    </button>
                </div>
            `;
            menuGrid.appendChild(div);
        });

        // Re-attach add-to-cart listeners
        attachCartListeners();
    }

    // Handle "Add to Cart" Clicks
    function attachCartListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const menu = DB.getMenu();
                const item = menu.find(i => i.id == id); // Notice: allow string/number coercion
                if (item) addToCart(item);

                // Small bounce animation on cart badge
                const cartCountEl = document.getElementById('cart-count');
                if (cartCountEl) {
                    cartCountEl.style.transform = 'scale(1.5)';
                    setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);
                }
            });
        });
    }

    /* =======================================
       CART LOGIC & UI SETUP
       ======================================= */
    const cartBtn = document.getElementById('floating-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountEl = document.getElementById('cart-count');
    const cartTotalPriceEl = document.getElementById('cart-total-price');

    // Toggle Sidebar
    if (cartBtn && cartSidebar && closeCartBtn) {
        cartBtn.addEventListener('click', () => cartSidebar.classList.remove('hidden'));
        closeCartBtn.addEventListener('click', () => cartSidebar.classList.add('hidden'));
    }

    function addToCart(item) {
        const finalPrice = item.discount > 0
            ? item.price * (1 - item.discount / 100)
            : item.price;

        const existingItem = cart.find(c => c.id == item.id);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ ...item, qty: 1, finalPrice: finalPrice });
        }

        updateCartUI();

        // Open sidebar on first item naturally
        if (cart.length === 1 && cart[0].qty === 1 && cartSidebar) {
            cartSidebar.classList.remove('hidden');
        }
    }

    // Render cart items array
    function updateCartUI() {
        if (!cartCountEl || !cartItemsContainer || !cartTotalPriceEl) return;

        // Count total qty
        const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
        cartCountEl.textContent = totalItems;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Sepetiniz şu anda boş.</div>';
            cartTotalPriceEl.textContent = '0.00 ₺';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            totalPrice += item.finalPrice * item.qty;
            const imgUrl = item.image ? item.image : `https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&w=150&q=80`;

            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${imgUrl}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.finalPrice.toFixed(2)} ₺</div>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn minus" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                    <span class="item-qty">${item.qty}</span>
                    <button class="qty-btn plus" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    <button class="remove-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(div);
        });

        cartTotalPriceEl.textContent = `${totalPrice.toFixed(2)} ₺`;
        attachCartItemActions();
    }

    function attachCartItemActions() {
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = cart.find(c => c.id == id);
                if (item) { item.qty++; updateCartUI(); }
            });
        });

        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const item = cart.find(c => c.id == id);
                if (item) {
                    item.qty--;
                    if (item.qty <= 0) cart = cart.filter(c => c.id != id);
                    updateCartUI();
                }
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                cart = cart.filter(c => c.id != id);
                updateCartUI();
            });
        });
    }

    // Checkout
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Sepetiniz boş. Lütfen önce ürün ekleyin.');
                return;
            }
            alert('Siparişiniz başarıyla alındı! Bizi tercih ettiğiniz için teşekkür ederiz.');
            cart = [];
            updateCartUI();
            if (cartSidebar) cartSidebar.classList.add('hidden');
        });
    }

    /* =======================================
       SUPABASE INTEGRATION (ES Module)
       ======================================= */

    // Fetch from Supabase and render
    getYazarlar().then(liste => {
        const konteyner = document.getElementById('menu-konteyner');
        if (!konteyner) return;

        // Eğer liste boş değilse sayfaya yazdır
        if (liste && liste.length > 0) {
            konteyner.innerHTML = liste.map(yemek => `
               <div class="glass-card yemek-karti" style="padding: 15px; width: 250px; display: flex; flex-direction: column; gap: 10px;">
                 <h3 style="font-family: var(--font-body);">${yemek.isim || 'İsimsiz'}</h3>
                 <p style="color: var(--text-muted); font-size: 0.9rem; flex-grow: 1;">${yemek.aciklama || ''}</p>
                 <p style="color: var(--primary-color);"><strong>Fiyat: ${yemek.fiyat || 0} TL</strong></p>
                 <button class="add-to-cart-btn" data-id="sb-${yemek.id || Math.random()}" onclick="alert('Supabase ürünü eklendi (Simülasyon)')">
                    <i class="fa-solid fa-cart-plus"></i> Sepete Ekle
                 </button>
               </div>
            `).join('');
        } else {
            konteyner.innerHTML = "<p style='color: var(--text-muted);'>Henüz menü eklenmedi veya veritabanı boş.</p>";
        }
    }).catch(err => {
        console.error("Yazarlar çekilirken hata oluştu:", err);
    });

    // Smooth Scrolling for Mobile Menu
    // Currently relying mostly on anchor links naturally

    // Boot App
    init();
});
