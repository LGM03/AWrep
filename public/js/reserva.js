
$(function () {

    $("#confirmarReserva").on("click", function (event) {//valido que la reverva que se va a ha hacer es apta
        event.preventDefault();
        var datosInst = {
            horaIni: $("#horaIniInstalacion").text().trim(),
            horaFin: $("#horaFinInstalacion").text().trim()
        }

        var urlParams = new URLSearchParams(window.location.search);
        var inst = urlParams.get('id');

        var horaIni = $("#horaInicioReserva").prop("value")
        var horaFin = $("#horaFinReserva").prop("value")
        var fecha = $("#fechaReserva").prop("value")

        var datosReserva = {
            correo: $("#correoReserva").prop("value"),
            fechaFin: fecha + "T" + horaFin,
            fechaIni: fecha + "T" + horaIni,
            instalacion: inst
        }

        //Valido que la reserva este en el rango apropiado
   
        if (new Date(fecha) > new Date() && horaIni < horaFin && horaIni >= datosInst.horaIni && horaFin <= datosInst.horaFin) {
            $.ajax({
                method: "POST",
                url: "/reserva/alta",
                data: datosReserva,
                success: function (datos, state, jqXHR) {
                    if (datos > 0) {
                        $("#Reserva").modal('hide')
                        $("#horaInicioReserva").prop("value", "")
                        $("#horaFinReserva").prop("value", "")
                        alert("Reserva realizada con éxito ")
                    } else if(datos == -1) {
                        alert("No se ha podido hacer la reserva. Vuelva a intentarlo")
                    }else{
                        $("#Reserva").modal('hide')
                        $("#horaInicioReserva").prop("value", "")
                        $("#horaFinReserva").prop("value", "")
                        alert("Periodo Ocupado. Se le añade a la lista de Espera")
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

    $(document).on("click", ".masInfo", function () {// doy mas ifi sobre la reserva 
        var divContenedor = $(this).closest('.cajaInfo') //Este es el div padre
        var correo = divContenedor.find('h5').text().slice(15,); //busco el p que contiene el correo 
        data={
            correo:correo
        }
        $.ajax({
            method: "GET",
            url: "/reserva/infoUsuarioReserva",
            data: data,
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    infoAdicional(datos,divContenedor);
                } else {
                    alert("No se tiene mas información de este usuario")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido obtener más información de este usuario")
            }
        });
    })
})

function infoAdicional(element,padre) {
    const caja = $('<div class="mx-auto rounded alert alert-secondary m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')
  
    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');
  
    const nombreCom = $('<h5 class="mb-0"> <strong>Nombre : </strong>'+ element.nombre + ' '+ element.apellido1+ ' '+ element.apellido2+'</h5>')
    const facultad = $('<p class="mb-0"><strong>Facultad : </strong>'+element.facultad + '</p>')
    const clase = $('<p class="mb-0">  <strong>Clase : </strong> '+element.curso + "-"+element.grupo+ '</p>')

    infoContainer.append(nombreCom);
    infoContainer.append(facultad);
    infoContainer.append(clase);

    cajaReserva.append(infoContainer);
  
    caja.append(cajaReserva);
    padre.append(caja);
}
