window.onload = init;

function init() {
    const categoryMenu = document.getElementById("category-menu");
    const productsSection = document.getElementById("products-section");

    categories.forEach(category => {
        const categoryItem = document.createElement("li");
        const categoryLink = document.createElement("a");
        categoryLink.textContent = category.name;
        categoryLink.href = `#${category.name}`;
        categoryLink.onclick = (e) => {
            e.preventDefault();
            showProducts(category.products);
        };
        categoryItem.appendChild(categoryLink);
        categoryMenu.appendChild(categoryItem);
    });

    showProducts(categories[0].products);
}

function showProducts(products) {
    const productsSection = document.getElementById("products-section");
    productsSection.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productCardInner = document.createElement("div");
        productCardInner.classList.add("product-card-inner");

        const productCardFront = document.createElement("div");
        productCardFront.classList.add("product-card-front");

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.onclick = () => toggleFlip(productCardInner);

        const productTitle = document.createElement("h3");
        productTitle.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = `$${product.price}`;

        const selectButton = document.createElement("button");
        selectButton.textContent = "Seleccionar";
        selectButton.onclick = () => showProductDetails(product);

        productCardFront.appendChild(productImage);
        productCardFront.appendChild(productTitle);
        productCardFront.appendChild(productPrice);
        productCardFront.appendChild(selectButton);

        const productCardBack = document.createElement("div");
        productCardBack.classList.add("product-card-back");

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        const quantityLabel = document.createElement("p");
        quantityLabel.textContent = "Cantidad:";

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = 1;
        quantityInput.min = 1;

        const addToCartButton = document.createElement("button");
        addToCartButton.textContent = "Añadir al carrito";
        addToCartButton.onclick = () => {
            addToCart(product, parseInt(quantityInput.value));
            toggleFlip(productCardInner);
        };

        productCardBack.appendChild(productDescription);
        productCardBack.appendChild(quantityLabel);
        productCardBack.appendChild(quantityInput);
        productCardBack.appendChild(addToCartButton);

        productCardInner.appendChild(productCardFront);
        productCardInner.appendChild(productCardBack);

        productCard.appendChild(productCardInner);
        productsSection.appendChild(productCard);
    });
}

function toggleFlip(cardInner) {
    if (cardInner.style.transform === "rotateY(180deg)") {
        cardInner.style.transform = "rotateY(0deg)";
    } else {
        cardInner.style.transform = "rotateY(180deg)";
    }
}

function showProductDetails(product) {
    const detailsContent = document.getElementById("details-content");
    detailsContent.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <button onclick="addToCart(${JSON.stringify(product)}, 1)">Añadir al carrito</button>
    `;
    document.getElementById("product-details").classList.remove("hidden");
}

document.getElementById("close-details").onclick = function () {
    document.getElementById("product-details").classList.add("hidden");
};

document.getElementById("cart-icon").onclick = function () {
    document.getElementById("cart-container").style.display = "block";
};

document.getElementById("close-cart").onclick = function () {
    document.getElementById("cart-container").style.display = "none";
};
