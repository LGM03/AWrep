$(document).ready(function () {

  $("#botonMensajesRecibidos").on("click", function () {
    $("#botonMensajes").hide()
    $("#mensajes").fadeIn(1000)

    $.ajax({
      method: "GET",
      url: "/mensajes",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoReceptor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            agregarCajaMensajes(element)
          });
        } else {
          alert("Ha ocurrido un error con los mensajes")
        }
      },
      error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
        alert("Ha ocurrido un error con los mensajes")
      }
    });
  })

  $("#botonMensajesEnviados").on("click", function () {
    $("#botonMensajes").hide()
    $("#mensajes").fadeIn(1000)

    $.ajax({
      method: "GET",
      url: "/mensajes",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoEmisor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            agregarCajaMensajes(element)
          });
        } else {
          alert("Ha ocurrido un error con los mensajes")
        }
      },
      error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
        alert("Ha ocurrido un error con los mensajes")
      }
    });
  })

  $("#idComentar").on("click", function (event) {

    const coment = $("#comentarioNuevo").prop("value")
    event.preventDefault();
    if (coment.trim() === "") {
      alert("No se pueden publicar comentarios vacíos")
    } else {

      var urlParams = new URLSearchParams(window.location.search);
      var dest = urlParams.get('id');

     
      $.ajax({
        method: "POST",
        url: "/mensajes",
        data: { comentario: coment, destino: dest },
        success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
          if (datos !== "0") {
            element = {
              nombre_usuario: datos,
              fecha_comentario: new Date().toISOString(),
              comentario: coment
            }
            $('#comentarioNuevo').prop('value', '');
            agregarCajaComentario(element)
          } else {
            alert("No se pudo publicar el comentario")
          }
        },
        error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
          alert("No se pudo publicar el comentario")
        }
      });
    }
  })
})




function agregarCajaMensajes(element) {
  const caja = $('<div class="row cajaComentario rounded m-2"></div>');

  // Sección de imagen de usuario
  const cajaImagen = $('<div class="col-2"></div>')
  const imagen = $('<img src="/images/usuario.png" alt="Foto del usuario" class="img-fluid">');
  cajaImagen.append(imagen);

  // Sección de info del comentario
  const cajaMensaje = $('<div class="col-10 d-flex flex-column"></div>')

  // Contenedor para el nombre y la fecha
  const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');

  const correo = $('<h5 class="mb-0"></h5>').text(element.correoReceptor);
  const fechaMen = $('<p class="mb-0"><em></em></p>').text(element.fecha.slice(0, 10));

  infoContainer.append(correo);
  infoContainer.append(fechaMen);

  const textoCom = $('<p class="mb-0"></p>').text(element.cuerpoMensaje).css('text-align', 'left');;

  cajaMensaje.append(infoContainer);
  cajaMensaje.append(textoCom);

  caja.append(cajaImagen);
  caja.append(cajaMensaje);
  $("#cajasComentarios").prepend(caja);
}