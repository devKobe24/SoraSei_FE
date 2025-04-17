document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();

    document.getElementById('searchBtn').addEventListener('click', () => {
        const keyword = document.getElementById('searchInput').value.trim().toLowerCase();
        filterUsers(keyword);
    });
});

let allUsers = [];

async function fetchUsers() {
    try {
        const res = await fetch('http://localhost:8082/api/users');
        if (!res.ok) throw new Error('회원 목록을 불러오지 못했습니다.');
        allUsers = await res.json();
        renderUserTable(allUsers);
    } catch (err) {
        alert('에러: ' + err.message);
    }
}

function renderUserTable(users) {
    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = '';

    users.forEach((user) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
		<td>${user.id}</td>
		<td>${user.name}</td>
		<td>${user.email}</td>
		<td>${new Date(user.createdAt).toLocaleDateString()}</td>
		<td>${user.active ? '활성' : '비활성'}</td>
		<td>
		  <button class="btn detail" onclick="viewDetail(${user.id})">상세</button>
		  <button class="btn role" onclick="openRoleModal(${user.id}, '${user.name}', '${user.role}')">권한</button>
		  <button class="btn delete" onclick="deleteUser(${user.id})">삭제</button>
		</td>
	  `;
        tbody.appendChild(tr);
    });
}

function filterUsers(keyword) {
    const filtered = allUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword)
    );
    renderUserTable(filtered);
}

function viewDetail(id) {
    window.location.href = `./user-detail.html?id=${id}`;
}

function openRoleModal(id, name, currentRole) {
    document.getElementById('role-modal').classList.remove('hidden');
    document.getElementById('role-user-name').innerText = `회원: ${name}`;
    document.getElementById('role-select').value = currentRole;

    document.getElementById('confirm-role-btn').onclick = async () => {
        const newRole = document.getElementById('role-select').value;
        try {
            const res = await fetch(`http://localhost:8081/api/users/${id}/role`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });

            if (res.ok) {
                alert('권한 변경 성공!');
                closeRoleModal();
                fetchUsers();
            } else {
                alert('권한 변경 실패');
            }
        } catch (err) {
            alert('에러: ' + err.message);
        }
    };
}

function closeRoleModal() {
    document.getElementById('role-modal').classList.add('hidden');
}

async function deleteUser(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
        const res = await fetch(`http://localhost:8081/api/users/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            alert('삭제 성공!');
            fetchUsers();
        } else {
            alert('삭제 실패');
        }
    } catch (err) {
        alert('에러 발생: ' + err.message);
    }
}
