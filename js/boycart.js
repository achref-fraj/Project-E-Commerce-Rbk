var cart = JSON.parse(localStorage.getItem('cart')) || []; // emty array , and lord cart from localstorage

// display the cart 
function showCart() {
  const modal = document.getElementById('cart-modal');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  
  cartItemsContainer.innerHTML = '';

  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}" />
        </div>
        <div class="cart-item-details">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">$${item.price ? item.price.toFixed(2) : '0.00'}</p>
          <div class="quantity-controls">
            <button class="decrease-quantity" data-index="${index}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-quantity" data-index="${index}">+</button>
          </div>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemElement);
    });
  }

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + (item.price ? item.price * item.quantity : 0), 0);
  cartTotalElement.textContent = `$${total.toFixed(2)}`;


  modal.style.display = 'flex';

  // Attach event listeners for quantity controls and remove buttons
  attachEventListeners();
}

// Function to attach event listeners for quantity controls and remove buttons
function attachEventListeners() {
  // Decrease quantity
  document.querySelectorAll('.decrease-quantity').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1); // Remove item if quantity is 1
      }
      updateCart();
    });
  });

  // Increase quantity
  document.querySelectorAll('.increase-quantity').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      cart[index].quantity += 1;
      updateCart();
    });
  });

  // Remove item
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (event) => {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Add item to the cart
function addToCart(productName, productPrice, productImage) {
  const product = {
    name: productName,
    price: productPrice,
    quantity: 1,
    image: productImage,
  };

  const existingProduct = cart.find((item) => item.name === productName);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push(product);
  }

  updateCart();
}

// Update the cart count on the cart icon
function updateCartCount() {
  const cartCountElement = document.querySelector('.cart-count');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

// Show the cart modal when the cart icon is clicked
document.querySelector('.cart a').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent default link behavior
  showCart();
});

// Close the cart modal by clicking outside the modal content
document.getElementById('cart-modal').addEventListener('click', (event) => {
  if (event.target === document.getElementById('cart-modal')) {
    document.getElementById('cart-modal').style.display = 'none';
  }
});

// Update the cart (refresh the display) and save to localStorage
function updateCart() {
  // Update cart count
  updateCartCount();

  // Refresh cart modal if it is open
  if (document.getElementById('cart-modal').style.display === 'flex') {
    showCart();
  }

  // Save updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize the cart count when the page loads
updateCartCount();
