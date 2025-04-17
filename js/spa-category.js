// spa-category.js (백엔드 API 연동)
// 카테고리 렌더링 함수 (전환 애니메이션 포함)
function renderCategory(category) {
    const view = document.getElementById('view');

    // 전환 애니메이션: 페이드 아웃
    view.classList.add('fade-out');

    setTimeout(async () => {
        try {
            const url = category
                ? `http://localhost:8081/api/products?category=${encodeURIComponent(category)}`
                : 'http://localhost:8081/api/products';

            const res = await fetch(url);
            if (!res.ok) throw new Error('상품 불러오기 실패');
            const items = await res.json();

            if (!items.length) {
                view.innerHTML = '<div class="container"><p>상품이 존재하지 않습니다.</p></div>';
            } else {
                view.innerHTML = `
					<div class="container">
						<div class="title">
							<h4>CATEGORY</h4>
							<h2>${category.toUpperCase()}</h2>
						</div>
						<div class="card-container">
							${items
                                .map(
                                    (item) => `
									<div class="card-inner" onclick="goToDetailPage(${item.id})">
										<div class="image-wrapper">
											<img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='../images/default.png'">
										</div>
										<div class="content">
											<h3>${item.name}</h3>
											<p class="price">₩${item.price.toLocaleString()}</p>
										</div>
									</div>
								`
                                )
                                .join('')}
						</div>
					</div>
				`;
            }
        } catch (err) {
            view.innerHTML = '<div class="container"><p>에러 발생: ' + err.message + '</p></div>';
        }

        view.classList.remove('fade-out');
        view.classList.add('fade-in');

        setTimeout(() => view.classList.remove('fade-in'), 400);
    }, 400);
}

// 상품 상세 페이지 이동 (QueryString 방식)
function goToDetailPage(id) {
    window.location.href = `product-detail.html?id=${id}`;
}

// 해시 기반 카테고리 추적
function handleHashChange() {
    const hash = window.location.hash;
    const match = hash.match(/category=([a-z]+)/);
    const category = match ? match[1] : null;

    if (category) renderCategory(category);
    else document.getElementById('view').innerHTML = '';
}

// 홈으로 이동
document.getElementById('home-link').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../index.html';
});

// 이벤트 연결
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', handleHashChange);
// end spa-category.js
