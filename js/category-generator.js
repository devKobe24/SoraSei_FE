// ✅ category-generator.js (SPA 방식 링크 적용)

document.addEventListener('DOMContentLoaded', () => {
    const categories = [
        {
            name: 'Clothes',
            tag: 'CLOTHES',
            image: 'images/acc/acc27.png',
            hash: 'clothes'
        },
        {
            name: 'Accessories',
            tag: 'ACCESSORIES',
            image: 'images/acc/acc9.png',
            hash: 'accessories'
        },
        {
            name: 'Merchandise',
            tag: 'MERCHANDISE',
            image: 'images/acc/acc14.png',
            hash: 'goods'
        },
        {
            name: 'Etcetera',
            tag: 'ETC',
            image: 'images/acc/acc35.png',
            hash: 'etc'
        }
    ];

    const container = document.getElementById('category-container');

    categories.forEach((item) => {
        const card = document.createElement('a');
        card.className = 'category-inner';
        // ✅ clothes.html → spa-category-view.html#category=clothes
        card.href = `/html/spa-category-view.html#category=${item.hash}`;

        card.innerHTML = `
		<div class="img-box">
		  <img src="${item.image}" alt="${item.name}" />
		</div>
		<strong>${item.tag}</strong>
		<h3>${item.name}</h3>
	  `;

        container.appendChild(card);
    });
});
