// hamburger.js

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('header nav ul');

    if (!hamburger || !navList) return;

    // 햄버거 메뉴 클릭 시 nav에 active 클래스 toggle
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active'); // (선택) 아이콘 애니메이션용
    });

    // 메뉴 항목 클릭 시 메뉴 닫기 (모바일 UX 개선)
    navList.querySelectorAll('li a, li button').forEach((item) => {
        item.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});
// end hamburger.js
