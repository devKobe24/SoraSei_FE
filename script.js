/* text_iife.js */
// 텍스트 작성과 삭제 즉시 실행 함수
(function () {
    const spanEl = document.querySelector('main h2 span');
    const txtArr = ['Sora Sei', 'Culture', 'Unity', 'Peace', 'Love'];
    let index = 0;
    let currentTxt = txtArr[index].split('');
    function writeTxt() {
        spanEl.textContent += currentTxt.shift();
        if (currentTxt.length !== 0) {
            setTimeout(writeTxt, Math.floor(Math.random() * 100));
        } else {
            currentTxt = spanEl.textContent.split('');
            setTimeout(deleteTxt, 3000);
        }
    }
    function deleteTxt() {
        currentTxt.pop();
        spanEl.textContent = currentTxt.join('');
        if (currentTxt.length !== 0) {
            setTimeout(deleteTxt, Math.floor(Math.random() * 100));
        } else {
            index = (index + 1) % txtArr.length;
            currentTxt = txtArr[index].split('');
            writeTxt();
        }
    }
    writeTxt();
})();
/* end text_iife.js */

/* scroll_request.js */
/* 수직 스크롤이 발생하면 header 태그에 active 클래스 추가 및 삭제 */
const headerEl = document.querySelector('header');
window.addEventListener('scroll', function () {
    requestAnimationFrame(scrollCheck);
});
function scrollCheck() {
    let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
    if (browerScrollY > 0) {
        headerEl.classList.add('active');
    } else {
        headerEl.classList.remove('active');
    }
}
/* end scroll_request.js */

/* move.js */
/* 애니메이션 스크롤 이동 */
const animationMove = function (selector) {
    // ① selector 매개변로 이동할 대상 요소 노드 가져오기
    const targetEl = document.querySelector(selector);
    // ② 현재 브라우저의 스크롤 정보(y 값)
    const browserScrollY = window.pageYOffset;
    // ③ 이동할 대상의 위치(y 값)
    const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
    // ④ 스크롤 이동
    window.scrollTo({ top: targetScorllY, behavior: 'smooth' });
};
// 스크롤 이벤트 연결하기
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");
for (let i = 0; i < scollMoveEl.length; i++) {
    scollMoveEl[i].addEventListener('click', function (e) {
        const target = this.dataset.target;
        animationMove(target);
    });
}
/* End move.js */

/* card-generator.js */
// 아이템 6개만 고정 렌더링
const items = Array.from({ length: 6 }, (_, i) => ({
    name: `상품명 ${i + 1}`,
    price: `₩${(i + 1) * 10000}`,
    image: `images/acc/acc${i + 1}.png`,
    link: `detail${i + 1}.html`
}));

const container = document.getElementById('card-container');

// 카드 렌더링 함수
function renderItems() {
    items.forEach((item) => {
        const card = document.createElement('a');
        card.className = 'accessories-inner';
        card.href = item.link;

        card.innerHTML = `
		<div class="image-wrapper">
		  <img src="${item.image}" alt="${item.name}" onerror="this.src='../images/default.png'">
		</div>
		<div class="content">
		  <h3>${item.name}</h3>
		  <p class="price">${item.price}</p>
		</div>
	  `;

        container.appendChild(card);
    });
}

renderItems();
/* End card-generator.js */
/* category-card.js */
document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        {
            img: '../images/acc/acc27.png',
            tag: 'CLOTHES',
            title: 'Clothes',
            link: '/html/category-clothes.html'
        },
        {
            img: '../images/acc/acc9.png',
            tag: 'ACCESSORIES',
            title: 'Accessories',
            link: '/html/category-accessories.html'
        },
        {
            img: '../images/acc/acc14.png',
            tag: 'MERCHANDISE',
            title: 'Goods',
            link: '/html/category-goods.html'
        },
        {
            img: '../images/acc/acc35.png',
            tag: 'ETC',
            title: 'Etcetera',
            link: '/html/category-etc.html'
        }
    ];

    const categoryContainer = document.getElementById('category-container');

    categories.forEach((item) => {
        const card = document.createElement('a');
        card.href = item.link;
        card.className = 'category-inner';

        card.innerHTML = `
            <div class="img-box">
                <img src="${item.img}" alt="${item.title}" />
            </div>
            <strong class="category-label">${item.tag}</strong>
            <h3>${item.title}</h3>
        `;

        // ✅ 클릭 시 페이드 아웃 효과 후 페이지 이동
        card.addEventListener('click', function (e) {
            e.preventDefault(); // 기본 링크 이동 막기
            document.body.classList.add('fade-out'); // 트랜지션 시작
            setTimeout(() => {
                window.location.href = item.link; // 페이지 이동
            }, 600); // CSS와 동일한 트랜지션 시간
        });

        categoryContainer.appendChild(card);
    });
});

/* end category-card.js */
