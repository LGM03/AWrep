$(document).ready(function () {

  $("#botonMensajesRecibidos").on("click", function () {
    $("#mensajesRecibidos").fadeIn(1000)
    $("#mensajesEnviados").fadeOut(0)

    $.ajax({
      method: "GET",
      url: "/mensajes",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoReceptor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            if(element.correoReceptor == datos.usuario.correo){
              agregarCajaRecibidosMensajes(element)
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
    $("#mensajesEnviados").fadeIn(1000)
    $("#mensajesRecibidos").fadeOut(0)

    $.ajax({
      method: "GET",
      url: "/mensajes",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoEmisor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            if(element.correoEmisor == datos.usuario.correo){
              agregarCajaEnviadosMensajes(element)
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

  $("#idMandarMensaje").on("click", function (event) {  //TODO validacion en cliente de valores


    var datosMensaje = {
      correoEmisor: $("#correoEmisor").prop("value"),
      correoReceptor: $("#correoReceptor").prop("value"),
      cuerpoMensaje: $("#cuerpoMensaje").prop("value"),
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
