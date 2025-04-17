document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();

    document.getElementById('confirm-status-btn').addEventListener('click', handleStatusUpdate);
});

let currentOrderIdForStatus = null;

// 주문 전체 조회
async function fetchOrders() {
    try {
        const res = await fetch('http://localhost:8083/api/orders'); // 실제 API로 수정
        if (!res.ok) throw new Error(`(${res.status}) 주문 목록 조회 실패`);

        const orders = await res.json();

        console.log('📦 서버 응답 데이터: ', orders);

        renderOrderTable(orders);
    } catch (err) {
        alert('에러 발생: ' + err.message);
    }
}

// 날짜 format
function formatDate(dateString) {
    const parsed = new Date(dateString);
    if (isNaN(parsed)) return '날짜 오류'; // 또는 그냥 빈 문자열 ''
    return parsed.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });
}

// 주문 테이블 렌더링
function renderOrderTable(orders) {
    const tbody = document.getElementById('order-table-body');
    tbody.innerHTML = '';

    orders.forEach((order) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
		  <td>${order.id}</td>
		  <td>${order.customerName}</td>
		  <td>${order.productName}</td>
		  <td>${order.quantity}</td>
		  <td>₩${order.totalPrice.toLocaleString()}</td>
		  <td>${formatDate(order.createdAt)}</td>
		  <td>${order.status}</td>
		  <td>
			<button class="btn update" onclick="updateStatus('${order.id}')">상태 변경</button>
			<button class="btn cancel" onclick="cancelOrder('${order.id}')">취소</button>
		  </td>
		`;
        tbody.appendChild(tr);
    });
}

// 상태 변경 모달 열기
function updateStatus(orderId) {
    currentOrderIdForStatus = orderId.toString();
    document.getElementById('status-order-id-text').innerText = `주문 ID: ${orderId}`;
    document.getElementById('status-modal').classList.remove('hidden');
}

// 모달 닫기
function closeStatusModal() {
    document.getElementById('status-modal').classList.add('hidden');
    currentOrderIdForStatus = null;
}

// 상태 변경 처리
async function handleStatusUpdate() {
    const newStatus = document.getElementById('status-select').value;

    console.log('전송할 주문 ID : ', currentOrderIdForStatus);
    console.log('전송할 상태 :', newStatus);

    try {
        const res = await fetch(
            `http://localhost:8083/api/orders/${currentOrderIdForStatus}/status?status=${newStatus}`,
            {
                method: 'PUT'
            }
        );

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`(${res.status}) 상태 변경 실패\n${errorText}`);
        }

        alert('상태 변경 성공!');
        closeStatusModal();
        fetchOrders();
    } catch (err) {
        alert('에러: ' + err.message);
    }
}

// 주문 취소 처리
async function cancelOrder(orderId) {
    if (!confirm('정말로 주문을 취소하시겠습니까?')) return;

    try {
        const res = await fetch(
            `http://localhost:8083/api/orders/${orderId}/status?status=CANCELLED`,
            {
                method: 'PUT'
            }
        );

        if (!res.ok) throw new Error(`(${res.status}) 주문 취소 실패`);

        alert('주문이 취소되었습니다.');
        fetchOrders();
    } catch (err) {
        alert('에러 발생: ' + err.message);
    }
}
