let sonido = new Audio('https://www.soundjay.com/button/beep-07.mp3');
function playSound(){ sonido.currentTime=0; sonido.play(); }

let productos = [
  {nombre:"Coca Cola 600ml", precio:20, img:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTduw0SJ2wJafLXGS7qw0rgToWvVseMg_rS1ki37tDHhu4-R6dcwL66BQ2aysS0rs3BmsGjkD1Vk3zvWn8MYKXU34xp3r0ZSgvhMu21IL9bXzelwSkdUI0m", desc:"Refresco Coca Cola", categoria:"bebidas"},
  {nombre:"Pepsi 500ml", precio:17, img:"https://lacolonia.vtexassets.com/arquivos/ids/170027-800-800?v=637097062221970000&width=800&height=800&aspect=true", desc:"Refresco Pepsi", categoria:"bebidas"},
  {nombre:"Sabritas Original", precio:15, img:"https://http2.mlstatic.com/D_NQ_NP_826973-MLA99387166232_112025-O.webp", desc:"Papas fritas saladas", categoria:"botanas"},
  {nombre:"Doritos Nacho", precio:22, img:"https://lagranbodega.vteximg.com.br/arquivos/ids/290269-1000-1000/7501011167612.jpg?v=638095941319800000", desc:"Totopos sabor nacho", categoria:"botanas"}
];

let carrito = {};
let productoActual = null;

// DOM
let productosDiv=document.getElementById("productos");
let totalText=document.getElementById("total");
let recomendadosDetalle=document.getElementById("recomendadosDetalle");
let lista=document.getElementById("lista");
let detalle=document.getElementById("detalle");
let contadorCarrito=document.getElementById("contadorCarrito");

function mostrarProductos(lista=productos){
  productosDiv.innerHTML="";
  lista.forEach(p=>{
    productosDiv.innerHTML+=`
    <div class="producto" onclick="verDetalle('${p.nombre}');playSound();">
      <img src="${p.img}">
      <h4>${p.nombre}</h4>
      <p>$${p.precio}</p>
      <button class="btn-agregar" onclick="event.stopPropagation();agregar('${p.nombre}',${p.precio});playSound();">➕ Agregar</button>
    </div>`;
  });
}

function buscarProductos(){
  let texto=document.getElementById('buscador').value.toLowerCase();
  mostrarProductos(productos.filter(p=>p.nombre.toLowerCase().includes(texto)));
}

function filtrarCategoria(cat){
  if(cat==="todo") mostrarProductos();
  else mostrarProductos(productos.filter(p=>p.categoria===cat));
}

// DETALLE PRODUCTO
function verDetalle(n){
  let p=productos.find(x=>x.nombre===n);
  productoActual=p;
  detalle.style.display="block";
  document.getElementById("detalleImg").src=p.img;
  document.getElementById("detalleNombre").innerText=p.nombre;
  document.getElementById("detallePrecio").innerText="$"+p.precio;
  document.getElementById("detalleDesc").innerText=p.desc;

  // RECOMENDADOS: hasta 5 de la misma categoria
  recomendadosDetalle.innerHTML="";
  let recs = productos.filter(x=>x.categoria===p.categoria && x.nombre!==n).slice(0,5);
  recs.forEach(x=>{
    recomendadosDetalle.innerHTML+=`<div class="card-mini" onclick="verDetalle('${x.nombre}');playSound();">
      <img src="${x.img}"><p>${x.nombre}</p></div>`;
  });
}

function cerrarDetalle(){ detalle.style.display="none"; }

// CARRITO
function agregar(n,p){
  if(carrito[n]) carrito[n].cantidad++; else carrito[n]={precio:p,cantidad:1};
  renderCarrito();
}

function sumar(n){ carrito[n].cantidad++; renderCarrito(); }
function restar(n){ carrito[n].cantidad--; if(carrito[n].cantidad<=0) delete carrito[n]; renderCarrito(); }
function cambiarCantidad(n,input){ 
  let val=parseInt(input.value);
  if(isNaN(val)||val<1) val=1;
  carrito[n].cantidad=val;
  renderCarrito();
}

function renderCarrito(){
  let total=0, totalItems=0;
  lista.innerHTML="";
  for(let n in carrito){
    let item=carrito[n];
    total+=item.precio*item.cantidad;
    totalItems+=item.cantidad;
    lista.innerHTML+=`<li>${n} x <input type="number" value="${item.cantidad}" min="1" oninput="cambiarCantidad('${n}',this)"> - $${item.precio*item.cantidad} 
      <button onclick="sumar('${n}');playSound();">➕</button> 
      <button onclick="restar('${n}');playSound();">➖</button>
    </li>`;
  }
  totalText.innerText="Total: $"+total;
  contadorCarrito.innerText=totalItems;
}

function toggleCarrito(){ document.getElementById("carritoPanel").classList.add("activo"); playSound(); }
function cerrarCarrito(){ document.getElementById("carritoPanel").classList.remove("activo"); }
function agregarDesdeDetalle(){ agregar(productoActual.nombre,productoActual.precio); playSound(); }

// WHATSAPP
function enviarWhats(){
  let msg="Hola, quiero pedir:\n"; let total=0;
  for(let n in carrito){
    let item=carrito[n];
    total+=item.precio*item.cantidad;
    msg+=`- ${n} x${item.cantidad} ($${item.precio*item.cantidad})\n`;
  }
  msg+=`Total: $${total}`;
  window.open(`https://wa.me/5215611989913?text=${encodeURIComponent(msg)}`);
}

// INIT
mostrarProductos();