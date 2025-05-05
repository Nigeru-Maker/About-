document.addEventListener('DOMContentLoaded', function () {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const ordersList = document.getElementById('orders-list');

  if (orders.length === 0) {
    ordersList.innerHTML = '<p>No orders found.</p>';
    return;
  }

  let html = '<table><tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>Total</th><th>Tracking No.</th></tr>';
  orders.forEach(order => {
    html += `<tr>
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>${order.phone}</td>
      <td>${order.address}</td>
      <td>₱${order.total}</td>
      <td>${order.trackingNumber}</td>
    </tr>`;
  });
  html += '</table>';
  ordersList.innerHTML = html;
});
