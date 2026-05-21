const API_URL = "https://sheetdb.io/api/v1/vsrdmy1lr1ri3";
const PRODUCTOS_POR_PAGINA = 50;

/* ========================================
   ELEMENTOS DOM
======================================== */
const productosGrid = document.getElementById("productosGrid");
const productosImagenGrid = document.getElementById("productosImagenGrid");
const seccionDestacados = document.getElementById("seccionDestacados");
const buscador = document.getElementById("buscador");
const categoriasContainer = document.getElementById("categorias");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const whatsappBtn = document.getElementById("whatsappBtn");

/* ========================================
   ESTADOS GLOBALES
======================================== */
let productos = [];
let productosFiltrados = [];
let productosConImagen = []; 
let carrito = [];
let paginaActualNormal = 1;
let paginaActualDestacados = 1;
let categoriaActual = "";

/* ========================================
   CARGAR DATA DESDE SHEETDB
======================================== */
async function cargarProductos(){
    try{
        productosGrid.innerHTML = `<div class="loading">Cargando productos generales...</div>`;
        productosImagenGrid.innerHTML = `<div class="loading">Cargando destacados...</div>`;

        const response = await fetch(API_URL);
        const data = await response.json();

        const todosLosProductos = data.map(producto => {
            const catOriginal = producto.categoria || producto.Categoria || "General";
            const listaCategorias = catOriginal.split(",").map(c => c.trim());

            return {
                nombre: producto.nombre || producto.Nombre || "Sin nombre",
                categoriaTexto: catOriginal,
                categoriasLista: listaCategorias,
                imagen: producto.imagen || producto.Imagen || "", 
                precio: parseFloat(
                    String(producto.precio || producto.Precio || 0)
                    .replace("$","")
                    .replace("MXN","")
                    .replace(",","")
                    .trim()
                ) || 0
            };
        });

        productosConImagen = todosLosProductos.filter(p => p.imagen.trim() !== "");
        productos = todosLosProductos;

        renderProductosDestacados();
        generarCategorias();

    }catch(error){
        console.error(error);
        productosGrid.innerHTML = `<div class="loading">Error al conectar con la base de datos</div>`;
    }
}

/* ========================================
   RENDER PRODUCTOS DESTACADOS
======================================== */
function renderProductosDestacados() {
    productosImagenGrid.innerHTML = "";

    if(productosConImagen.length === 0) {
        seccionDestacados.style.display = "none";
        return;
    }

    seccionDestacados.style.display = "block";

    const inicio = (paginaActualDestacados - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;
    const destacadosPagina = productosConImagen.slice(inicio, fin);

    destacadosPagina.forEach(producto => {
        const card = document.createElement("div");
        card.className = "product-card-with-img";
        card.innerHTML = `
            <div class="card-img-holder">
                <img src="${producto.imagen}" alt="${producto.nombre}" loading="lazy" />
            </div>
            <div class="card-img-info">
                <div class="product-category">${producto.categoriasLista[0]}</div>
                <div class="product-name">${producto.nombre}</div>
                <div class="product-price">$${producto.precio.toFixed(2)}</div>
                <button class="add-btn">Agregar</button>
            </div>
        `;

        card.querySelector(".add-btn").addEventListener("click", () => {
            agregarProducto(producto);
        });

        productosImagenGrid.appendChild(card);
    });

    renderPaginacionDestacados();
}

function renderPaginacionDestacados(){
    let paginacionDestacados = document.getElementById("paginacionDestacados");

    if(!paginacionDestacados){
        paginacionDestacados = document.createElement("div");
        paginacionDestacados.id = "paginacionDestacados";
        paginacionDestacados.className = "pagination";
        productosImagenGrid.after(paginacionDestacados);
    }

    paginacionDestacados.innerHTML = "";
    const totalPaginas = Math.ceil(productosConImagen.length / PRODUCTOS_POR_PAGINA);

    if(totalPaginas <= 1) return;

    for(let i=1; i<=totalPaginas; i++){
        const btn = document.createElement("button");
        btn.className = "page-btn";
        if(i === paginaActualDestacados) btn.classList.add("active");
        btn.textContent = i;

        btn.addEventListener("click", ()=>{
            paginaActualDestacados = i;
            renderProductosDestacados();
            seccionDestacados.scrollIntoView({ behavior: "smooth" });
        });

        paginacionDestacados.appendChild(btn);
    }
}

/* ========================================
   GENERAR PESTAÑAS DE CATEGORÍAS
======================================== */
function generarCategorias(){
    categoriasContainer.innerHTML = "";

    let todasLasCategorias = [];
    productos.forEach(p => {
        todasLasCategorias = todasLasCategorias.concat(p.categoriasLista);
    });
    
    const deLista = [...new Set(todasLasCategorias)];
    categoriaActual = deLista[0] || "";

    deLista.forEach(categoria=>{
        const btn = document.createElement("button");
        btn.className = "categoria-btn";

        if(categoria === categoriaActual) btn.classList.add("active");
        btn.textContent = categoria;

        btn.addEventListener("click", ()=>{
            categoriaActual = categoria;
            paginaActualNormal = 1;

            document.querySelectorAll(".categoria-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filtrarProductos();
        });

        categoriasContainer.appendChild(btn);
    });

    filtrarProductos();
}

/* ========================================
   FILTRADO ESTRICTO POR LETRA INICIAL
======================================= */
function filtrarProductos(){
    const texto = buscador.value.toLowerCase().trim();
    
    if (texto !== "") {
        productosFiltrados = productos.filter(producto => {
            const nombre = producto.nombre.toLowerCase();
            
            // Separa el nombre del producto en palabras individuales
            const palabrasProducto = nombre.split(" ");

            // El producto cuenta si ALGUNA de sus palabras empieza exactamente con lo escrito en el buscador
            return palabrasProducto.some(palabra => palabra.startsWith(texto));
        });
    } else {
        // Si el buscador está vacío, vuelve a filtrar de forma normal por la pestaña seleccionada
        productosFiltrados = productos.filter(producto => {
            return producto.categoriasLista.includes(categoriaActual);
        });
    }

    renderProductos();
}

/* ========================================
   RENDER LISTA GENERAL DE PRODUCTOS
======================================== */
function renderProductos(){
    productosGrid.innerHTML = "";

    const inicio = (paginaActualNormal - 1) * PRODUCTOS_POR_PAGINA;
    const fin = inicio + PRODUCTOS_POR_PAGINA;
    const productosPagina = productosFiltrados.slice(inicio, fin);

    if(productosPagina.length === 0){
        productosGrid.innerHTML = `<div class="loading">No se encontraron productos que comiencen con esa letra</div>`;
        return;
    }

    productosPagina.forEach(producto=>{
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div>
                <div class="product-category">${producto.categoriasLista[0]}</div>
                <div class="product-name">${producto.nombre}</div>
            </div>
            <div>
                <div class="product-price">$${producto.precio.toFixed(2)}</div>
                <button class="add-btn">Agregar</button>
            </div>
        `;

        card.querySelector(".add-btn").addEventListener("click", ()=>{
            agregarProducto(producto);
        });

        productosGrid.appendChild(card);
    });

    renderPaginacionNormal();
}

function renderPaginacionNormal(){
    let paginacionNormal = document.getElementById("paginacionNormal");

    if(!paginacionNormal){
        paginacionNormal = document.createElement("div");
        paginacionNormal.id = "paginacionNormal";
        paginacionNormal.className = "pagination";
        productosGrid.after(paginacionNormal);
    }

    paginacionNormal.innerHTML = "";
    const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);

    if(totalPaginas <= 1) {
        paginacionNormal.style.display = "none";
        return;
    }

    paginacionNormal.style.display = "flex";
    for(let i=1; i<=totalPaginas; i++){
        const btn = document.createElement("button");
        btn.className = "page-btn";
        if(i === paginaActualNormal) btn.classList.add("active");
        btn.textContent = i;

        btn.addEventListener("click", ()=>{
            paginaActualNormal = i;
            renderProductos();
            document.getElementById("categorias").scrollIntoView({ behavior:"smooth" });
        });

        paginacionNormal.appendChild(btn);
    }
}

buscador.addEventListener("input", ()=>{
    paginaActualNormal = 1;
    filtrarProductos();
});

/* ========================================
   CARRITO DE COMPRAS
======================================== */
function agregarProducto(producto){
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito(){
    cartItems.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index)=>{
        total += producto.precio;
        const item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
            <div>
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toFixed(2)}</p>
            </div>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        `;
        item.querySelector(".delete-btn").addEventListener("click", () => eliminarProducto(index));
        cartItems.appendChild(item);
    });

    cartCount.textContent = carrito.length;
    cartTotal.textContent = "$" + total.toFixed(2);
}

function eliminarProducto(index){
    carrito.splice(index, 1);
    actualizarCarrito();
}

/* INTERRUPTORES SIDEBAR */
function abrirCarrito(){ cartSidebar.classList.add("active"); overlay.classList.add("active"); }
function cerrarCarrito(){ cartSidebar.classList.remove("active"); overlay.classList.remove("active"); }

openCart.addEventListener("click", abrirCarrito);
closeCart.addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);

/* INTEGRACIÓN WHATSAPP */
whatsappBtn.addEventListener("click", ()=>{
    if(carrito.length === 0){
        alert("Tu carrito está vacío");
        return;
    }

    let mensaje = "Hola, quiero realizar un pedido de Abarrotes Ak Kin:%0A%0A";
    let total = 0;

    carrito.forEach(producto=>{
        mensaje += `• ${producto.nombre} - $${producto.precio.toFixed(2)}%0A`;
        total += producto.precio;
    });

    mensaje += `%0A💰 *Total: $${total.toFixed(2)}*`;
    mensaje += `%0A%0A_¿Pasas a recoger a la sucursal de Av. Zapopan o requieres entrega rápida?_`;

    window.open(`https://wa.me/525549127760?text=${mensaje}`, "_blank");
});

window.addEventListener("load", ()=>{
    document.body.style.overflow = "hidden";
    setTimeout(()=>{ document.body.style.overflow = "auto"; }, 3500);
});

cargarProductos();