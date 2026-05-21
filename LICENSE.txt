* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Outfit', sans-serif;
    background: #070b14;
    color: white;
    overflow-x: hidden;
}

/* INTRO SCREEN */
#intro {
    position: fixed;
    inset: 0;
    background: #070b14;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    animation: introFade 1s ease forwards;
    animation-delay: 3s;
}

.intro-glow {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 255, 208, 0.25), transparent 70%);
    filter: blur(40px);
}

.intro-title {
    font-size: clamp(4rem, 10vw, 8rem);
    font-weight: 800;
    letter-spacing: 8px;
    color: white;
    animation: zoomIn 1.5s ease;
}

@keyframes zoomIn {
    from { opacity: 0; transform: scale(.7); }
    to { opacity: 1; transform: scale(1); }
}

@keyframes introFade {
    to { opacity: 0; visibility: hidden; }
}

/* HEADER */
.header {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 30px;
    background: rgba(7, 11, 20, 0.75);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, .06);
    gap: 20px;
}

.logo {
    display: flex;
    align-items: center;
    gap: 14px;
}

.logo-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00ffd0, #00a2ff);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    color: #07111f;
}

.logo-text h1 {
    font-size: 1.3rem;
}

.header-location {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #96a6bd;
    text-decoration: none;
    font-size: 0.95rem;
    padding: 10px 15px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: 0.25s ease;
}

.header-location i {
    color: #00ffd0;
}

.header-location:hover {
    color: white;
    background: rgba(0, 255, 208, 0.08);
    border-color: rgba(0, 255, 208, 0.3);
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.search-box {
    width: 320px;
    background: #121826;
    border: 1px solid rgba(255, 255, 255, .08);
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.search-box input {
    width: 100%;
    height: 50px;
    border: none;
    outline: none;
    background: transparent;
    color: white;
    font-size: 1rem;
}

.search-box i {
    color: #7d8ca3;
}

.cart-btn {
    width: 55px;
    height: 55px;
    border: none;
    border-radius: 16px;
    background: linear-gradient(135deg, #00ffd0, #00a2ff);
    color: #07111f;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
}

.cart-btn span {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #ff3366;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .8rem;
}

/* HERO */
.hero {
    padding: 40px 25px 20px;
    text-align: center;
}

.hero h1 span {
    display: block;
    background: linear-gradient(90deg, #00ffd0, #00a2ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
}

.hero p {
    max-width: 700px;
    margin: 15px auto 0;
    color: #96a6bd;
    font-size: 1.1rem;
}

/* SECCIÓN DESTACADOS (CON IMÁGENES REORGANIZADA A REJILLA DE 50) */
.productos-con-imagen-seccion {
    padding: 20px;
    max-width: 1300px;
    margin: 0 auto;
}

.seccion-titulo {
    font-size: 1.4rem;
    margin-bottom: 20px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
}

.seccion-titulo i {
    color: #00ffd0;
}

.productos-imagen-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
}

.product-card-with-img {
    background: #121826;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, .05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: 0.25s;
}

.product-card-with-img:hover {
    transform: translateY(-5px);
    border-color: rgba(0, 255, 208, 0.3);
}

.card-img-holder {
    width: 100%;
    height: 180px;
    background: #ffffff;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

.card-img-holder img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.card-img-info {
    padding: 15px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: #121826;
}

/* SECCIÓN CATEGORÍAS */
.categorias-seccion {
    max-width: 1300px;
    margin: 30px auto 10px;
    padding: 0 20px;
}

.categorias-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    padding-bottom: 12px;
    margin-bottom: 20px;
}

.categorias-nav {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 15px;
    scroll-behavior: smooth;
}

.categoria-btn {
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 14px 26px;
    border-radius: 16px;
    background: #121826;
    color: #96a6bd;
    font-family: 'Outfit', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.25s ease;
}

.categoria-btn:hover {
    color: white;
    background: #171f30;
}

.categoria-btn.active {
    background: linear-gradient(135deg, #00ffd0, #00a2ff);
    color: #07111f;
    font-weight: 600;
    border-color: transparent;
    box-shadow: 0 8px 20px rgba(0, 255, 208, 0.15);
}

.categorias-nav::-webkit-scrollbar {
    height: 4px;
}
.categorias-nav::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
}

/* PRODUCTOS GENERALES (SIN IMAGEN) */
.productos-grid {
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 22px;
    max-width: 1300px;
    margin: 0 auto;
}

.product-card {
    background: #121826;
    border-radius: 24px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, .05);
    transition: .25s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.product-card:hover {
    transform: translateY(-6px);
    border-color: rgba(0, 255, 208, 0.2);
}

.product-category {
    font-size: .8rem;
    color: #00ffd0;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
}

.product-name {
    font-size: 1.05rem;
    font-weight: 600;
    color: #f1f5f9;
    margin-bottom: 10px;
}

.product-price {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    margin-bottom: 12px;
}

.add-btn {
    width: 100%;
    height: 46px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #00ffd0, #00a2ff);
    color: #07111f;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: opacity 0.2s;
}

.add-btn:hover {
    opacity: 0.9;
}

/* PAGINACIÓN */
.pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 30px 20px;
    width: 100%;
}

.page-btn {
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 12px;
    background: #121826;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
}

.page-btn.active {
    background: linear-gradient(135deg, #00ffd0, #00a2ff);
    color: #07111f;
}

/* SIDEBAR CARRITO Y OVERLAY */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.6);
    opacity: 0;
    pointer-events: none;
    transition: .3s;
    z-index: 2000;
}

.overlay.active {
    opacity: 1;
    pointer-events: auto;
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: -420px;
    width: 400px;
    max-width: 100%;
    height: 100vh;
    background: #0e1420;
    border-left: 1px solid rgba(255,255,255,0.05);
    z-index: 3000;
    transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
}

.cart-sidebar.active {
    right: 0;
}

.cart-header {
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.05);
}

.close-cart {
    width: 45px;
    height: 45px;
    border: none;
    border-radius: 12px;
    background: #121826;
    color: white;
    cursor: pointer;
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
}

.cart-item {
    background: #121826;
    border-radius: 18px;
    padding: 18px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(255,255,255,0.03);
}

.delete-btn {
    border: none;
    background: #ff3366;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
}

.cart-footer {
    padding: 20px;
    border-top: 1px solid rgba(255,255,255,.05);
}

.cart-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 1.2rem;
}

.cart-total strong {
    color: #00ffd0;
}

.whatsapp-btn {
    width: 100%;
    height: 55px;
    border: none;
    border-radius: 16px;
    background: #25D366;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.loading {
    text-align: center;
    padding: 40px;
    color: #96a6bd;
    grid-column: 1 / -1;
}

/* RESPONSIVE */
@media(max-width:768px){
    .header { padding: 15px; gap: 10px; }
    .header-location { display: none; }
    .search-box { width: 100%; }
    .header-actions { width: 100%; }
    .logo-text { display: none; }
    .productos-grid, .productos-imagen-grid { grid-template-columns: 1fr 1fr; gap: 12px; padding: 10px; }
    .categoria-btn { padding: 10px 20px; font-size: 0.9rem; }
}

@media(max-width:480px){
    .productos-grid, .productos-imagen-grid { grid-template-columns: 1fr; }
}