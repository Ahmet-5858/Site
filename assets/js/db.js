/**
 * db.js
 * Handles LocalStorage operations for the Restaurant Menu.
 */

const STORAGE_KEY = 'modern_restaurant_menu';

// Default Mock Data
const defaultMenu = [
    {
        id: '1',
        name: 'Truffle Burger',
        description: 'Dana köftesi, özel trüf mayonez, karamelize soğan, cheddar.',
        price: 320,
        discount: 0,
        category: 'Ana Yemek',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
        id: '2',
        name: 'Margherita Pizza',
        description: 'İtalyan domates sosu, taze mozzarella ve fesleğen.',
        price: 280,
        discount: 15,
        category: 'Ana Yemek',
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
        id: '3',
        name: 'Sezar Salata',
        description: 'Izgara tavuk, çıtır kruton, parmesan ve sezar sos.',
        price: 180,
        discount: 0,
        category: 'Salata',
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
        id: '4',
        name: 'Berry Mojito',
        description: 'Orman meyveleri, taze nane ve misket limonu.',
        price: 110,
        discount: 0,
        category: 'İçecek',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
        id: '5',
        name: 'San Sebastian Cheesecake',
        description: 'Yanık üzeri ve akışkan içi ile efsanevi İspanyol lezzeti.',
        price: 160,
        discount: 10,
        category: 'Tatlı',
        image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400&h=300'
    }
];

class DB {
    static init() {
        if (!localStorage.getItem(STORAGE_KEY)) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMenu));
        }
    }

    static getMenu() {
        this.init();
        return JSON.parse(localStorage.getItem(STORAGE_KEY));
    }

    static saveMenu(menuArr) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(menuArr));
    }

    static addProduct(product) {
        const menu = this.getMenu();
        product.id = Date.now().toString();
        menu.push(product);
        this.saveMenu(menu);
    }

    static updateProduct(updatedProduct) {
        const menu = this.getMenu();
        const index = menu.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            menu[index] = updatedProduct;
            this.saveMenu(menu);
        }
    }

    static deleteProduct(id) {
        let menu = this.getMenu();
        menu = menu.filter(p => p.id !== id);
        this.saveMenu(menu);
    }

    static getCategories() {
        const menu = this.getMenu();
        const cats = menu.map(item => item.category);
        return ['Hepsi', ...new Set(cats)];
    }
}
