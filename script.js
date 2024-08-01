document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    // Add event listeners to 'Add to Cart' buttons
    const addToCartButtons = document.querySelectorAll('.product-item button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productItem = e.target.closest('.product-item');
            const productName = productItem.querySelector('h3').innerText;
            const productPrice = productItem.querySelector('p').innerText;

            const product = {
                name: productName,
                price: productPrice
            };

            cart.push(product);
            updateCartCount();
            alert(`${productName} has been added to the cart.`);
        });
    });

    // Function to update the cart count
    function updateCartCount() {
        const cartCount = cart.length;
        const cartIcon = document.querySelector('.navbar a[href="cart.html"] img');
        cartIcon.setAttribute('data-count', cartCount);
        cartIcon.dataset.count = cartCount; // For custom styling based on cart count
    }
});
// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.price}</p>
                <button class="delete-item" data-index="${index}">Delete</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-item');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const itemIndex = e.target.dataset.index;
                cart.splice(itemIndex, 1);
                saveCart();
                renderCartItems();
                updateCartCount();
            });
        });
    }
}

// Add event listeners to 'Add to Cart' buttons
const addToCartButtons = document.querySelectorAll('.product-item button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productItem = e.target.closest('.product-item');
        const productName = productItem.querySelector('h3').innerText;
        const productPrice = productItem.querySelector('p').innerText;

        const product = {
            name: productName,
            price: productPrice
        };

        cart.push(product);
        saveCart();
        updateCartCount();
        alert(`${productName} has been added to the cart.`);
    });


// Event listener for 'Keep Shopping' button
const keepShoppingButton = document.getElementById('keep-shopping');
if (keepShoppingButton) {
    keepShoppingButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Event listener for 'Buy Now' button
const buyNowButton = document.getElementById('buy-now');
if (buyNowButton) {
    buyNowButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        // Implement checkout functionality here
    });
}

// Initial render of cart items
renderCartItems();
updateCartCount();
});
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const slideWidth = slides[0].getBoundingClientRect().width;

    let slideIndex = 0;

    function moveToSlide(currentIndex) {
        const amountToMove = -slideWidth * currentIndex;
        track.style.transform = `translateX(${amountToMove}px)`;
    }

    function autoSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        moveToSlide(slideIndex);
    }

    setInterval(autoSlide, 3000);
});