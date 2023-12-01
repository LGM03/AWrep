
$(document).ready(function () {

    $("#confirmarReserva").on("click", function () {
        event.preventDefault();
        var datosInst = {
            horaIni: $("#horaIniInstalacion").text(),
            horaFin: $("#horaFinInstalacion").text()
        }

        var urlParams = new URLSearchParams(window.location.search);
        var inst = urlParams.get('id');

        var horaIni = $("#horaInicio").prop("value")
        var horaFin = $("#horaFin").prop("value")
        var fecha =  $("#fechaReserva").prop("value")
        alert(fecha)
        var datosReserva = {
            correo: $("#correoReserva").prop("value"),
            fechaFin : new Date(`${fecha.toISOString().split('T')[0]}T${horaIni}`),
            fechaIni : new Date(`${fecha.toISOString().split('T')[0]}T${horaFin}`),
            instalacion: inst
        }

        //Valido que la reserva este en el rango apropiado
        if (fecha > new Date() && datosReserva.horaIni < datosReserva.horaFin && datosReserva.horaIni > datosInst.horaIni && datosReserva.horaFin < datosInst.horaFin) {

            $.ajax({
                method: "POST",
                url: "/reserva/alta",
                data: datosReserva,
                success: function (datos, state, jqXHR) {
                    console.log("RESERVA HECHA")
                },
                error: function (jqXHR, statusText, errorThrown) {
                    console.error('Error al enviar el formulario al servidor:', errorThrown);
                },
            });

        }else{
            alert("Los datos de reserva no son validos")
        }

    })
})