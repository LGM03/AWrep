$(function () {

  $("#botonMensajesRecibidos").on("click", function () {
    $("#mensajesRecibidos").fadeIn(1000)
    $("#mensajesEnviados").hide()
    $("#mensajesRecibidos .cajaMensaje").hide()
    $.ajax({
      method: "GET",
      url: "/mensajes/leerEnviados",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoReceptor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            if(element.correoReceptor == datos.usuario.correo){
              agregarCajaRecibidosMensajes(element,$("#cajamensajesRecibidos"))
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
    $("#mensajesRecibidos").hide()
    
    $("#mensajesEnviados .cajaMensaje").hide()

    $.ajax({
      method: "GET",
      url: "/mensajes/leerEnviados",
      data: {  },
      success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
        if (datos !== "0") {
          $("#CorreoEmisor").text(datos.usuario)
          datos.mensajes.forEach(element => {
            if(element.correoEmisor == datos.usuario.correo){
    
              agregarCajaEnviadosMensajes(element,$("#cajamensajesEnviados"))
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
     
    event.preventDefault()
    var datosMensaje = {
      correoEmisor: $("#correoEmisor").prop("value"),
      correoReceptor: $("#correoReceptor").prop("value"),
      cuerpoMensaje: $("#cuerpoMensaje").prop("value"),
      fecha : new Date().toLocaleString()
      }

      $.ajax({
        method: "POST",
        url: "/mensajes/mandarMensaje",
        data: datosMensaje,
        success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
          if (datos !== "0") {
            $("#MandarMensaje").modal('hide')
            if(!$("#cajamensajesEnviados").hasClass('d-none')){
              actualizarCajaEnviadosMensajes(datosMensaje,$("#cajamensajesEnviados"))
            }
            $("#correoReceptor").prop("value","")
            $("#cuerpoMensaje").prop("value","")

            alert("Mensaje enviado con éxito ")
          } else {
            alert("Correo Destinatario no válido")
          }
        },
        error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
          alert("Ha ocurrido un error enviando el mensaje")
        }
      });
    
  })
})

function agregarCajaRecibidosMensajes(mensaje, padre){

  var fecha = mensaje.fecha.slice(0,10)
  var hora = mensaje.fecha.slice(11,-8)
  var cajaMensaje = `<div class="row align-items-center m-2 my-2 cajaMensaje">
  <div class="col-12 cajamensaje d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center mb-1">
          <h5 class="mb-0">
               ${mensaje.correoEmisor}
          </h5>
          <p class="mb-0"><em>
          ${fecha}   ${hora}
              </em></p>
      </div>
      <p class="mb-0" style="text-align: left;">
      ${mensaje.cuerpoMensaje}
      </p>
  </div>
</div>`

padre.append(cajaMensaje)
padre.removeClass("d-none")


}

function agregarCajaEnviadosMensajes(mensaje, padre){

  var fecha = mensaje.fecha.slice(0,10)
  var hora = mensaje.fecha.slice(11,-8)
  var cajaMensaje = `<div class="row align-items-center m-2 my-2 cajaMensaje">
  <div class="col-12 cajamensaje d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center mb-1">
          <h5 class="mb-0">
               ${mensaje.correoReceptor}
          </h5>
          <p class="mb-0"><em>
          ${fecha}   ${hora}
              </em></p>
      </div>
      <p class="mb-0" style="text-align: left;">
      ${mensaje.cuerpoMensaje}
      </p>
  </div>
</div>`

padre.append(cajaMensaje)
padre.removeClass("d-none")


}


function actualizarCajaEnviadosMensajes(mensaje, padre){

  var cajaMensaje = `<div class="row align-items-center m-2 my-2 cajaMensaje">
  <div class="col-12 cajamensaje d-flex flex-column">
      <div class="d-flex justify-content-between align-items-center mb-1">
          <h5 class="mb-0">
               ${mensaje.correoReceptor}
          </h5>
          <p class="mb-0"><em>
          ${mensaje.fecha}  
              </em></p>
      </div>
      <p class="mb-0" style="text-align: left;">
      ${mensaje.cuerpoMensaje}
      </p>
  </div>
</div>`

padre.children().first().after(cajaMensaje);
padre.removeClass("d-none")


}