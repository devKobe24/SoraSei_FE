// category-goods.js
const itemsPerPage = 10;
let currentPage = 1;
let products = [];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:8081/api/products?category=goods');
        products = await res.json();
        renderPage(currentPage);
    } catch (e) {
        console.error('상품을 불러오는 중 오류:', e);
    }
});

function renderPage(page) {
    const container = document.getElementById('card-container');
    container.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = products.slice(start, end);

    pageItems.forEach((product) => {
        const card = document.createElement('a');
        card.className = 'card-inner';
        card.href = `product-detail.html?id=${product.id}`;
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='../images/default.png'" />
            </div>
            <div class="content">
                <h3>${product.name}</h3>
                <p class="price">₩${product.price.toLocaleString()}</p>
            </div>
        `;
        container.appendChild(card);
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.className = i === currentPage ? 'active' : '';
        btn.addEventListener('click', () => {
            currentPage = i;
            renderPage(currentPage);
        });
        pagination.appendChild(btn);
    }
}
// end category-goods.js
