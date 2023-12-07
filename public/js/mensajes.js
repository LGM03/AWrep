$(document).ready(function () {

  $("#botonMensajesRecibidos").on("click", function () {
    $("#botonMensajesRecibidos").hide()
    $("#mensajesRecibidos").fadeIn(1000)

    $.ajax({
      method: "GET",
      url: "/mensajes",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoReceptor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            if(element.correoReceptor == datos.usuario.correo){
              agregarCajaMensajes(element)
            }
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
    $("#botonMensajesEnviados").hide()
    $("#mensajesEnviados").fadeIn(1000)

    $.ajax({
      method: "GET",
      url: "/mensajes",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoEmisor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            if(element.correoEmisor == datos.usuario.correo){
              agregarCajaMensajes(element)
            }
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

  $("#idMandarMensaje").on("click", function (event) {


    var datosMensaje = {
      correoEmisor: $("#correoEmisor").prop("value"),
      correoReceptor: $("#correoReceptor").prop("value"),
      cuerpoMensaje: $("#cuerpoMensaje").prop("value"),
      fecha: new Date().toISOString(),
      }


      $.ajax({
        method: "POST",
        url: "/mensajes/mandarMensaje",
        data: datosMensaje,
        success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
          if (datos !== "0") {
            alert("Mensaje enviado con éxito ")
          } else {
            alert("No se pudo enviar el mensaje")
          }
        },
        error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
          console.error('Error al enviar el formulario al servidor:', errorThrown);
          console.error('Error al enviar el formulario al servidor:', statusText);
          console.error('Error al enviar el formulario al servidor:', jqXHR);
          alert(errorThrown)
        }
      });
    
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