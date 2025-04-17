// /js/product-list.js
async function fetchProducts() {
    try {
        const res = await fetch('http://localhost:8081/api/products');
        if (!res.ok) throw new Error('상품 목록 조회 실패');
        const products = await res.json();
        renderTable(products);
    } catch (err) {
        alert('에러 발생: ' + err.message);
    }
}

function renderTable(products) {
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';

    products.forEach((product) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
		<td>${product.id}</td>
		<td>${product.name}</td>
		<td>${product.description}</td>
		<td>₩${product.price.toLocaleString()}</td>
		<td><img src="${product.imageUrl}" alt="${product.name}" onerror="this.src='../images/default.png'" /></td>
		<td>${product.stockQuantity}</td>
		<td>${product.active ? '활성화' : '비활성화'}</td>
		<td>${product.category}</td>
		<td>
		  <button class="btn edit">수정</button>
		  <button class="btn delete">삭제</button>
		</td>
	  `;

        // 수정/삭제 이벤트 연결
        tr.querySelector('.edit').addEventListener('click', () => openEditModal(product));
        tr.querySelector('.delete').addEventListener('click', () => deleteProduct(product.id));

        tbody.appendChild(tr);
    });
}

function openEditModal(product) {
    document.getElementById('edit-id').value = product.id;
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-description').value = product.description;
    document.getElementById('edit-imageUrl').value = product.imageUrl;
    document.getElementById('edit-stockQuantity').value = product.stockQuantity;
    document.getElementById('edit-active').value = product.active;
    document.getElementById('edit-category').value = product.category;

    document.getElementById('edit-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('edit-modal').classList.add('hidden');
}

async function deleteProduct(id) {
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    try {
        const res = await fetch(`http://localhost:8081/api/products/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            alert('삭제 성공!');
            fetchProducts();
        } else {
            alert('삭제 실패: ' + (await res.text()));
        }
    } catch (err) {
        alert('에러 발생: ' + err.message);
    }
}

// 모달 수정 저장
document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-id').value;

    const updatedProduct = {
        name: document.getElementById('edit-name').value,
        description: document.getElementById('edit-description').value,
        price: parseInt(document.getElementById('edit-price').value),
        imageUrl: document.getElementById('edit-imageUrl').value,
        stockQuantity: parseInt(document.getElementById('edit-stockQuantity').value),
        category: document.getElementById('edit-category').value,
        active: document.getElementById('edit-active').value === 'true',
        category: document.getElementById('edit-category').value
    };

    try {
        const res = await fetch(`http://localhost:8081/api/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        });

        if (res.ok) {
            alert('수정 성공!');
            closeModal();
            fetchProducts();
        } else {
            alert('수정 실패: ' + (await res.text()));
        }
    } catch (err) {
        alert('에러 발생: ' + err.message);
    }
});
fetchProducts();
// end /js/product-list.js
