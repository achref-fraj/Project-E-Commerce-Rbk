///////////////////////////////////////////////Add to Cart////////////////////////////////////////////////////

// Function to add products to the cart
function addToCart(productName, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ productName, price });
  localStorage.setItem('cart', JSON.stringify(cart));

  // Update cart count on homepage
  updateCartCount();
}

// Function to update the cart count on homepage
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelector('.cart-count').textContent = cart.length;
}

// Function to load cart items from localStorage and display them on the panier page
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  let totalPrice = 0;

  // Clear previous cart items
  cartItemsContainer.innerHTML = '';

  // Loop through the cart and display items
  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <h3>${item.productName}</h3>
      <p>Price: $${item.price}</p>
    `;
    cartItemsContainer.appendChild(itemElement);

    totalPrice += item.price; // Accumulate the total price
  });

  // Update the total price
  document.getElementById('total-price').textContent = totalPrice.toFixed(2); // Ensure 2 decimal places
}

// Call loadCart function on page load for panier.html
if (window.location.pathname.includes("panier.html")) {
  window.onload = loadCart;
}

///////////////////////////////////////////////Carousel/////////////////////////////////////////////////////

let currentIndex = 0;

const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
  updateCarousel();
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
  updateCarousel();
});

function updateCarousel() {
  const carouselWidth = images[0].clientWidth;
  document.querySelector('.carousel-images').style.transform = `translateX(-${currentIndex * carouselWidth}px)`;
}

// Auto-slide functionality (optional)
setInterval(() => {
  currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
  updateCarousel();
}, 3000); // Adjust the time interval as needed













///////////////////////////////////////////////////////////filter//////////////////////////////////////////


///////////////////////////////////////////////Search Functionality////////////////////////////////////////////////////

// Function to filter products by name
function filterProducts() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase(); // Get the search input
  const allProducts = document.querySelectorAll('.card'); // Get all product cards
  let filteredProducts = 0; // Counter for filtered products

  allProducts.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase(); // Get the product name
    if (productName.includes(searchTerm)) {
      product.style.display = 'block'; // Show product if it matches search term
      filteredProducts++;
    } else {
      product.style.display = 'none'; // Hide product if it doesn't match search term
    }
  });

  if (filteredProducts === 0) {
    alert("No products found!"); // Alert if no products match the search term
  }
}

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', filterProducts);

// Optionally, add event listener to search input for real-time search as the user types
document.getElementById('search-input').addEventListener('input', filterProducts);
