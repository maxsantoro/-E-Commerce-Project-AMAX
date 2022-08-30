// Obteniendo elementos

let boton = document.getElementById("botonproductos");
let plant = document.getElementById("plant");
let body = document.getElementById("bodycontenedor");
let displayCarrito = document.getElementById("abrircarrito");
let cardCarrito = document.getElementById("cardCarrito");
let padre = document.getElementById("planta");
let cerrarCarrito = document.querySelector(".display");
let section = document.getElementById("sectioncarrito");
let preciototal = document.getElementById("preciototal")

document.addEventListener("DOMContentLoaded", () => {
  fetchProductos();
});


//Productos
let carrito = [];
let productos = [];

class Product {
  constructor(id, nombre, precio, stock, descripcion, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    (this.stock = stock), (this.descripcion = descripcion);
    this.img = img;
    this.cantidad = cantidad;
  }
}
const miLocalStorage = window.localStorage;
const fetchProductos = async () => {
  try {
    const response = await fetch("../productos.json");
    const datos = await response.json();

    /* datos.forEach(dato =>{
     productos.push(new Product(dato.id,dato.nombre,dato.stock,dato.descripcion,dato.img,dato.cantidad))
   })  */
    datos.forEach((i) => {
      productos.push(i);
    });
    //funciona
  } catch (error) {
    console.log(error);
  }
};

displayCarrito.addEventListener("click", () => abrirCarrito())

boton.addEventListener("click", () => cards());

function cards() {
  productos.forEach((i) => {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="sport_product">
    
    <figure><img src="${i.img}" alt="img"/></figure>
                     <h3> $<strong class="price_text">${i.precio}</strong></h3>
                     <h4 class="mb-3">${i.nombre}</h4>
                     <p class="card-text">${i.descripcion}</p>
                     <button type="button" class="btn btn-dark " id=${i.id}>Agregar al carrito</button>
                     </div>
              `;

    body.append(div);
    div.className = "col-xl-6 col-lg-6 col-md-6 col-sm-12";
    let botonAgregarCarrito = document.getElementById(i.id);

    botonAgregarCarrito.addEventListener("click", () => {
      agregarAlCarrito(i.id);
      
      //Alerta
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Estas seguro de agregar este producto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si,agregalo al carrito",
          cancelButtonText: "No, cancelalo!",

          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              `${i.nombre} agregado satisfactoriamente!`,
              "Podras ver tu producto en la seccion de carrito.",
              "success"
            )
            section.classList.remove('displaynone'); ;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelado",
              "Producto eliminado satisfactoriamente",
              "error"
            );
          }
        });
    });
  });
}
  
function agregarAlCarrito(prodId) {
  console.log(prodId)
  const existe = carrito.some((prod) => prod.id === prodId);
  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = productos.find((prod) => prod.id === prodId);
    if (item) {
      const prod = productos.map((prod) => {
        if (prod.id === prodId) {
          prod.cantidad = 1;
        }
      });
    }
    carrito.push(item);
  }
  abrirCarrito();
  guardarCarritoEnLocalStorage(); 
}
const abrirCarrito = () => {
    carrito.forEach((prod) => {
      let crearCarrito = document.createElement("div");
      crearCarrito.innerHTML = `
                  
                    <div class="row d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${prod.img}"
                          class="img-fluid rounded-3" alt="producto">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2">${prod.nombre}</p>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                          -
                        </button>
        
                        <input id="form1" min="0" name="quantity" value="${prod.cantidad}" type="number"
                          class="form-control form-control-sm" />
        
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                          +
                        </button>
      
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">${prod.precio}</h5>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button  id="id${prod.id}" class="text-danger"><img src="https://cdn-icons-png.flaticon.com/512/542/542724.png" class="fas fa-trash fa-lg"></img></button>
                      </div>
                    </div>

                
        
                `;
      padre.append(crearCarrito);
      let botonid = document.getElementById(`id${prod.id}`);
      botonid.addEventListener("click", () => eliminarDelCarrito(prod.id));

      preciototal.innerHTML = separador(
      carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
      );
    
    
      const form = document.querySelector("#form");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        let input = document.querySelector("#inputdescuento").value;
      });
      
      crearCarrito.className = "display";
      let botonCerrarCarrito = document.querySelector(".cerrar");
      botonCerrarCarrito.addEventListener("click", () =>
        cerrarCarritoDisplay()
      );
      const cerrarCarritoDisplay = () => {
        crearCarrito.classList.remove("display");
        crearCarrito.classList.add("d-none");
      };
    });
  }

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  abrirCarrito();
  guardarCarritoEnLocalStorage();
};

function vaciarCarrito() {
  carrito = [];
  abrirCarrito();
  localStorage.clear();
}

const separador = (numb) => {
  let str = numb.toString().split(".");
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return str.join(".");
};
;

export const agruparAsync = async () => {
  await cargar();
  mostrarProductos(productos);
};

function guardarCarritoEnLocalStorage() {
  miLocalStorage.setItem("carrito", JSON.stringify(carrito));
}
export function cargarCarritoDeLocalStorage() {
  if (miLocalStorage.getItem("carrito") !== null) {
      carrito = JSON.parse(miLocalStorage.getItem("carrito"));
      abrirCarrito();
  }
}