$(document).ready(function () {

  $("#idCrearinstalacion").on("click", function (event) {
    event.preventDefault();
    const fileInput = $("#imagenInstalacion");

    // Crear un objeto FormData y agregar datos a él
    var datosCrearIns = new FormData();
    datosCrearIns.append("nombre", $("#nombreInstalacion").val());
    datosCrearIns.append("tipoReserva", $("#tipoReserva").val());
    datosCrearIns.append("imagenInstalacion", fileInput[0].files[0]);
    datosCrearIns.append("aforo", $("#aforo").val());
    datosCrearIns.append("horaInicio", $("#horaInicio").val());
    datosCrearIns.append("horaFin", $("#horaFin").val());

    /*VALIDAR DATOS*/
    if ($("#nombreInstalacion").val().trim() == "" || $("#tipoReserva").val() == null || $("#aforo").val() == 0 || $("#horaFin").val() == "" || $("#horaInicio").val() == "" || !imagenValida($("#imagenInstalacion")[0].files[0]) || $("#horaFin").val() <= $("#horaInicio").val()  ) {
      alert("Parámetros no válidos")
    } else {
      $.ajax({
        method: "POST",
        url: "/instalaciones/crearInstalacion",
        data: datosCrearIns,
        contentType: false,
        processData: false,
        success: function (datos, state, jqXHR) {
          //Cerramos el modal
          if (window.location.pathname == "/" && datos !== "0") { //Si estamos en el / añadimos la tarjeta correspondiente 
            agregarTarjeta(datos)
            $("#CrearInstalacion").modal('hide')
            $("#nombreInstalacion").prop("value","")
            $("#tipoReserva").prop("value","")
            $("#imagenInstalacion").prop("value","")
            $("#horaInicio").prop("value","")
            $("#horaFin").prop("value","")
            $("#aforo").prop("value","")

          } else {
            alert("No se ha podido crear la instalación, parametros no válidos")
          }
        },
        error: function (jqXHR, statusText, errorThrown) {
          alert("Error al crear la instalacion")
          console.error('Error al enviar el formulario al servidor:', errorThrown);
        },
      });
    }

  })
})

function agregarTarjeta(datos) {

  var contenedor = $("#zonaTarjetas")

  const nombre = $("#nombreInstalacion").val()
  const tipo = $("#tipoReserva").val()

  var tarjeta = '<div class="col-md-4 pb-4 d-flex">' +
    '<div class="card w-100">' +
    '<div class="card-header CabeceraCarta">' +
    '<h5>' + nombre + '</h5>' +
    '</div>' +
    '<div class="text-center">' +
    '<img class="card-img-top img-fluid imagenInstalacion" src="' + datos.imagen + '" alt="Imagen no cargada">' +
    '</div>' +
    '<div class="card-footer">' +
    '<p class="card-text col-6">' + tipo + '</p>' +
    '<a href="./instalaciones?id=' + datos.id + '" class="btn botonsabermas col-6">Saber Más</a>' +
    '</div>' +
    '</div>' +
    '</div>';


  contenedor.append(tarjeta)

}

function imagenValida(imagen) {
  var comprobarEx = /(\.png)$/i;
  if (!imagen || !comprobarEx.exec(imagen.name) || imagen.size > 400000) {
      return false;
  }

  return true
}

