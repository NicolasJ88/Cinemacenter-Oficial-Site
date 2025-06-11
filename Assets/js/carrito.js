// Sistema simple de carrito de compras
let carrito = []

// Cargar carrito desde localStorage al iniciar
function cargarCarrito() {
  const carritoGuardado = localStorage.getItem("carritoCompras")
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado)
  }
  actualizarContador()
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carritoCompras", JSON.stringify(carrito))
}

// Agregar item al carrito
function addToCart(nombre, tipo) {
  // Verificar si el item ya existe
  const itemExistente = carrito.find((item) => item.nombre === nombre)

  if (itemExistente) {
    itemExistente.cantidad += 1
  } else {
    carrito.push({
      nombre: nombre,
      tipo: tipo,
      cantidad: 1,
    })
  }

  guardarCarrito()
  actualizarContador()
}

// Actualizar contador en el navbar
function actualizarContador() {
  const contador = document.getElementById("cart-count")
  if (contador) {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0)
    contador.textContent = totalItems
  }
}

// Mostrar los items en la página del carrito
function mostrarCarrito() {
  const contenedorCarrito = document.getElementById("carrito-items")
  if (!contenedorCarrito) return

  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = `
      <div class="text-center p-5">
        <h3>Tu Lista está vacía</h3>
        <p>¡Explora nuestro catálogo y agrega tus películas, series y documentales favoritos!</p>
        <a href="index.html" class="btn-view-more mt-3">Ir al inicio</a>
      </div>
    `
    return
  }

  let html = ""
  carrito.forEach((item, index) => {
    html += `
      <div class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title">${item.nombre}</h5>
              <p class="card-text">Tipo: ${item.tipo}</p>
              <p class="card-text">Cantidad: ${item.cantidad}</p>
            </div>
            <button class="btn-add-cart" onclick="eliminarItem(${index})">Eliminar</button>
          </div>
        </div>
      </div>
    `
  })

  contenedorCarrito.innerHTML = html
}

// Eliminar un item del carrito
function eliminarItem(index) {
  carrito.splice(index, 1)
  guardarCarrito()
  actualizarContador()
  mostrarCarrito()
}

// Vaciar todo el carrito
function vaciarCarrito() {
  carrito = []
  guardarCarrito()
  actualizarContador()
  mostrarCarrito()
}

// Inicializar cuando la página carga
document.addEventListener("DOMContentLoaded", () => {
  cargarCarrito()

  // Si estamos en la página del carrito, mostrar los items
  if (window.location.pathname.includes("carrito.html")) {
    mostrarCarrito()
  }
})
