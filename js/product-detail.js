// ✅ product-detail.js
const sampleProduct = {
    name: 'Leather Tote Bag',
    price: 89000,
    description:
        '타임리스하고 우아한 디자인의 이 레더 토트백은 당신만을 위해 제작되었습니다. 정제된 디자인과 세련된 감성으로 일상적인 스타일을 한층 업그레이드해보세요.',
    images: [
        '../images/acc/acc1.png',
        '../images/acc/acc2.png',
        '../images/acc/acc3.png',
        '../images/acc/acc4.png',
        '../images/acc/acc5.png'
    ]
};

function renderProductDetail(product) {
    const container = document.getElementById('product-detail-view');
    container.innerHTML = `
    <div class="product-images">
        <div class="thumbnails">
            ${product.images
                .map(
                    (img, i) => `
                <img src="${img}" alt="썸네일 ${i + 1}" class="thumb ${i === 0 ? 'active' : ''}" data-index="${i}" />
              `
                )
                .join('')}
        </div>
        <div class="main-image">
            <img id="main-product-image" src="${product.images[0]}" alt="${product.name}" />
        </div>
    </div>
    <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">₩${product.price.toLocaleString()}</p>
        <p class="description">${product.description}</p>
        <div class="action-buttons">
            <button class="add-to-cart">Add to Cart</button>
            <button class="buy-now">Buy Now</button>
        </div>
    </div>
  `;

    document.querySelectorAll('.thumb').forEach((thumb) => {
        thumb.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const mainImage = document.getElementById('main-product-image');
            mainImage.src = product.images[index];

            document.querySelectorAll('.thumb').forEach((t) => t.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderProductDetail(sampleProduct);
});

document.getElementById('home-link').addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = '../index.html';
});
// end product-detail.js
