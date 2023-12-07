document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('product-form');
    const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];
    const deleteAllButton = document.getElementById('delete-all-button');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editIdInput = document.getElementById('edit-id');
    const editNameInput = document.getElementById('edit-name');
    const editPriceInput = document.getElementById('edit-price');

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;

        if (name && price) {
            addProduct(name, price);
            productForm.reset();
        }
    });

    deleteAllButton.addEventListener('click', function () {
        const confirmDelete = confirm('Are you sure you want to delete all products?');
        if (confirmDelete) {
            deleteAllProducts();
        }
    });

    editForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const editedId = editIdInput.value;
        const editedName = editNameInput.value;
        const editedPrice = editPriceInput.value;

        if (editedName && editedPrice) {
            editProduct(editedId, editedName, editedPrice);
            closeEditModal();
        }
    });

    document.getElementById('search').addEventListener('input', function () {
        searchProducts();
    });
});

function renderProducts(searchTerm = '') {
    const productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];
    productTable.innerHTML = '';

    let products = JSON.parse(localStorage.getItem('products')) || [];

    products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toString().includes(searchTerm)
    );

    products.forEach(product => {
        const row = productTable.insertRow();
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="editProductButton(${product.id})"class="marg1">تعديل</button>
                <button onclick="deleteProduct(${product.id})" class="marg2">مسح</button>
            </td>
        `;
    });
}

function addProduct(name, price) {
    const productId = new Date().getTime();
    const product = { id: productId, name, price };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    renderProducts();
}

function deleteAllProducts() {
    localStorage.removeItem('products');
    renderProducts();
}

function editProductButton(productId) {
    const productToEdit = getProductById(productId);

    if (productToEdit) {
        const editIdInput = document.getElementById('edit-id');
        const editNameInput = document.getElementById('edit-name');
        const editPriceInput = document.getElementById('edit-price');

        editIdInput.value = productToEdit.id;
        editNameInput.value = productToEdit.name;
        editPriceInput.value = productToEdit.price;
        const editModal = document.getElementById('edit-modal');
        editModal.style.display = 'block';
    }
}

function editProduct(id, name, price) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const editedProductIndex = products.findIndex(product => product.id === parseInt(id));

    if (editedProductIndex !== -1) {
        products[editedProductIndex] = { id: parseInt(id), name, price };
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }
}

function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));

    renderProducts();
}

function getProductById(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    return products.find(product => product.id === productId);
}

function closeEditModal() {
    const editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';
}

window.addEventListener('click', function (event) {
    const editModal = document.getElementById('edit-modal');
    if (event.target === editModal) {
        closeEditModal();
    }
});

function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    renderProducts(searchTerm);
}

function openSearchResults() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredProducts = getFilteredProducts(searchTerm);

    sessionStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
    // window.location.href = 'file:///C:/Users/ahmed%20yasser/Desktop/%231%20vue.js%20%20project/%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%A7%D8%AF%D8%A7%D8%B1%D9%87%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA/index2.html';
}

function getFilteredProducts(searchTerm) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toString().includes(searchTerm)
    );
}

// View All Products Function
function viewAllProducts() {
    renderProducts();
}