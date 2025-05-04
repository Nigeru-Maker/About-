document.addEventListener("DOMContentLoaded", () => {
  // Tab buttons
  const dashboardTab = document.querySelector('.sidebar-menu a.active');
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

  // Extract tracking number from URL for Order Tracking
  const urlParams = new URLSearchParams(window.location.search);
  const trackingNoFromURL = urlParams.get('trackingNo');

  // Order Display
  function displayOrders() {
    const container = document.getElementById("orders-list");
    container.innerHTML = "";

    if (orders.length === 0) {
      container.textContent = "No orders yet.";
      return;
    }

    const matchingOrders = trackingNoFromURL
      ? orders.filter(order => order.trackingNo === trackingNoFromURL)
      : orders;

    if (matchingOrders.length === 0) {
      container.textContent = "No matching order found.";
      return;
    }

    matchingOrders.forEach(order => {
      const div = document.createElement("div");
      div.className = "order-entry";
      div.innerHTML = `
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Tracking No:</strong> ${order.trackingNo}</p>
        <p><strong>Total:</strong> ₱${order.total}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Time:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
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

  // Track Order Details (Tracking Page)
  const trackingNumberElement = document.getElementById('tracking-number');
  const orderDetailsSection = document.getElementById('order-details');
  const loadingElement = document.getElementById('loading');

  // Show loading indicator while fetching data
  loadingElement.style.display = 'block';

  // Simulate data fetching and processing
  setTimeout(() => {
    const order = orders.find(order => order.trackingNo === trackingNoFromURL);

    if (order) {
      // If order is found, display order details
      trackingNumberElement.textContent = trackingNoFromURL ? trackingNoFromURL : 'Tracking number missing';
      orderDetailsSection.innerHTML = `
        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Total:</strong> ₱${order.total}</p>
        <p><strong>Status:</strong> <span class="status ${order.status.toLowerCase()}">${order.status}</span></p>
        <p><strong>Order Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
      `;
    } else {
      // If no order is found, display error message
      orderDetailsSection.innerHTML = '<p class="error">No order found for this tracking number.</p>';
    }

    // Hide loading indicator
    loadingElement.style.display = 'none';
  }, 1000); // Simulate 1-second delay for fetching data

  // Optional: auto-load orders tab on page load
  showSection(ordersSection);
  displayOrders();
});
