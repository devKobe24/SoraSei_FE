/* category-card.js */
document.addEventListener('DOMContentLoaded', function () {
    const categories = [
        {
            img: '../images/acc/acc27.png',
            tag: 'CLOTHES',
            title: 'Clothes',
            link: '../html/detail/clothes.html'
        },
        {
            img: '../images/acc/acc9.png',
            tag: 'ACCESSORIES',
            title: 'Accessories',
            link: '../html/detail/accessories.html'
        },
        {
            img: '../images/acc/acc14.png',
            tag: 'MERCHANDISE',
            title: 'Goods',
            link: '../html/detail/goods.html'
        },
        {
            img: '../images/acc/acc35.png',
            tag: 'ETC',
            title: 'Etcetera',
            link: '../html/detail/etc.html'
        },
        {
            img: '../images/mock5.png',
            tag: 'APP',
            title: 'Netflix Clone',
            link: 'detail5.html'
        },
        {
            img: '../images/mock6.png',
            tag: 'WEB',
            title: 'FirmBee Web',
            link: 'detail6.html'
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
            <strong>${item.tag}</strong>
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
