/* =====================================================
   DATA PRODUK
===================================================== */

const products = [

    {
        id: 1,
        brand: "Sindu Murni",
        name: "Isi Ulang 19L / Galon",
        price: 6000,
        category: "galon",
        image: "assets/isiulang.png"
        
    },

    {
        id: 2,
        brand: "AQUA",
        name: "600 mL × 24 botol",
        price: 49000,
        category: "dus",
        image: "assets/aqua600.jpg"
    },

    {
        id: 3,
        brand: "AQUA",
        name: "19L Galon",
        price: 22000,
        category: "galon",
        image: "assets/galon aqua.png"
    },

    {
        id: 4,
        brand: "Cleo",
        name: "220 mL × 24 Botol",
        price: 21000,
        category: "dus",
        image: "assets/cleo220b.jpeg"
    },

    {
        id: 5,
        brand: "Cleo",
        name: "220 mL × 40 Gelas",
        price: 27000,
        category: "dus",
        image: "assets/cleo220g.jpg"
    },

    {
        id: 6,
        brand: "Cleo",
        name: "500 mL × 24 Botol",
        price: 34000,
        category: "dus",
        image: "assets/cleo500.jpeg"
    },

    {
        id: 7,
        brand: "Cleo",
        name: "1 L × 12 Botol",
        price: 36000,
        category: "dus",
        image: "assets/cleo1l.png"
    },

    {
        id: 8,
        brand: "Cleo",
        name: "15L Galon",
        price: 20000,
        category: "galon",
        image: "assets/cleo15.png"
    },

    {
        id: 9,
        brand: "Cleo",
        name: "19L Galon",
        price: 21000,
        category: "galon",
        image: "assets/cleo galon.png"
    },

    {
        id: 10,
        brand: "Club",
        name: "15L Galon",
        price: 20000,
        category: "galon",
        image: "assets/club.png"
    },

    {
        id: 11,
        brand: "AQUVIVA",
        name: "700 mL × 12 Botol",
        price: 25000,
        category: "dus",
        image: "assets/aquaviva.webp"
    },

    {
        id: 12,
        brand: "LPG",
        name: "LPG Melon 3 Kg",
        price: 20000,
        category: "lpg",
        image: "assets/lpg-3kg.jpeg" 
    },

    {
        id: 13,
        brand: "LPG",
        name: "LPG 12 Kg",
        price: 240000,
        category: "lpg",
        image: "assets/lpg-12kg.jpg"
    },

    {
        id: 14,
        brand: "Es batu",
        name: "Es batu 5kg",
        price: 6000,
        category: "es batu",
        image: "assets/esbatu.jpg"
    }

];


/* =====================================================
   CART
===================================================== */

let cart = [];


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(number);

}


/* =====================================================
   LOKASI TOKO
===================================================== */

const STORE_LOCATION = {

    latitude: -7.439585614791877,

    longitude: 112.72145628901556

};


let customerDistance = null;


/* =====================================================
   TAMPILKAN PRODUK
===================================================== */

function displayProducts(category = "semua") {

    const container =
        document.getElementById(
            "product-container"
        );


    container.innerHTML = "";


    const filteredProducts =
        category === "semua"

            ? products

            : products.filter(
                product =>
                    product.category === category
            );


    filteredProducts.forEach(product => {


        /* Cari jumlah produk di cart */

        const cartItem =
            cart.find(
                item =>
                    item.id === product.id
            );


        const quantity =
            cartItem
                ? cartItem.quantity
                : 0;


        const card =
            document.createElement("div");


        card.className =
            "product-card";


        /* =================================================
           HTML CARD PRODUK
        ================================================= */

        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.src='images/no-image.png'"
                >

            </div>


            <div class="product-info">

                <span class="product-brand">

                    ${product.brand}

                </span>


                <h3 class="product-name">

                    ${product.name}

                </h3>


                <div class="product-bottom">


                    <strong class="product-price">

                        ${formatRupiah(product.price)}

                    </strong>


                    <div class="product-quantity-control">


                        ${
                            quantity > 0

                            ? `

                                <button
                                    class="product-minus"
                                >
                                    −
                                </button>


                                <span
                                    class="product-quantity"
                                >
                                    ${quantity}
                                </span>

                            `

                            : ""

                        }


                        <button
                            class="product-plus"
                        >
                            +
                        </button>


                    </div>


                </div>

            </div>

        `;


        /* =================================================
           TOMBOL +
        ================================================= */

        const plusButton =
            card.querySelector(
                ".product-plus"
            );


        plusButton.addEventListener(
            "click",
            function() {

                addToCart(product.id);

                displayProducts(category);

            }
        );


        /* =================================================
           TOMBOL -
        ================================================= */

        const minusButton =
            card.querySelector(
                ".product-minus"
            );


        if (minusButton) {

            minusButton.addEventListener(
                "click",
                function() {

                    changeQuantity(
                        product.id,
                        -1
                    );

                    displayProducts(category);

                }
            );

        }


        container.appendChild(card);

    });

}


/* =====================================================
   TAMBAH PRODUK
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if (!product) return;


    const existing =
        cart.find(
            item =>
                item.id === productId
        );


    if (existing) {

        existing.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

}


/* =====================================================
   UBAH JUMLAH
===================================================== */

function changeQuantity(
    id,
    amount
) {

    const item =
        cart.find(
            item =>
                item.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.id !== id
            );

    }


    updateCart();

}


/* =====================================================
   HAPUS PRODUK
===================================================== */

function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    updateCart();

}


/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {


    /* ============================
       TOTAL JUMLAH ITEM
    ============================ */

    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    document.getElementById(
        "nav-cart-count"
    ).textContent =
        totalQuantity;


    document.getElementById(
        "floating-cart-count"
    ).textContent =
        totalQuantity;


    /* ============================
       TAMPILAN CART
    ============================ */

    const cartItems =
        document.getElementById(
            "cart-items"
        );


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <p class="empty-cart">

                Keranjang masih kosong.

            </p>

        `;


        updateSummary();

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(item => {


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >


            <div>

                <div class="cart-item-name">

                    ${item.brand}
                    - ${item.name}

                </div>


                <div class="cart-item-price">

                    ${formatRupiah(item.price)}

                </div>


                <div class="quantity-control">


                    <button class="minus">

                        −

                    </button>


                    <span>

                        ${item.quantity}

                    </span>


                    <button class="plus">

                        +

                    </button>


                </div>

            </div>


            <button class="remove-item">

                Hapus

            </button>

        `;


        div.querySelector(
            ".minus"
        ).addEventListener(
            "click",
            function() {

                changeQuantity(
                    item.id,
                    -1
                );

            }
        );


        div.querySelector(
            ".plus"
        ).addEventListener(
            "click",
            function() {

                changeQuantity(
                    item.id,
                    1
                );

            }
        );


        div.querySelector(
            ".remove-item"
        ).addEventListener(
            "click",
            function() {

                removeFromCart(
                    item.id
                );

            }
        );


        cartItems.appendChild(div);

    });


    updateSummary();

}


/* =====================================================
   BIAYA
===================================================== */

function calculateFees() {
    let distanceFee = 0;

    // Biaya jarak Rp2.000 jika jarak lebih dari 2 km
    if (
        customerDistance !== null &&
        customerDistance > 2
    ) {
        distanceFee = 2000;
    }

    return {
        serviceFee: 0,
        distanceFee: distanceFee
    };
}


/* =====================================================
   UPDATE TOTAL
===================================================== */

function updateSummary() {
    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const fees = calculateFees();

    const total = subtotal + fees.distanceFee;

    document.getElementById("cart-subtotal").textContent =
        formatRupiah(subtotal);

    document.getElementById("distance-fee").textContent =
        formatRupiah(fees.distanceFee);

    document.getElementById("cart-total").textContent =
        formatRupiah(total);
}


/* =====================================================
   CART MODAL
===================================================== */

function openCart() {

    document
        .getElementById("cart-modal")
        .classList.add("show");


    document.body.style.overflow =
        "hidden";

}


function closeCart() {

    document
        .getElementById("cart-modal")
        .classList.remove("show");


    document.body.style.overflow =
        "";

}


/* =====================================================
   DAFTAR PELANGGAN BISNIS
===================================================== */

function openBusinessForm() {

    /*
       GANTI NOMOR INI
       dengan nomor WhatsApp Sindu Murni
       (samakan dengan nomor di checkoutWhatsApp)
    */

    const phone =
        "6281234488245";


    let message =
        "Halo Sindu Murni!%0A%0A";


    message +=
        "Saya tertarik daftar sebagai " +
        "pelanggan bisnis untuk kebutuhan " +
        "air dan LPG usaha saya.%0A%0A";


    message +=
        "Mohon info lebih lanjut mengenai " +
        "harga khusus bisnis dan jadwal " +
        "pengiriman. Terima kasih!";


    window.open(

        `https://wa.me/${phone}?text=${message}`,

        "_blank"

    );

}


/* =====================================================
   FILTER
===================================================== */

function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function() {


                buttons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                this.classList.add(
                    "active"
                );


                displayProducts(
                    this.dataset.filter
                );

            }
        );

    });

}


/* =====================================================
   HAMBURGER
===================================================== */

function setupHamburger() {

    const hamburger =
        document.getElementById(
            "hamburger"
        );


    const navLinks =
        document.getElementById(
            "navLinks"
        );


    hamburger.addEventListener(
        "click",
        function() {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function() {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =====================================================
   HITUNG JARAK
===================================================== */

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;


    const dLat =
        (lat2 - lat1)
        * Math.PI / 180;


    const dLon =
        (lon2 - lon1)
        * Math.PI / 180;


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(
            lat1 * Math.PI / 180
        )

        *

        Math.cos(
            lat2 * Math.PI / 180
        )

        *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;

}


/* =====================================================
   GPS
===================================================== */

function getCustomerLocation() {

    const button =
        document.getElementById(
            "locationButton"
        );


    const distanceText =
        document.getElementById(
            "distance-text"
        );


    if (!navigator.geolocation) {

        alert(
            "Browser tidak mendukung GPS."
        );

        return;

    }


    button.textContent =
        "📍 Mencari lokasi...";


    button.disabled = true;


    navigator.geolocation.getCurrentPosition(

        function(position) {


            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            customerDistance =
                calculateDistance(

                    STORE_LOCATION.latitude,

                    STORE_LOCATION.longitude,

                    latitude,

                    longitude

                );


            distanceText.textContent =
                customerDistance.toFixed(1)
                + " km";


            button.textContent =
                "✓ Lokasi berhasil didapat";


            button.disabled = false;


            updateSummary();

        },


        function() {


            button.textContent =
                "📍 Gunakan Lokasi Saya";


            button.disabled = false;


            alert(
                "Lokasi tidak dapat diakses. Izinkan akses lokasi pada browser."
            );

        },

        {

            enableHighAccuracy: true,

            timeout: 10000,

            maximumAge: 0

        }

    );

}


/* =====================================================
   WHATSAPP
===================================================== */

function checkoutWhatsApp() {

    // Lokasi wajib diisi sebelum checkout
    if (customerDistance === null) {
        alert("Silakan isi lokasi Anda terlebih dahulu dengan menekan tombol lokasi GPS.");
        return;
    }

    // Cek apakah keranjang kosong
    if (cart.length === 0) {
        alert("Keranjang masih kosong.");
        return;
    }

    // Lanjutkan kode checkout WhatsApp kamu yang sebelumnya di sini...

    // Hitung seluruh jumlah item
    
const totalQuantity = cart.reduce(
    (total, item) => total + item.quantity,
    0
);

// Cek apakah keranjang berisi LPG 12 kg
const hasLPG12kg = cart.some(item => {
    const productName =
        `${item.name || ""} ${item.brand || ""}`.toLowerCase();

    return (
        productName.includes("12 kg") ||
        productName.includes("12kg")
    );
});

// Minimal 2 item, kecuali ada LPG 12 kg
if (totalQuantity < 2 && !hasLPG12kg) {
    alert(
        "Minimal pembelian 2 item kecuali item LPG 12 kg boleh jika hanya pesan 1."
    );
    return;
}


    const subtotal = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const fees = calculateFees();
    const total = subtotal + fees.distanceFee;

    let message = "Halo Sindu Murni!\n\n";
    message += "Saya ingin memesan:\n";

    cart.forEach(item => {
        message += `• ${item.brand} - ${item.name}\n`;
        message += `  Jumlah: ${item.quantity}\n`;
        message += `  Harga: ${formatRupiah(item.price * item.quantity)}\n`;
    });

    message += `\nTotal jumlah item: ${totalQuantity}\n`;
    message += `Subtotal: ${formatRupiah(subtotal)}\n`;
    message += `Biaya jarak: ${formatRupiah(fees.distanceFee)}\n`;

    if (customerDistance !== null) {
        message += `Jarak: ${customerDistance.toFixed(1)} km\n`;
    }

    message += `Total pembayaran: ${formatRupiah(total)}\n\n`;
    message += "Terima kasih!";

    const phone = "6281234488245";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}


/* =====================================================
   JALANKAN WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* Tampilkan produk */

        displayProducts();


        /* Filter */

        setupFilters();


        /* Hamburger */

        setupHamburger();


        /* Cart navbar */

        document
            .getElementById("navCart")
            .addEventListener(
                "click",
                openCart
            );


        /* Floating cart */

        document
            .getElementById("floatingCart")
            .addEventListener(
                "click",
                openCart
            );


        /* Tutup cart */

        document
            .getElementById("closeCart")
            .addEventListener(
                "click",
                closeCart
            );


        /* Klik luar cart */

        document
            .getElementById("cart-modal")
            .addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === this
                    ) {

                        closeCart();

                    }

                }
            );


        /* GPS */

        document
            .getElementById(
                "locationButton"
            )
            .addEventListener(
                "click",
                getCustomerLocation
            );


        /* WhatsApp */

        document
            .getElementById(
                "checkoutButton"
            )
            .addEventListener(
                "click",
                checkoutWhatsApp
            );

    }
);
