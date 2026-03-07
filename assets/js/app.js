/**
 * app.js
 * Renders customer side (index.html), handles cart and animations.
 * ES Module Entry Point
 */

// Supabase entegrasyonu isteğe bağlı — hata verse de uygulama çalışmaya devam eder
let getYazarlar = async () => [];

/* =======================================
   YEREL MENÜ VERİTABANI (DB)
   ======================================= */
const DB = {
    getMenu() {
        return [
            // — Başlangıçlar —
            {
                id: 1, name: 'Sigara Böreği', category: 'Başlangıçlar',
                price: 89, discount: 0,
                description: 'Çıtır hamurda beyaz peynir ve maydanoz dolgulu klasik Türk böreği.',
                image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80'
            },
            {
                id: 2, name: 'Humus & Tahin', category: 'Başlangıçlar',
                price: 75, discount: 10,
                description: 'Zeytinyağı ve kırmızı biberle servis edilen geleneksel nohut ezmesi.',
                image: 'https://images.unsplash.com/photo-1593001872095-7d5b3868dd00?w=600&q=80'
            },
            {
                id: 3, name: 'Mercimek Çorbası', category: 'Başlangıçlar',
                price: 65, discount: 0,
                description: 'Taze otlar, limon dilimleri eşliğinde kadife kıvamında kırmızı mercimek.',
                image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80'
            },

            // — Ana Yemekler —
            {
                id: 4, name: 'Mantarlı Burger', category: 'Ana Yemekler',
                price: 245, discount: 15,
                description: 'El yapımı dana köftesi, karidesli mantar sosu, karamelize soğan ve füme cheddar.',
                image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80'
            },
            {
                id: 5, name: 'Izgara Levrek', category: 'Ana Yemekler',
                price: 320, discount: 0,
                description: 'Deniz levreği, limon tereyağı sosu, ızgara sebze ve pilav garnitürüyle.',
                image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80'
            },
            {
                id: 6, name: 'Kuzu İncik', category: 'Ana Yemekler',
                price: 380, discount: 0,
                description: 'Fırında 6 saat pişirilmiş kuzu incik, kekik aromalı basmati pilavıyla.',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
            },
            {
                id: 7, name: 'Tavuk Şiş', category: 'Ana Yemekler',
                price: 195, discount: 0,
                description: 'Baharat marine edilmiş tavuk, közlenmiş biber ve lavaş ekmeğiyle.',
                image: 'https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=600&q=80'
            },

            // — Pizzalar —
            {
                id: 8, name: 'Napoli Margarita', category: 'Pizzalar',
                price: 185, discount: 0,
                description: 'San Marzano domates sosu, mozzarella, taze fesleğen — sadeliğin zirvesi.',
                image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80'
            },
            {
                id: 9, name: 'Dört Peynirli Pizza', category: 'Pizzalar',
                price: 210, discount: 5,
                description: 'Mozzarella, gorgonzola, parmesan ve ricotta — peynir sevenler için.',
                image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80'
            },
            {
                id: 10, name: 'BBQ Tavuk Pizza', category: 'Pizzalar',
                price: 200, discount: 0,
                description: 'Barbekü soslu tavuk, karamelize soğan, mısır ve özel BBQ kremli sos.',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80'
            },

            // — Makarnalar —
            {
                id: 11, name: 'Truffle Fettuccine', category: 'Makarnalar',
                price: 275, discount: 0,
                description: 'El yapımı fettuccine, siyah truffle kreması ve parmesan rendelesiyle.',
                image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80'
            },
            {
                id: 12, name: 'Deniz Ürünleri Linguine', category: 'Makarnalar',
                price: 295, discount: 10,
                description: 'Karides, kalamar ve midye ile al pomodoro soslu taze linguine.',
                image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80'
            },
            {
                id: 13, name: 'Bolognese Rigatoni', category: 'Makarnalar',
                price: 215, discount: 0,
                description: 'Saatlerce pişirilmiş dana kıyalı bolognese ve taze domates sosu.',
                image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&q=80'
            },

            // — Tatlılar —
            {
                id: 14, name: 'Çikolatalı Sufle', category: 'Tatlılar',
                price: 120, discount: 0,
                description: 'Sıcak çikolata sufle, vanilyalı dondurma ve çilek sos ile.',
                image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600&q=80'
            },
            {
                id: 15, name: 'Tiramisu', category: 'Tatlılar',
                price: 110, discount: 0,
                description: 'Savoiardi bisküvi, mascarpone krem ve espresso — İtalya\'nın şaheseri.',
                image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80'
            },
            {
                id: 16, name: 'Baklava Tabağı', category: 'Tatlılar',
                price: 95, discount: 20,
                description: 'Antep fıstıklı ve cevizli karışık baklava, kaymak ile servis edilir.',
                image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=600&q=80'
            },

            // — İçecekler —
            {
                id: 17, name: 'Taze Sıkılmış Limonata', category: 'İçecekler',
                price: 55, discount: 0,
                description: 'Nane, zencefil dokunuşlu ev yapımı limonata, buzlu servis.',
                image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=600&q=80'
            },
            {
                id: 18, name: 'Türk Kahvesi', category: 'İçecekler',
                price: 45, discount: 0,
                description: 'Geleneksel cezve kahvesi, lokum ve su ile sunulur.',
                image: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&q=80'
            },
        ];
    },

    getCategories() {
        const all = ['Hepsi'];
        const unique = [...new Set(this.getMenu().map(p => p.category))];
        return [...all, ...unique];
    }
};

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

        // Kategorileri mevcut ürün listesinden dinamik olarak üret (DB veya Supabase)
        const uniqueCats = [...new Set(allProucts.map(p => p.category).filter(Boolean))];
        const categories = ['Hepsi', ...uniqueCats];
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

    /**
     * menuGuncelle – Supabase'den çekilen yemek listesini
     * Supabase alan adlarını (isim, aciklama, fiyat, kategori, gorsel, indirim)
     * renderMenu'nun beklediği formata (name, description, price, category, image, discount)
     * dönüştürür ve menüyü yeniden render eder.
     */
    function menuGuncelle(liste) {
        // Supabase listesi boş veya geçersizse yerel menü korunur
        if (!liste || liste.length === 0) return;

        // Supabase alan adlarını → renderMenu formatına çevir
        const donusturulmus = liste.map((yemek, index) => ({
            id: yemek.id ?? index,
            name: yemek.isim || yemek.name || 'İsimsiz',
            description: yemek.aciklama || yemek.description || '',
            price: parseFloat(yemek.fiyat ?? yemek.price ?? 0),
            category: yemek.kategori || yemek.category || 'Diğer',
            discount: parseFloat(yemek.indirim ?? yemek.discount ?? 0),
            image: yemek.gorsel || yemek.image || null
        }));

        // allProducts'ı Supabase verisiyle güncelle (filtreler de güncellensin)
        allProucts = donusturulmus;

        // Filtreleri ve menüyü yeniden render et
        renderFilters();
        renderMenu(donusturulmus);
    }

    // Boot App — yerel menüler hemen yüklenir
    init();

    // Supabase arka planda denenir — başarılıysa menüyü Supabase verisiyle günceller
    import('./db.js')
        .then(mod => {
            console.log('✅ Supabase bağlantısı kuruldu, veriler çekiliyor...');
            return mod.getYazarlar();
        })
        .then(liste => {
            console.log(`✅ Supabase'den ${liste.length} ürün geldi:`, liste);
            menuGuncelle(liste);
        })
        .catch(err => console.warn('⚠️ Supabase yüklenemedi, yerel menü kullanılıyor:', err));
});
