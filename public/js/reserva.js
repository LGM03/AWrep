
$(document).ready(function () {

    $("#confirmarReserva").on("click", function () {
        event.preventDefault();
        var datosInst = {
            horaIni: $("#horaIniInstalacion").text().trim(),
            horaFin: $("#horaFinInstalacion").text().trim()
        }

        var urlParams = new URLSearchParams(window.location.search);
        var inst = urlParams.get('id');

        var horaIni = $("#horaInicio").prop("value")
        var horaFin = $("#horaFin").prop("value")
        var fecha = $("#fechaReserva").prop("value")

        var datosReserva = {
            correo: $("#correoReserva").prop("value"),
            fechaFin: fecha + "T" + horaIni,
            fechaIni: fecha + "T" + horaFin,
            instalacion: inst
        }

        //Valido que la reserva este en el rango apropiado
        if (new Date(fecha) > new Date() && horaIni < horaFin && horaIni > datosInst.horaIni && horaFin < datosInst.horaFin) {
            $.ajax({
                method: "POST",
                url: "/reserva/alta",
                data: datosReserva,
                success: function (datos, state, jqXHR) {
                    if (datos > 0) {
                        alert("Reserva realizada con éxito ")
                        $("#Reserva").modal('hide')
                        $("#horaInicio").prop("value", "")
                        $("#horaFin").prop("value", "")
                        $("#fechaReserva").prop("value", "")
                    } else {
                        alert("No se ha podido hacer la reserva")
                    }

                },
                error: function (jqXHR, statusText, errorThrown) {
                    console.error('Error al enviar el formulario al servidor:', errorThrown);
                },
            });

        } else {
            alert("Los datos de reserva no son validos")
        }

    })
})