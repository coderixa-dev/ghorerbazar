// ========================================
//   Hero Swiper
// ========================================
const heroSwiper = new Swiper(".hero-swiper", {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


const categoriesSwiper = new Swiper(".categories-swiper", {

    slidesPerView: 2,

    spaceBetween: 15,

    loop: true,

    speed: 700,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },

    navigation: {
        nextEl: ".categories-button-next",
        prevEl: ".categories-button-prev",
    },

    breakpoints: {

        480: {
            slidesPerView: 3,
            spaceBetween: 15,
        },

        768: {
            slidesPerView: 5,
            spaceBetween: 20,
        },

        1200: {
            slidesPerView: 8,
            spaceBetween: 20,
        },

    },

});



// ========================================
//   Our Brands Swiper
// ========================================
const brandsSwiper = new Swiper(".brands-swiper", {
    slidesPerView: 2,
    spaceBetween: 16,
    pagination: {
        el: ".brands-pagination",
        clickable: true,
    },
    breakpoints: {
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
    },
});

// ========================================
//   Products Swiper (All Natural Honey)
// ========================================
const productsSwiper = new Swiper(".products-swiper", {
    slidesPerView: 1.5,
    spaceBetween: 16,
    pagination: {
        el: ".products-pagination",
        clickable: true,
    },
    breakpoints: {
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        992: { slidesPerView: 4 },
        1200: { slidesPerView: 5 },
    },
});


// ========================================
//   Just For You - Load More
// ========================================
const loadMoreBtn = document.getElementById("loadMoreBtn");

if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
        const hiddenProducts = document.querySelectorAll(".more-product.d-none");

        hiddenProducts.forEach(function (item) {
            item.classList.remove("d-none");
        });

        // Shob product dekhano hoye gele button lucaiye felo
        loadMoreBtn.classList.add("is-hidden");
    });
}


// ========================================
//   Customer Reviews Swiper
// ========================================
const reviewsSwiper = new Swiper(".reviews-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".reviews-pagination",
        clickable: true,
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 },
    },
});


// ========================================
//   Scroll To Top Button + Progress Ring
// ========================================
const scrollTopBtn = document.getElementById("scroll-top");
const progressRing = document.querySelector(".scroll-progress-ring__fill");

if (scrollTopBtn && progressRing) {

    const radius = progressRing.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    progressRing.style.strokeDasharray = `${circumference}`;
    progressRing.style.strokeDashoffset = `${circumference}`;

    window.addEventListener("scroll", function () {

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

        const offset = circumference - (scrollPercent * circumference);
        progressRing.style.strokeDashoffset = offset;

        if (scrollTop > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}



// ========================================
//   Chat Widget Toggle
// ========================================
const chatWidget = document.getElementById("chatWidget");
const chatToggleBtn = document.getElementById("chatToggleBtn");
const chatPopupCard = document.getElementById("chatPopupCard");

if (chatWidget && chatToggleBtn && chatPopupCard) {

    chatToggleBtn.addEventListener("click", function () {
        chatWidget.classList.toggle("closed");
        chatPopupCard.classList.toggle("hidden");
    });

}


// ========================================
//   Cart Offcanvas System
// ========================================

let cart = JSON.parse(localStorage.getItem("ghorerbazar_cart")) || [];

const cartOverlay = document.getElementById("cartOverlay");
const cartOffcanvas = document.getElementById("cartOffcanvas");
const cartTriggerBtn = document.getElementById("cartTriggerBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");
const cartEmptyState = document.getElementById("cartEmptyState");
const cartFooter = document.getElementById("cartFooter");
const cartSubtotal = document.getElementById("cartSubtotal");
const floatingCartCount = document.getElementById("floatingCartCount");
const floatingCartTotal = document.getElementById("floatingCartTotal");

// ---- Open / Close Offcanvas ----
function openCart() {
    cartOverlay.classList.add("active");
    cartOffcanvas.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeCart() {
    cartOverlay.classList.remove("active");
    cartOffcanvas.classList.remove("active");
    document.body.style.overflow = "";
}

if (cartTriggerBtn) cartTriggerBtn.addEventListener("click", openCart);
if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

// ---- Save + Render ----
function saveCart() {
    localStorage.setItem("ghorerbazar_cart", JSON.stringify(cart));
    renderCart();
}

function renderCart() {

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartEmptyState.classList.add("active");
        cartFooter.style.display = "none";
        cartItemsContainer.style.display = "none";
    } else {
        cartEmptyState.classList.remove("active");
        cartFooter.style.display = "block";
        cartItemsContainer.style.display = "block";

        cart.forEach(function (item, index) {
            const itemEl = document.createElement("div");
            itemEl.className = "cart-item";
            itemEl.innerHTML = `
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div>
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">৳${(item.price * item.qty).toLocaleString()}</div>
                    </div>
                    <div class="cart-item-bottom-row">
                        <div class="qty-stepper">
                            <button type="button" onclick="decreaseQty(${index})">−</button>
                            <span>${item.qty}</span>
                            <button type="button" onclick="increaseQty(${index})">+</button>
                        </div>
                        <button type="button" class="cart-item-remove" onclick="removeFromCart(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    // Totals
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    floatingCartCount.textContent = totalItems + " Items";
    floatingCartTotal.textContent = "৳" + totalPrice.toLocaleString();
    cartSubtotal.textContent = "৳" + totalPrice.toLocaleString();
}

// ---- Cart Actions ----
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name: name, price: price, image: image, qty: 1 });
    }

    saveCart();
    openCart();
}

function increaseQty(index) {
    cart[index].qty += 1;
    saveCart();
}

function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

// ---- Wire up all "Add To Cart" buttons on the page ----
document.querySelectorAll(".btn-add-cart, .add-cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        // Nearest product card theke info ber kora
        const card = btn.closest(".product-card, .top-product-card");
        if (!card) return;

        const nameEl = card.querySelector(".product-title, h3");
        const priceEl = card.querySelector(".product-price");
        const imgEl = card.querySelector("img");

        const name = nameEl ? nameEl.textContent.trim() : "Product";
        const priceText = priceEl ? priceEl.textContent.replace(/[^0-9]/g, "") : "0";
        const price = parseInt(priceText) || 0;
        const image = imgEl ? imgEl.getAttribute("src") : "";

        addToCart(name, price, image);
    });
});

// ---- Initial Render ----
renderCart();