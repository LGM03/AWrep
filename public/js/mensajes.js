   

$(document).ready(function () {

    $("#idMandarmensaje").on("click", function (event) {
      event.preventDefault();
      // Crear un objeto FormData y agregar datos a él
      var datosMandarmensaje = new FormData();
      datosMandarmensaje.append("correoEmisor", $("#correoEmisor").val());
      datosMandarmensaje.append("correoReceptor", $("#correoReceptor").val());
      datosMandarmensaje.append("cuerpoMensaje", $("#cuerpoMensaje").val());

      /*VALIDAR DATOS*/
      if ($("#correoReceptor").val().trim() == "" || $("#cuerpoMensaje").val().trim() == "" ) {
        alert("Parámetros no válidos")
      } else {
        console.log(datosCrearIns)

        $.ajax({
          method: "POST",
          url: "/mensajes/alta",
          data: datosCrearIns,
          contentType: false,
          processData: false,
          success: function (datos, state, jqXHR) {
            //Cerramos el modal
            if (window.location.pathname == "/" && datos !== "0") { //Si estamos en el / añadimos la tarjeta correspondiente 
              agregarTarjeta(datos)
              $("#Mandarmensaje").modal('hide')
              $("#correoEmisor").prop("value", "")
              $("#correoReceptor").prop("value", "")
              $("#cuerpoMensaje").prop("value", "")
            } else {
              alert("No se ha podido mandar el mensaje, parametros no válidos")
            }
          },
          error: function (jqXHR, statusText, errorThrown) {
            alert("Error al mandar un mensaje")
            console.error('Error al enviar el formulario al servidor:', errorThrown);
          },
        });
      }
  
    })
  
    $('#tipoReserva').change(function () {
      // Verificar si la opción seleccionada es "colectivo"
      console.log("holaaa" + $(this).val() )
      if ($(this).val() == 'Colectiva') {
        console.log("AA")
        $('#campoAforo').removeClass("d-none");
      } else {
        // Ocultar el campo de aforo si no es "colectivo"
        $('#campoAforo').addClass("d-none");
  
      }
    });
  })
   
   
   function agregarTarjetaMensajesRecibidos(datos) {

    var contenedor = $("#zonaMensajesRecibidos")
  
    const correoEmisor = $("#correoEmisor").val()
    const cuerpoMensaje = $("#cuerpoMensaje").val()
  
    var tarjeta = '<div class="col-md-4 pb-4 d-flex">' +
      '<div class="card w-100">' +
      '<div class="card-header CabeceraCarta">' +
      '<h5>' + correoEmisor + '</h5>' +
      '</div>' +
      '<div class="text-center">' +
      '<h5>' + cuerpoMensaje + '</h5>' +
      '</div>' +
      '</div>';
    contenedor.append(tarjeta)
  
  }

  function agregarTarjetaMensajesenviados(datos) {

    var contenedor = $("#zonaMensajesEnviados")
    const correoReceptor = $("#correoReceptor").val()
    const cuerpoMensaje = $("#cuerpoMensaje").val()
  
    var tarjeta = '<div class="col-md-4 pb-4 d-flex">' +
      '<div class="card w-100">' +
      '<div class="card-header CabeceraCarta">' +
      '<h5>' + correoReceptor + '</h5>' +
      '</div>' +
      '<div class="text-center">' +
      '<h5>' + cuerpoMensaje + '</h5>' +
      '</div>' +
      '</div>';
    contenedor.append(tarjeta)
  
  }