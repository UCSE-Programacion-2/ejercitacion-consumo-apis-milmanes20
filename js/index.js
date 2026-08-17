// Archivo principal de JavaScript para la ejercitación de Consumo de APIs

/* -------------------------------- CONSIGNA 1 -------------------------------- */
// 1. Realizar una petición a la API de usuarios utilizando fetch().
//    URL: http://localhost:3000/api/user  (iniciar antes con npm start)
// 2. Al recibir la respuesta, convertirla a JSON con response.json().
// 3. Invocar renderizarDatosUsuario() pasándole el objeto JSON completo.
// Función para pedir los datos del usuario a la API
// Ruta al archivo JSON local en tu proyecto
const URL_API = './server/data/users.json';

// Petición a la API / archivo local usando fetch()
fetch(URL_API)
  .then((response) => response.json())
  .then((datos) => {
    // Invocamos la función pasando la respuesta parseada
    renderizarDatosUsuario(datos);
  })
  .catch((error) => console.error('Error al obtener los usuarios:', error));

// 4. Desarrollar renderizarDatosUsuario(datos):
//    - Obtener el usuario desde datos.results[0].
//    - Seleccionar el contenedor con document.querySelector('.tarjeta').
//    - Insertar dentro de .tarjeta (con innerHTML o createElement) estos elementos:
//
//        <img>   → src = picture.large   (la foto circular del usuario)
//        <h2>    → title + first + last  (nombre completo, ej: "Mr John Doe")
//        <p>     → email                 (correo electrónico)
//
//    Estos elementos ya tienen estilos definidos en css/styles.css
//    (.tarjeta img, .tarjeta h2, .tarjeta p).

function renderizarDatosUsuario(datos) {
  // Escribe aquí tu código para mostrar la foto, nombre completo e email en div.tarjeta
  // Obtener el usuario desde datos.results[0]
  const usuario = datos.results[0];

  // Seleccionar el contenedor .tarjeta
  const tarjeta = document.querySelector('.tarjeta');

  // Construir los valores solicitados
  const foto = usuario.picture.large;
  const nombreCompleto = `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`;
  const email = usuario.email;

  // Insertar la estructura dentro de .tarjeta
  tarjeta.innerHTML = `
    <img src="${foto}" alt="Foto de ${nombreCompleto}">
    <h2>${nombreCompleto}</h2>
    <p>${email}</p>
  `;
}

/* -------------------------------- CONSIGNA 2 -------------------------------- */
// 1. Descomentar en index.html el contenedor .btnContainer con el botón #random.
// 2. Desarrollar la función cargarUsuario() o escuchar el evento clic en el botón #random.
// 3. Al hacer clic en el botón, se debe realizar un nuevo pedido a la API
//    y actualizar la tarjeta sin recargar la página.

function cargarUsuario() {
  // Escribe aquí tu código para realizar un nuevo pedido a la API y actualizar la tarjeta
  fetch(URL_API)
    .then((response) => response.json())
    .then((datos) => {
      // Seleccionar un índice aleatorio de la lista de resultados
      const indiceAleatorio = Math.floor(Math.random() * datos.results.length);

      // Crear un objeto simulando la respuesta para ese usuario aleatorio
      const datosAleatorios = {
        results: [datos.results[indiceAleatorio]],
      };

      renderizarDatosUsuario(datosAleatorios);
    })
    .catch((error) => console.error('Error al cargar usuario:', error));
}

//cargarUsuario(); // Llamada inicial para cargar un usuario al cargar la página
