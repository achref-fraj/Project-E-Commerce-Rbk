
  //Panier
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

  if (selectedProduct) {
   
    document.getElementById('product-image').src = selectedProduct.image;
    document.getElementById('product-name').textContent = selectedProduct.name;
    document.getElementById('product-price').textContent = selectedProduct.price.toFixed(2);
    document.getElementById('product-quantity').textContent = selectedProduct.quantity;
    document.getElementById('total-price').textContent = (selectedProduct.price * selectedProduct.quantity).toFixed(2);
  } else {
    document.body.innerHTML = '<p>No product selected for payment.</p>';
  }
