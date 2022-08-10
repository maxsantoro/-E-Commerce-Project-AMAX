// Obteniendo elementos

let boton = document.getElementById("botonproductos");
let plant = document.getElementById("plant");
let body = document.getElementById("bodycontenedor");
let displayCarrito = document.getElementById("abrircarrito");
let cardCarrito = document.getElementById("cardCarrito");
let padre = document.getElementById("plant");
let cerrarCarrito = document.querySelector(".display");

//Productos
let carrito = [];
let productos = [];

class Product {
  constructor(id, nombre, precio, stock, descripcion, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock,
    this.descripcion = descripcion;
    this.img = img;
    this.cantidad = cantidad;
  }
}

productos.push(
  new Product(
    1,
    "Ampli Mini",
    50000,
    5,
    "Ampli Mini",
    "https://www.gaesmedica.com/es-es/uploads/imgen/3307_960x960-imgen-3307-ampli-mini-i-5-1280x1280.jpeg",
    1
  )
);
productos.push(
  new Product(
    2,
    "Ampli Connect",
    60000,
    5,
    "Ampli Connect",
    "https://www.gaesmedica.com/es-es/uploads/imgen/3315_960x960-imgen-3315-ampli-connect-b-5-1280x1280.jpeg",
    1
  )
);
productos.push(
  new Product(
    3,
    "Ampli Energy",
    70000,
    5,
    "Ampli Energy",
    "https://www.gaesmedica.com/es-es/uploads/imgen/3321_960x960-imgen-3321-ampli-energy-b-5-1280x1280.jpeg",
    1
  )
);
productos.push(
  new Product(
    4,
    "Ampli Easy",
    80000,
    5,
    "Ampli Easy",
    "https://www.gaesmedica.com/es-es/uploads/imgen/3318_960x960-imgen-3318-ampli-easy-b-2-1280x1280.jpeg",
    1
  )
);

// Funcion para agregar al carrito

function agregarAlCarrito(item) {
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
          "Producto agregado satisfactoriamente!",
          "Podras ver tu producto en la seccion de carrito.",
          "success"
        );
        carrito.push(item);
        let carritoJson = JSON.stringify(carrito);
        localStorage.setItem("datosDeCarrito", carritoJson);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelado",
          "Producto eliminado satisfactoriamente",
          "error"
        );
      }
    });
}

function vaciarCarrito() {
  carrito = [];
  abrirCarrito();
  localStorage.clear();
}

//funcion para agregar evento al boton de ver productos
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
    botonAgregarCarrito.addEventListener("click", () => agregarAlCarrito(i));
  });
}

//Abrir carrito una vez que agregamos los productos

displayCarrito.addEventListener("click", () => abrirCarrito());

const abrirCarrito = () => {
  if (carrito.length === 0) {
    displayCarrito.innerHTML = `El carrito esta Vacio`;
  } else {
    let obtenerDatosCarrito = localStorage.getItem("datosDeCarrito");
    carrito = JSON.parse(obtenerDatosCarrito);
    carrito.forEach((e) => {
      let crearCarrito = document.createElement("div");
      crearCarrito.innerHTML = `
           <section class="h-100" style="background-color: #eee;">
           <div class="container h-100 py-5">
               <div class="row d-flex justify- content-center align-items-center h-100">
               <div class="col-10">    
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h3 class="fw-normal mb-0 text-black">Mi carrito</h3>
                  <div>
                    <button type="button" id="vaciar" class=" mb-0 btn btn-warning btn-block ">Vaciar Carrito</button>
                  </div>
                  <div>
                    <button type="button" class=" mb-0 btn btn-warning btn-block cerrar">Cerrar carrito</button>
                  </div>
                </div>
        
                <div class="card rounded-3 mb-4">
                  <div class="card-body p-4">
                    <div class="row d-flex justify-content-between align-items-center">
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src="${e.img}"
                          class="img-fluid rounded-3" alt="producto">
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <p class="lead fw-normal mb-2">${e.nombre}</p>
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                          -
                        </button>
        
                        <input id="form1" min="0" name="quantity" value="1" type="number"
                          class="form-control form-control-sm" />
        
                        <button class="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                          +
                        </button>
      
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 class="mb-0">${e.precio}</h5>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" class="text-danger"><i class="fas fa-trash fa-lg"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div class="card mb-4">
                  <div class="card-body p-4 d-flex flex-row">
                   <form action = "" id ="form" class="form-outline flex-fill">
                      <input id="inputdescuento" type="text" id="form1" class="form-control form-control-lg" />
                      <label  class="form-label" for="form1">Codigo de descuento</label>
                     <button type="submit" id="botondescuento" class="btn btn-outline-warning btn-lg ms-3">Aplicar</button>
                    </form>
                </div>
        
                <div class="card">
                  <div class="card-body">
                    <button type="button" class="btn btn-warning btn-block btn-lg">Proceder a pagar</button>
                  </div>
                </div>
        
              </div>
            </div>
          </div>
           </section>`;
      padre.append(crearCarrito);

    const form = document.querySelector('#form');
    
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let input = document.querySelector('#inputdescuento').value;
     // Funciona el input 
    })


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
};
