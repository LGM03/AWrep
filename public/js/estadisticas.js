$(document).ready(function () {

    $(document).on("click", ".cancelarReserva", function (event) { //TODO notificacion

        var divContenedor = $(this).closest('.cajaUsuario'); // Este es el div padre 
        var idReserva = divContenedor.data("id")
        var fecha =  $(this).closest('em');
        console.log(fecha)
        var data = {
            idReserva: idReserva
        };

        $.ajax({
            method: "DELETE",
            url: "/reserva/borrarReserva",
            data: data,
            success: function (datos, state, jqXHR) { // Si todo ha ido bien pongo un mensaje de acierto
                if (datos == "1") {
                    notificarUsuario(idReseva,fecha)
                    divContenedor.slideUp(2000)

                } else {
                    alert("No se ha podido borrar la reserva");
                }
            },
            error: function (jqXHR, statusText, errorThrown) { // Si ha ocurrido un error pongo un mensaje de error
                alert("Ha ocurrido un error con los usuarios");
            }
        });
    })
})

