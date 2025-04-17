// category-list.js
const category = new URLSearchParams(window.location.search).get('category') || 'clothes';

const categoryNameMap = {
    clothes: 'Clothes',
    accessories: 'Accessories',
    goods: 'Goods',
    etc: 'Etcetera'
};

const sectionTitle = document.getElementById('section-title');
const sectionTag = document.getElementById('section-tag');

sectionTitle.textContent = categoryNameMap[category] || 'Unknown';
sectionTag.textContent = category.toUpperCase();

const dataMap = {
    clothes: Array.from({ length: 30 }, (_, i) => ({
        name: `의류 상품 ${i + 1}`,
        price: `₩${(i + 1) * 10000}`,
        image: `../../images/clothes/clothes${i + 20}.png`,
        link: `../../html/detail/product-detail.html?id=c${i + 1}`
    })),
    accessories: [],
    goods: [],
    etc: []
};

const items = dataMap[category] || [];
const container = document.getElementById('card-container');
const loadMoreBtn = document.getElementById('load-more');

let currentIndex = 0;
const itemsPerPage = 12;

function loadItems() {
    const slice = items.slice(currentIndex, currentIndex + itemsPerPage);

    slice.forEach((item) => {
        const card = document.createElement('a');
        card.className = 'card-inner';
        card.href = item.link;
        card.innerHTML = `
      <div class="image-wrapper">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='../../images/default.png'">
      </div>
      <div class="content">
        <h3>${item.name}</h3>
        <p class="price">${item.price}</p>
      </div>
    `;
        container.appendChild(card);
    });

    currentIndex += itemsPerPage;
    if (currentIndex >= items.length) {
        loadMoreBtn.style.display = 'none';
    }
}

loadItems();
loadMoreBtn.addEventListener('click', loadItems);
// end category-list.js
