/*Author Prajit Shrestha*/
// Cart Management
const cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const closeCartButton = document.getElementById('close-cart');
const clearCartButton = document.getElementById('clear-cart');
const viewCartButton = document.getElementById('view-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart'); // For multiple products

// Add to Cart
addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    const productName = button.dataset.name;
    const productPrice = parseFloat(button.dataset.price);

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCartCount();
    alert(`${productName} added to the cart.`);
  });
});

// Update Cart Count
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

// View Cart
viewCartButton.addEventListener('click', () => {
  displayCartItems();
  toggleModal(cartModal, true);
});

// Close Cart
closeCartButton.addEventListener('click', () => {
  toggleModal(cartModal, false);
});

// Clear Cart
clearCartButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('The cart is already empty.');
    return;
  }

  cart.length = 0; // Clear all items in the cart
  updateCartCount();
  displayCartItems();
  alert('Your cart has been cleared.');
});

// Display Cart Items
function displayCartItems() {
  cartItemsElement.innerHTML = ''; // Clear previous items
  let total = 0;

  if (cart.length === 0) {
    cartItemsElement.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cart.forEach((item, index) => {
      const itemElement = document.createElement('li');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <div>
          <span>${item.name} (x${item.quantity})</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        <button class="remove-item" data-index="${index}">Remove</button>
      `;
      cartItemsElement.appendChild(itemElement);
      total += item.price * item.quantity;
    });
  }

  cartTotalElement.textContent = total.toFixed(2);

  // Attach remove event listeners to buttons
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index, 10);
      removeItemFromCart(index);
    });
  });
}

// Remove Item from Cart
function removeItemFromCart(index) {
  if (index >= 0 && index < cart.length) {
    const removedItem = cart.splice(index, 1)[0];
    updateCartCount();
    displayCartItems();
    alert(`${removedItem.name} has been removed from the cart.`);
  }
}

// Toggle Modal Visibility
function toggleModal(modal, show) {
  if (show) {
    modal.classList.remove('hidden');
    modal.classList.add('visible');
  } else {
    modal.classList.remove('visible');
    modal.classList.add('hidden');
  }
}

// Update Product Details Dynamically
function updateProduct(imageSrc, productName, productPrice) {
  const mainImage = document.querySelector('.main-image');
  const productNameElement = document.getElementById('product-name');
  const productPriceElement = document.getElementById('product-price');
  const addToCartButton = document.querySelector('#add-to-cart');

  if (!mainImage || !productNameElement || !productPriceElement || !addToCartButton) {
    console.error('Missing elements for product update.');
    return;
  }

  mainImage.src = imageSrc;
  productNameElement.textContent = productName;
  productPriceElement.textContent = `Price: $${productPrice.toFixed(2)}`;
  addToCartButton.dataset.name = productName;
  addToCartButton.dataset.price = productPrice.toFixed(2);
  addToCartButton.dataset.id = productName.toLowerCase().replace(/\s+/g, '-');
}

// Review Modal Management
const reviewModal = document.getElementById('review-modal');
const writeReviewButton = document.getElementById('write-review-button');
const closeReviewModalButton = document.getElementById('close-review-modal');
const reviewForm = document.getElementById('review-form');
const reviewSection = document.querySelector('.customer-reviews');

// Open Review Modal
writeReviewButton.addEventListener('click', () => {
  toggleModal(reviewModal, true);
});

// Close Review Modal
closeReviewModalButton.addEventListener('click', () => {
  toggleModal(reviewModal, false);
});

// Submit Review
reviewForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('reviewer-name').value.trim();
  const reviewText = document.getElementById('review-text').value.trim();
  const rating = document.getElementById('review-rating').value;

  // Validate inputs
  if (!name || !reviewText || !rating) {
    alert('Please fill out all fields.');
    return;
  }

  // Add Review
  const newReview = document.createElement('div');
  newReview.classList.add('review');
  newReview.innerHTML = `
    <p><strong>${name}:</strong> "${reviewText}"</p>
    <p>Rating: ${'⭐'.repeat(rating)}</p>
  `;
  reviewSection.appendChild(newReview);

  // Reset Form and Close Modal
  reviewForm.reset();
  toggleModal(reviewModal, false);
  alert('Thank you for your review!');
});
