$(document).ready(function () {
    
 $("#idCrearinstalacion").on("click", function(){
    console.log("datosCrearIns")
    var datosCrearIns = {
        nombre: $("#nombre").prop("value"),
        tipoReserva: $("#tipoReserva").prop("value"),
        imagenInstalaciones: $("#imagenInstalaciones").prop("value"),
        aforo: $("#aforo").prop("value"),
        horaInicio: $("#horaInicio").prop("value"),
        horaFin: $("#horaFin").prop("value"),
      }
      console.log(datosCrearIns)

    $.ajax({
        method: "POST",
        url: "/instalaciones/crearInstalacion",
        data: datosCrearIns,
        contentType: false,
        processData: false,
        success: function (datos, state, jqXHR) {
            alert("hola bb")
        },
        error: function (jqXHR, statusText, errorThrown) {
            console.error('Error al enviar el formulario al servidor:', errorThrown);
        },
    });

 })
})