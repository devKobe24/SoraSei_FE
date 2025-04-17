/* card-generator.js */
const container = document.getElementById('card-container');

// 서버에서 상품 목록 가져오기
async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:8081/api/products');
        if (!res.ok) throw new Error('서버 응답 오류');
        const items = await res.json();
        renderItems(items);
    } catch (err) {
        console.error('상품 목록 불러오기 실패:', err);
    }
}

// 카드 렌더링 함수
function renderItems(items) {
    container.innerHTML = ''; // 기존 카드 초기화
    items.forEach((item) => {
        const card = document.createElement('a');
        card.className = 'accessories-inner';
        card.href = `/html/product-detail.html?id=${item.id}`; // ✅ 상세페이지 링크

        card.innerHTML = `
      <div class="image-wrapper">
        <img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='../images/default.png'">
      </div>
      <div class="content">
        <h3>${item.name}</h3>
        <p class="price">₩${item.price.toLocaleString()}</p>
      </div>
    `;

        container.appendChild(card);
    });
}

// 초기 실행
fetchProducts();
/* End card-generator.js */
