<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ak Kin - Tu tienda de confianza</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="stylesheet" href="style.css" />
</head>
<body>

<div id="intro">
    <div class="intro-glow"></div>
    <h1 class="intro-title">Ak Kin</h1>
</div>

<header class="header">
    <div class="logo">
        <div class="logo-circle">AK</div>
        <div class="logo-text">
            <h1>Ak Kin</h1>
        </div>
    </div>

    <a href="https://www.google.com/maps/place/Abarrotes+Ak+Kin/@19.6462592,-99.1401588,17z/data=!4m16!1m9!3m8!1s0x85d1f5f516982c6f:0xd980cd64dadd430a!2sAbarrotes+Ak+Kin!8m2!3d19.6462592!4d-99.1375839!9m1!1b1!16s%2Fg%2F11spnp2ysh!3m5!1s0x85d1f5f516982c6f:0xd980cd64dadd430a!8m2!3d19.6462592!4d-99.1375839!16s%2Fg%2F11spnp2ysh?entry=ttu" target="_blank" class="header-location">
        <i class="fa-solid fa-location-dot"></i>
        <span>Fuentes del Valle, Méx.</span>
    </a>

    <div class="header-actions">
        <div class="search-box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" id="buscador" placeholder="Buscar productos..." />
        </div>

        <button class="cart-btn" id="openCart">
            <i class="fa-solid fa-cart-shopping"></i>
            <span id="cartCount">0</span>
        </button>
    </div>
</header>

<section class="hero">
    <div class="hero-content">
        <h1><span>Tu tienda de confianza</span></h1>
        <p>Compra miles de productos de forma rápida y moderna desde tu celular.</p>
    </div>
</section>

<section class="productos-con-imagen-seccion" id="seccionDestacados" style="display: none;">
    <h2 class="seccion-titulo"><i class="fa-solid fa-star"></i> Productos Destacados</h2>
    <div class="productos-imagen-grid" id="productosImagenGrid"></div>
</section>

<section class="categorias-seccion">
    <div class="categorias-header">
        <h2 class="seccion-titulo"><i class="fa-solid fa-layer-group"></i> Explorar Categorías</h2>
    </div>
    <div class="categorias-nav" id="categorias"></div>
</section>

<section class="productos-grid" id="productosGrid"></section>

<div class="overlay" id="overlay"></div>

<aside class="cart-sidebar" id="cartSidebar">
    <div class="cart-header">
        <h2>Tu carrito</h2>
        <button id="closeCart" class="close-cart">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>

    <div class="cart-items" id="cartItems"></div>

    <div class="cart-footer">
        <div class="cart-total">
            <span>Total</span>
            <strong id="cartTotal">$0.00</strong>
        </div>
        <button class="whatsapp-btn" id="whatsappBtn">
            <i class="fa-brands fa-whatsapp"></i> Enviar pedido
        </button>
    </div>
</aside>

<script src="script.js"></script>
</body>
</html>