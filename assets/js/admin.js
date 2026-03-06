/**
 * admin.js
 * Handles Dashboard logic, CRUD operations for the Menu using DB class.
 */

document.addEventListener('DOMContentLoaded', () => {

    // UI Elements
    const productList = document.getElementById('admin-product-list');
    const totalProductsEl = document.getElementById('total-products');
    const totalCategoriesEl = document.getElementById('total-categories');

    // Modal Elements
    const modal = document.getElementById('product-modal');
    const addBtn = document.getElementById('add-new-btn');
    const closeBtn = document.getElementById('close-modal');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');

    // Render Table
    function renderAdminTable() {
        const menu = DB.getMenu();
        const categories = DB.getCategories().filter(c => c !== 'Hepsi');

        // Update Stats
        totalProductsEl.textContent = menu.length;
        totalCategoriesEl.textContent = categories.length;

        // Datalist for autocomplete
        const dl = document.getElementById('cat-suggestions');
        dl.innerHTML = '';
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            dl.appendChild(opt);
        });

        // Render Rows
        productList.innerHTML = '';

        if (menu.length === 0) {
            productList.innerHTML = `<tr><td colspan="6" class="text-center">Henüz ürün eklenmemiş.</td></tr>`;
            return;
        }

        menu.forEach(item => {
            const imgUrl = item.image ? item.image : `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${imgUrl}" class="img-thumbnail" alt="${item.name}"></td>
                <td><strong>${item.name}</strong></td>
                <td>${item.category}</td>
                <td>${item.price} ₺</td>
                <td>%${item.discount}</td>
                <td>
                    <button class="action-btn edit" data-id="${item.id}" title="Düzenle"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="action-btn delete" data-id="${item.id}" title="Sil"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            productList.appendChild(tr);
        });

        attachActionListeners();
    }

    // Modal Logic
    function openModal(isEdit = false, item = null) {
        modalTitle.textContent = isEdit ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle';
        if (isEdit && item) {
            document.getElementById('product-id').value = item.id;
            document.getElementById('product-name').value = item.name;
            document.getElementById('product-desc').value = item.description;
            document.getElementById('product-price').value = item.price;
            document.getElementById('product-discount').value = item.discount;
            document.getElementById('product-category').value = item.category;
            document.getElementById('product-image').value = item.image || '';
        } else {
            productForm.reset();
            document.getElementById('product-id').value = '';
        }
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        productForm.reset();
    }

    addBtn.addEventListener('click', () => openModal());
    closeBtn.addEventListener('click', closeModal);

    // Form Submit
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = document.getElementById('product-id').value;
        const productData = {
            id: id,
            name: document.getElementById('product-name').value,
            description: document.getElementById('product-desc').value,
            price: parseFloat(document.getElementById('product-price').value),
            discount: parseInt(document.getElementById('product-discount').value) || 0,
            category: document.getElementById('product-category').value,
            image: document.getElementById('product-image').value
        };

        if (id) {
            DB.updateProduct(productData);
        } else {
            DB.addProduct(productData);
        }

        closeModal();
        renderAdminTable();
    });

    // Edit & Delete Handlers
    function attachActionListeners() {
        document.querySelectorAll('.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                const menu = DB.getMenu();
                const item = menu.find(p => p.id === id);
                if (item) openModal(true, item);
            });
        });

        document.querySelectorAll('.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
                    DB.deleteProduct(id);
                    renderAdminTable();
                }
            });
        });
    }

    // Init Admin Dashboard
    renderAdminTable();
});
