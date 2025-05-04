function loadOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const tbody = document.getElementById("orderTableBody");
  tbody.innerHTML = "";

  orders.forEach(order => {
    const row = `
      <tr>
        <td>${order.id}</td>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.status}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

window.onload = loadOrders;
