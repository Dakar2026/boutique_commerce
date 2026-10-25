/* =====================================
   1. CATALOGUE DES 12 PRODUITS
===================================== */

const products = [
    {
        id: 1,
        name: "Casque Bluetooth",
        price: 15000,
        category: "electronique",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
        description: "Un son immersif pour écouter votre musique."
    },
    {
        id: 2,
        name: "Montre connectée",
        price: 25000,
        category: "accessoires",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        description: "Une montre élégante pour votre quotidien."
    },
    {
        id: 3,
        name: "Smartphone",
        price: 85000,
        category: "electronique",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
        description: "Restez connecté partout où vous allez."
    },
    {
        id: 4,
        name: "Sac à dos",
        price: 18000,
        category: "mode",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
        description: "Un sac pratique pour vos déplacements."
    },
    {
        id: 5,
        name: "Chaussures sport",
        price: 22000,
        category: "mode",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
        description: "Des chaussures confortables et modernes."
    },
    {
        id: 6,
        name: "Lunettes de soleil",
        price: 8000,
        category: "accessoires",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        description: "La touche finale pour votre style."
    },
    {
        id: 7,
        name: "Lampe de bureau",
        price: 12000,
        category: "maison",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
        description: "Un éclairage agréable pour travailler."
    },
    {
        id: 8,
        name: "Appareil photo",
        price: 95000,
        category: "electronique",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
        description: "Immortalisez vos meilleurs souvenirs."
    },
    {
        id: 9,
        name: "Chaise moderne",
        price: 35000,
        category: "maison",
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
        description: "Une chaise élégante pour votre intérieur."
    },
    {
        id: 10,
        name: "T-shirt classique",
        price: 7000,
        category: "mode",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        description: "Un essentiel simple et facile à porter."
    },
    {
        id: 11,
        name: "Enceinte portable",
        price: 20000,
        category: "electronique",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
        description: "Profitez de votre musique avec vos proches."
    },
    {
        id: 12,
        name: "Sac à main",
        price: 16000,
        category: "accessoires",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        description: "Un sac élégant pour toutes les occasions."
    }
];


/* =====================================
   2. RÉCUPÉRER LES ÉLÉMENTS HTML
===================================== */

const productsGrid = document.getElementById("products-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const productsCount = document.getElementById("products-count");
const noResults = document.getElementById("no-results");

const openCartButton = document.getElementById("open-cart");
const closeCartButton = document.getElementById("close-cart");
const cartPanel = document.getElementById("cart-panel");
const cartOverlay = document.getElementById("cart-overlay");

const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const emptyCartMessage = document.getElementById("empty-cart");

const cartSubtotal = document.getElementById("cart-subtotal");
const deliveryFee = document.getElementById("delivery-fee");
const cartTotal = document.getElementById("cart-total");

const checkoutButton = document.getElementById("checkout-button");
const checkoutDialog = document.getElementById("checkout-dialog");
const closeCheckoutButton = document.getElementById("close-checkout");
const checkoutForm = document.getElementById("checkout-form");
const orderSummary = document.getElementById("order-summary");
const orderMessage = document.getElementById("order-message");


/* =====================================
   3. PRÉPARER LE PANIER
===================================== */

function loadCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem("smartshop-cart")
        );

        if (!Array.isArray(savedCart)) {
            return [];
        }

        return savedCart.filter(item =>
            item &&
            Number.isInteger(item.id) &&
            products.some(product => product.id === item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            item.quantity <= 99
        );
    } catch (error) {
        return [];
    }
}

let cart = loadCart();


/* =====================================
   4. FORMATER LES PRIX EN FCFA
===================================== */

function formatPrice(price) {
    return new Intl.NumberFormat("fr-FR", {
        style: "decimal",
        maximumFractionDigits: 0
    }).format(price) + " FCFA";
}


/* =====================================
   5. AFFICHER LES PRODUITS
===================================== */

function displayProducts(list = products) {

    productsGrid.innerHTML = "";

    productsCount.textContent =
        `${list.length} produit${list.length > 1 ? "s" : ""} disponible${list.length > 1 ? "s" : ""}`;

    noResults.hidden = list.length !== 0;

    list.forEach(product => {

        const article = document.createElement("article");

        article.className = "product-card";

        const imageContainer = document.createElement("div");
        imageContainer.className = "product-image";

        const categoryBadge = document.createElement("span");
        categoryBadge.className = "product-category";
        categoryBadge.textContent = getCategoryName(product.category);

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.addEventListener("error", () => {
            imageContainer.style.background = "#e6e0ff";
            image.style.display = "none";
        });

        imageContainer.append(categoryBadge, image);

        const info = document.createElement("div");
        info.className = "product-info";

        const title = document.createElement("h3");
        title.textContent = product.name;

        const description = document.createElement("p");
        description.className = "product-description";
        description.textContent = product.description;

        const bottom = document.createElement("div");
        bottom.className = "product-bottom";

        const price = document.createElement("span");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const addButton = document.createElement("button");
        addButton.className = "add-to-cart";
        addButton.type = "button";
        addButton.textContent = "＋ Ajouter au panier";

        addButton.addEventListener("click", () => {
            addToCart(product.id);
        });

        bottom.append(price, addButton);

        info.append(title, description, bottom);

        article.append(imageContainer, info);

        productsGrid.appendChild(article);
    });
}


/* =====================================
   6. TRADUIRE LES CATÉGORIES
===================================== */

function getCategoryName(category) {

    const categories = {
        electronique: "Électronique",
        mode: "Mode",
        maison: "Maison",
        accessoires: "Accessoires"
    };

    return categories[category] || category;
}


/* =====================================
   7. RECHERCHE ET FILTRES
===================================== */

function filterProducts() {

    const searchText = searchInput.value
        .trim()
        .toLocaleLowerCase("fr");

    const selectedCategory = categoryFilter.value;

    const filteredProducts = products.filter(product => {

        const matchesName = product.name
            .toLocaleLowerCase("fr")
            .includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesName && matchesCategory;
    });

    displayProducts(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);

categoryFilter.addEventListener("change", filterProducts);


/* =====================================
   8. SAUVEGARDER LE PANIER
===================================== */

function saveCart() {
    try {
        localStorage.setItem(
            "smartshop-cart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Impossible de sauvegarder le panier.", error);
    }
}


/* =====================================
   9. AJOUTER UN PRODUIT AU PANIER
===================================== */

function addToCart(productId) {

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {

        if (existingItem.quantity >= 99) {
            alert("La quantité maximale est de 99 articles.");
            return;
        }

        existingItem.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

}


/* =====================================
   10. MODIFIER LES QUANTITÉS
===================================== */

function changeQuantity(productId, change) {

    const item = cart.find(
        product => product.id === productId
    );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== productId
        );

    } else if (item.quantity > 99) {

        item.quantity = 99;

    }

    saveCart();
    updateCart();
}


/* =====================================
   11. SUPPRIMER UN ARTICLE
===================================== */

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();
    updateCart();
}


/* =====================================
   12. AFFICHER LE PANIER
===================================== */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = cart.reduce((total, item) => {

        const product = products.find(
            product => product.id === item.id
        );

        return total + (product ? product.price * item.quantity : 0);

    }, 0);

    // Livraison simulée gratuite.
    const delivery = 0;

    const total = subtotal + delivery;

    cartCount.textContent = totalQuantity;

    cartSubtotal.textContent = formatPrice(subtotal);
    deliveryFee.textContent = formatPrice(delivery);
    cartTotal.textContent = formatPrice(total);

    emptyCartMessage.hidden = cart.length !== 0;

    checkoutButton.disabled = cart.length === 0;

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) {
            return;
        }

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        const details = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.className = "cart-item-price";
        price.textContent = formatPrice(
            product.price * item.quantity
        );

        const actions = document.createElement("div");
        actions.className = "cart-item-actions";

        const decreaseButton = document.createElement("button");
        decreaseButton.className = "quantity-button";
        decreaseButton.type = "button";
        decreaseButton.textContent = "−";
        decreaseButton.setAttribute(
            "aria-label",
            `Diminuer la quantité de ${product.name}`
        );

        decreaseButton.addEventListener("click", () => {
            changeQuantity(product.id, -1);
        });

        const quantity = document.createElement("span");
        quantity.className = "quantity-value";
        quantity.textContent = item.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.className = "quantity-button";
        increaseButton.type = "button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute(
            "aria-label",
            `Augmenter la quantité de ${product.name}`
        );

        increaseButton.addEventListener("click", () => {
            changeQuantity(product.id, 1);
        });

        const removeButton = document.createElement("button");
        removeButton.className = "remove-item";
        removeButton.type = "button";
        removeButton.textContent = "Supprimer";

        removeButton.addEventListener("click", () => {
            removeFromCart(product.id);
        });

        actions.append(
            decreaseButton,
            quantity,
            increaseButton,
            removeButton
        );

        details.append(title, price, actions);

        cartItem.appendChild(details);

        cartItemsContainer.appendChild(cartItem);
    });

}


/* =====================================
   13. OUVRIR ET FERMER LE PANIER
===================================== */

function openCart() {

    cartPanel.classList.add("open");

    cartPanel.setAttribute("aria-hidden", "false");
    cartPanel.inert = false;

    cartOverlay.hidden = false;

    document.body.classList.add("cart-open");

    closeCartButton.focus();
}

function closeCart() {

    cartPanel.classList.remove("open");

    cartPanel.setAttribute("aria-hidden", "true");
    cartPanel.inert = true;

    cartOverlay.hidden = true;

    document.body.classList.remove("cart-open");

    openCartButton.focus();
}

openCartButton.addEventListener("click", openCart);

closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {

    if (event.key === "Escape" && cartPanel.classList.contains("open")) {
        closeCart();
    }

});


/* =====================================
   14. PRÉPARER LA COMMANDE
===================================== */

function prepareOrderSummary() {

    orderSummary.innerHTML = "";

    cart.forEach(item => {

        const product = products.find(
            product => product.id === item.id
        );

        if (!product) {
            return;
        }

        const line = document.createElement("p");

        const name = document.createElement("span");
        name.textContent = `${product.name} × ${item.quantity}`;

        const price = document.createElement("span");
        price.textContent = formatPrice(
            product.price * item.quantity
        );

        line.append(name, price);

        orderSummary.appendChild(line);
    });

    const totalLine = document.createElement("p");

    const totalLabel = document.createElement("span");
    totalLabel.textContent = "Total à payer";

    const totalValue = document.createElement("span");
    totalValue.textContent = cartTotal.textContent;

    totalLine.append(totalLabel, totalValue);

    orderSummary.appendChild(totalLine);
}


/* =====================================
   15. OUVRIR LA FENÊTRE DE COMMANDE
===================================== */

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        return;
    }

    prepareOrderSummary();

    orderMessage.textContent = "";

    closeCart();

    checkoutDialog.showModal();

});


/* =====================================
   16. FERMER LA FENÊTRE DE COMMANDE
===================================== */

closeCheckoutButton.addEventListener("click", () => {
    checkoutDialog.close();
});

checkoutDialog.addEventListener("click", event => {

    if (event.target === checkoutDialog) {
        checkoutDialog.close();
    }

});


/* =====================================
   17. VALIDER LA COMMANDE SIMULÉE
===================================== */

checkoutForm.addEventListener("submit", event => {

    event.preventDefault();

    if (cart.length === 0) {

        orderMessage.textContent =
            "Votre panier est vide.";

        return;
    }

    const customerName = document
        .getElementById("customer-name")
        .value
        .trim();

    if (customerName.length < 2) {

        orderMessage.textContent =
            "Veuillez saisir votre nom complet.";

        return;
    }

    const orderNumber = "SS-" + Date.now().toString().slice(-8);

    orderMessage.textContent =
        `Merci ${customerName} ! Votre commande simulée ${orderNumber} a été validée. Total : ${cartTotal.textContent}. Aucun paiement réel n'a été effectué.`;

    // Vider le panier après la commande simulée.
    cart = [];

    saveCart();
    updateCart();

    checkoutForm.reset();

});


/* =====================================
   18. LANCEMENT DE LA BOUTIQUE
===================================== */

displayProducts();

updateCart();