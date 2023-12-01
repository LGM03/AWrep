$(document).ready(function () {

    $("#idCrearinstalacion").on("click", function () {

        const fileInput = $("#imagenInstalacion")

        const file = fileInput[0].files[0];

        var datosCrearIns = {
            nombre: $("#nombreInstalacion").prop("value"),
            tipoReserva: $("#tipoReserva").prop("value"),
            imagenInstalaciones: file,
            aforo: $("#aforo").prop("value"),
            horaInicio: $("#horaInicio").prop("value"),
            horaFin: $("#horaFin").prop("value"),
        }

        alert("a"+ datosCrearIns.horaFin)
        
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

