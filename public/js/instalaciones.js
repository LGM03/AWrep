$(document).ready(function () {

    $("#idCrearinstalacion").on("click", function () {

         const fileInput = $("#imagenInstalacion");

        // Crear un objeto FormData y agregar datos a él
        var datosCrearIns = new FormData();
        datosCrearIns.append("nombre", $("#nombreInstalacion").val());
        datosCrearIns.append("tipoReserva", $("#tipoReserva").val());
        datosCrearIns.append("imagenInstalacion", fileInput[0].files[0]);
        datosCrearIns.append("aforo", $("#aforo").val());
        datosCrearIns.append("horaInicio", $("#horaInicio").val());
        datosCrearIns.append("horaFin", $("#horaFin").val());
        
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

