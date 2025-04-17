// header-loader.js
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.getElementById('admin-header');

    if (headerContainer) {
        fetch('/admin/common/header.html')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('헤더 파일을 불러오지 못했습니다.');
                }
                return res.text();
            })
            .then((data) => {
                headerContainer.innerHTML = data;
            })
            .catch((err) => {
                console.error('헤더 로딩 실패:', err);
            });
    } else {
        console.warn('admin-header ID를 가진 요소가 존재하지 않습니다.');
    }
});
// end header-loader.js
