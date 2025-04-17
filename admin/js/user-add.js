document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: document.getElementById('role').value
        };

        try {
            const res = await fetch('http://localhost:8082/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                alert('회원 등록 성공!');
                window.location.href = './user-list.html'; // 등록 후 목록 이동
            } else {
                const error = await res.text();
                alert('등록 실패: ' + error);
            }
        } catch (err) {
            alert('에러 발생: ' + err.message);
        }
    });
});
