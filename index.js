document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const shopSection = document.getElementById('shop-section');
    shopSection.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('box');

        productCard.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="description">
                <h3>${product.title}</h3>
                <p>${product.description.slice(0, 100)}...</p>
                <h4>$${product.price}</h4>
                <button class="buy-button add-cart-btn">Add to Cart</button>
                <button class="buy-button more-info-btn" data-product-id="${product.id}">More Info</button>
            </div>
        `;

        shopSection.appendChild(productCard);
    });

    
    document.querySelectorAll('.more-info-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.getAttribute('data-product-id');
            fetchProductDetails(productId);
        });
    });
}

function fetchProductDetails(productId) {
    
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            showProductDetails(product);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
}

function showProductDetails(product) {
    
    const shopSection = document.getElementById('shop-section');
    
    
    shopSection.innerHTML = `
        <div class="box">
            <div class="image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="description">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <h4>$${product.price}</h4>
                <button class="buy-button add-cart-btn">Add to Cart</button>
                <button class="buy-button go-back-btn">Go Back</button>
            </div>
        </div>
    `;

    
    document.querySelector('.go-back-btn').addEventListener('click', () => {
        fetchProducts();
    });
}
