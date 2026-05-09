document.addEventListener('DOMContentLoaded', () => {
    const products = window.products;
    if (!products) return;

    // Dynamic Product Loading for Category Pages
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        const category = productGrid.dataset.category;
        const filteredProducts = category === 'all' 
            ? products.slice(0, 8) 
            : products.filter(p => p.category === category);
        
        renderProducts(filteredProducts, productGrid);
    }

    // Dynamic Product Detail Page
    const detailContainer = document.getElementById('product-detail');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products.find(p => p.id === productId);
        
        if (product) {
            renderProductDetail(product);
        }
    }
});

function renderProducts(items, container) {
    container.innerHTML = items.map(product => `
        <div class="product-card">
            <a href="product-detail.html?id=${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">NT$ ${product.price.toLocaleString()}</div>
                </div>
            </a>
        </div>
    `).join('');
}

function renderProductDetail(product) {
    document.title = `${product.name} | Premium Fashion`;
    const container = document.getElementById('product-detail');
    container.innerHTML = `
        <div class="product-detail-container container">
            <div class="detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="detail-info">
                <div class="product-category">${product.category}</div>
                <h1>${product.name}</h1>
                <div class="detail-price">NT$ ${product.price.toLocaleString()}</div>
                <p class="detail-desc">${product.description}</p>
                <a href="#" class="btn">加入購物車</a>
                <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px;">
                    <p><strong>材質:</strong> 優質進口面料</p>
                    <p><strong>保養:</strong> 建議乾洗或低溫手洗</p>
                </div>
            </div>
        </div>
    `;
}
