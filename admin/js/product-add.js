//	product-add.js
const form = document.getElementById('product-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 썸네일 개별 파일 수
    const thumbnailInputs = ['thumbnail1', 'thumbnail2', 'thumbnail3', 'thumbnail4', 'thumbnail5'];
    let selectedFiles = [];

    for (let id of thumbnailInputs) {
        const fileInput = document.getElementById(id);
        if (fileInput && fileInput.files.length > 0) {
            selectedFiles.push(fileInput.files[0]);
        }
    }

    if (selectedFiles.length < 2 || selectedFiles.length > 5) {
        alert('썸네일은 최소 2장, 최대 5장까지 등록 가능합니다.');
        return;
    }

    // Step 1: 썸네일 이미지 S3 업로드
    const uploadFormData = new FormData();
    selectedFiles.forEach((file) => uploadFormData.append('files', file));

    let thumbnailUrls = [];

    try {
        const uploadRes = await fetch('http://localhost:8081/api/uploads', {
            method: 'POST',
            body: uploadFormData
        });

        if (!uploadRes.ok) throw new Error('이미지 업로드 실패');

        thumbnailUrls = await uploadRes.json(); // 배열 형태로 URL 받음
    } catch (err) {
        alert('S3 업로드 중 오류 발생: ' + err.message);
        return;
    }

    // Step 2: 상품 정보 백엔드 전송

    const productData = {
        name: document.getElementById('name').value,
        price: parseInt(document.getElementById('price').value),
        description: document.getElementById('description').value,
        stockQuantity: parseInt(document.getElementById('stockQuantity').value),
        active: document.getElementById('active').value === true,
        category: document.getElementById('category').value,
        imageUrl: thumbnailUrls[0], // 첫번째 이미지가 대표 이미지
        thumbnails: thumbnailUrls
    };

    try {
        const res = await fetch('http://localhost:8081/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        if (res.ok) {
            alert('상품 등록 성공!');
            form.reset();
        } else {
            const error = await res.text();
            alert('등록 실패: ' + error);
        }
    } catch (err) {
        alert('상품 등록 중 에러 발생: ' + err.message);
    }
});
//	end product-add.js
