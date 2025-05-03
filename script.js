document.addEventListener("DOMContentLoaded", () => {
  // Tab buttons
  const ordersTab = document.getElementById("orders-tab");
  const productsTab = document.getElementById("products-tab");
  const customersTab = document.getElementById("customers-tab");

  // Sections
  const ordersSection = document.getElementById("orders-section");
  const productsSection = document.getElementById("products-section");
  const customersSection = document.getElementById("customers-section");

  // Load dummy data (you can replace with real data from localStorage or backend)
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const comments = JSON.parse(localStorage.getItem("customerComments")) || [];

  // Helper: show only one section
  function showSection(section) {
    ordersSection.style.display = "none";
    productsSection.style.display = "none";
    customersSection.style.display = "none";

    section.style.display = "block";
  }

  // Handle tab clicks
  if (ordersTab) {
    ordersTab.addEventListener("click", () => {
      showSection(ordersSection);
      displayOrders();
    });
  }

  if (productsTab) {
    productsTab.addEventListener("click", () => {
      showSection(productsSection);
      displayProducts();
    });
  }

  if (customersTab) {
    customersTab.addEventListener("click", () => {
      showSection(customersSection);
      displayComments();
    });
  }

  // Display Orders
  function displayOrders() {
    const container = document.getElementById("orders-list");
    container.innerHTML = "";
    if (orders.length === 0) {
      container.textContent = "No orders yet.";
      return;
    }
    orders.forEach(order => {
      const div = document.createElement("div");
      div.className = "order-entry";
      div.innerHTML = `
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Tracking No:</strong> ${order.trackingNo}</p>
        <p><strong>Total:</strong> ₱${order.total}</p>
        <hr>
      `;
      container.appendChild(div);
    });
  }

  // Display Products
  function displayProducts() {
    const container = document.getElementById("products-list");
    container.innerHTML = "";
    if (products.length === 0) {
      container.textContent = "No products available.";
      return;
    }
    products.forEach(product => {
      const div = document.createElement("div");
      div.className = "product-entry";
      div.innerHTML = `
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> ₱${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
        <button>Edit</button>
        <hr>
      `;
      container.appendChild(div);
    });
  }

  // Display Comments
  function displayComments() {
    const container = document.getElementById("comments-list");
    container.innerHTML = "";
    if (comments.length === 0) {
      container.textContent = "No comments yet.";
      return;
    }
    comments.forEach(comment => {
      const div = document.createElement("div");
      div.className = "comment-entry";
      div.innerHTML = `
        <p><strong>${comment.user}:</strong> ${comment.text}</p>
        <hr>
      `;
      container.appendChild(div);
    });
  }

  // Optional: auto-load orders tab on page load
  showSection(ordersSection);
  displayOrders();
});
