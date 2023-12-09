$(document).ready(function () {
    //CALENDARIO
    $('#calendario').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
        },
        dayRender: function (date, cell) {
            var urlParams = new URLSearchParams(window.location.search);
            var inst = urlParams.get('id');
            var data = {
                id: inst,
                dia: date.format('YYYY-MM-DD')  // Utiliza date.format para obtener la fecha en el formato deseado
            };

            $.ajax({
                method: "GET",
                url: "/reserva/porInstyDia",
                data: data,
                success: function (datos, state, jqXHR) {
                    console.log(datos.reservas);
                    esAdmin = datos.esAdmin;
                    if (datos.reservas.length == 0) {
                        cell.css("background-color", "#50F469");
                    } else {
                        cell.css("background-color", "#EFF450");
                    }
                },
                error: function (jqXHR, statusText, errorThrown) {
                    alert("Ha ocurrido un error con el calendario");
                }
            });
        }, dayClick: function (date, jsEvent, view) {

            if (esAdmin == 0) {
                $('#Reserva').modal('show');
                $("#fechaReserva").prop("value", date.format('YYYY-MM-DD'))

            } else if (esAdmin == 1) {

                $("#historiales").removeClass("d-none")
                $("#historiales .cajaInfo").slideUp(1500);
                var urlParams = new URLSearchParams(window.location.search);
                var inst = urlParams.get('id');
                var data = {
                    id: inst,
                    dia: date.format('YYYY-MM-DD')
                };
                $.ajax({
                    method: "GET",
                    url: "/reserva/porInstyDia",
                    data: data,
                    success: function (datos, state, jqXHR) {
                        console.log(datos.reservas);

                        $("#fechaListaReservas").text("Reservas "+ date.format('DD-MM-YY'))
                        if (datos.reservas.length == 0) {
                            mensajeVacio()
                        } else {
                            datos.reservas.forEach(element => {
                                agregarCajaHistorial(element)
                            });
                        }
                    },
                    error: function (jqXHR, statusText, errorThrown) {
                        alert("Ha ocurrido un error con el calendario");
                    }
                });

            }
        }

    });
})

function agregarCajaHistorial(element) {
    const caja = $('<div class="row cajaInfo rounded m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')

    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');
    const botonX = $('<button type="button" class="btn btn-success m-2"> <span aria-hidden="true">+</span> </button>')
    botonX.addClass("masInfo")

    const nombreCom = $('<h5 class="mb-0"> <strong>Responsable : </strong>' + element.idUsu + '</h5>')
    const fechaCom = $('<p class="mb-0"><strong>Fecha : </strong>' + element.fecha.slice(0, 10) + '</p>')
    const fechaCom2 = $('<p class="mb-0">  <strong>Horas : </strong> ' + element.fecha.slice(11, 16) + "-" + element.fechafinal.slice(11, 16) + '</p>')

    infoContainer.append(botonX);
    infoContainer.append(nombreCom);
    infoContainer.append(fechaCom);
    infoContainer.append(fechaCom2);

    cajaReserva.append(infoContainer);

    caja.append(cajaReserva);
    $("#cajasHistorial").append(caja);
}


function mensajeVacio() {
    var contenedor = $("<div class='col-12 text-center cajaInfo'>")
    var mensaje = $("<h2 class='mt-3'>Historial de reservas vacío</h2>")
    var imagen = $("<img class='img-fluid h-75' src='/images/vacio.png' alt='Imagen de Vacio'>")

    contenedor.append(mensaje)
    contenedor.append(imagen)
    $("#cajasHistorial").append(contenedor)
}
