let cart = [];

function addToCart(product, quantity) {
    const existingProductIndex = cart.findIndex(item => item.product.name === product.name);
    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartIcon = document.getElementById("cart-icon");

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.style.position = "relative";  // Necesario para que el botón de eliminar pueda posicionarse de forma absoluta.

        // Crear la imagen del producto
        const productImage = document.createElement("img");
        productImage.src = item.product.image;
        productImage.style.width = "50px";
        productImage.style.height = "50px";
        productImage.style.marginRight = "10px";

        // Crear el texto del producto
        const productText = document.createElement("span");
        productText.textContent = `${item.product.name} - $${item.product.price} x ${item.quantity}`;

        // Crear botón de eliminar
        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");  // Añadir clase para aplicar estilos desde CSS
        removeButton.innerHTML = '<img src="imagenes/eliminarnegro.png" style="width: 20px; height: 20px;"/>';
        removeButton.onclick = () => removeFromCart(index);

        // Agregar imagen, texto y botón al elemento del carrito
        cartItem.appendChild(productImage);
        cartItem.appendChild(productText);
        cartItem.appendChild(removeButton);

        cartItems.appendChild(cartItem);

        total += item.product.price * item.quantity;
    });


    totalPrice.textContent = total;
    cartIcon.classList.add("has-items");
    document.getElementById("cart-container").style.display = "block";
}


document.getElementById("checkout-button").onclick = function () {
    let cartText = "Tu pedido:\n";
    cart.forEach(item => {
        cartText += `${item.product.name} - $${item.product.price} x ${item.quantity}\n`;
    });

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    cartText += `\nTotal: $${total}`;
    
    const whatsappUrl = `https://wa.me/3136751943?text=${encodeURIComponent(cartText)}`;
    window.open(whatsappUrl, "_blank");
};
