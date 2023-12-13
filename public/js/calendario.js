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
                    esAdmin = datos.esAdmin;
                    if (datos.reservas.length == 0) {
                        cell.css("background-color", "#50F469");
                    } else {
                        console.log(date)
                        if (comprobarOcupacion(datos.reservas)) { //Si es true no hay huevos libre 
                            console.log("ROJO")
                            cell.css("background-color", "#FE1E50");
                        } else {
                            console.log("amarillo")
                            cell.css("background-color", "#FFE390");

                        }
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

                $("#cajasEsperas .infoEspera").slideUp(1500);
                $("#cajasEsperas .cajaInfo").slideUp(1500)

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

                        $("#fechaListaReservas").text("Reservas " + date.format('DD-MM-YY'))
                        if (datos.reservas.length == 0) {
                            mensajeVacio($("#cajasHistorial"), "Historial de reservas vacío")
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


                $.ajax({
                    method: "GET",
                    url: "/reserva/leerListaEspera",
                    data: data,
                    success: function (datos, state, jqXHR) {

                        $("#ListaEspera").text("Lista de Espera " + date.format('DD-MM-YY'))
                        if (datos.length == 0) {
                            mensajeVacio($("#cajasEsperas"), "Lista de Espera vacía")
                        } else {
                            datos.forEach(element => {
                                elementoListaEspera(element, $("#cajasEsperas"))
                            });
                        }
                    },
                    error: function (jqXHR, statusText, errorThrown) {
                        alert("Ha ocurrido un error con el calendario");
                    }
                });


            } else {
                alert("Inicia sesión con una cuenta validada")
            }
        }

    });
})

function agregarCajaHistorial(element) {
    var fechaIni = moment(element.fecha, 'YYYY-MM-DD HH:mm:ss');
    fechaIni.add(1, 'hour');
    var fechaFin = moment(element.fechafinal, 'YYYY-MM-DD HH:mm:ss');
    fechaFin.add(1, 'hour');

    const caja = $('<div class="row cajaInfo rounded m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')

    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');
    const botonX = $('<button type="button" class="btn btn-success m-2"> <span aria-hidden="true">+</span> </button>')
    botonX.addClass("masInfo")

    const nombreCom = $('<h5 class="mb-0"> <strong>Responsable : </strong>' + element.idUsu + '</h5>')
    const fechaCom = $('<p class="mb-0"><strong>Fecha : </strong>' + fechaIni.format('DD-MM-YYYY') + '</p>')
    const fechaCom2 = $('<p class="mb-0">  <strong>Horas : </strong> ' + fechaIni.format('HH:mm') + "-" + fechaFin.format('HH:mm') + '</p>')

    infoContainer.append(botonX);
    infoContainer.append(nombreCom);
    infoContainer.append(fechaCom);
    infoContainer.append(fechaCom2);

    cajaReserva.append(infoContainer);

    caja.append(cajaReserva);
    $("#cajasHistorial").append(caja);
}

function elementoListaEspera(element, padre) {
    const caja = $('<div class="row rounded alert alert-secondary infoEspera m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')
    const botonX = $('<button type="button" class="btn btn-danger m-2 eliminarElementoEspera"> <span aria-hidden="true">X</span> </button>')


    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mx-auto"></div>');

    const correo = $('<h5 class="mb-0"> <strong>Correo : </strong>' + element.correo + '</h5>')

    const nombreCom = $('<h5 class="mb-0"> <strong>Nombre : </strong>' + element.nombre + ' ' + element.apellido1 + ' ' + element.apellido2 + '</h5>')
    const facultad = $('<p class="mb-0"><strong>Facultad : </strong>' + element.facultad + '</p>')
    const clase = $('<p class="mb-0">  <strong>Clase : </strong> ' + element.curso + "-" + element.grupo + '</p>')
  
    infoContainer.append(botonX)
    infoContainer.append(correo)
    infoContainer.append(nombreCom);
    infoContainer.append(facultad);
    infoContainer.append(clase);

    cajaReserva.append(infoContainer);

    caja.append(cajaReserva);
    caja.data("idEspera",element.id)
    padre.append(caja);
}

function mensajeVacio(padre, info) {
    var contenedor = $("<div class='col-12 text-center cajaInfo'>")
    var mensaje = $("<h2 class='mt-3'></h2>")
    var imagen = $("<img class='img-fluid w-25' src='/images/vacio.png' alt='Imagen de Vacio'>")
    mensaje.text(info)

    contenedor.append(mensaje)
    contenedor.append(imagen)
    padre.append(contenedor)
}

function comprobarOcupacion(reservas) {
    //Retorno falso si hay huecos libres para otra reserva
    //No habrá huecos cuando al terminar una reserva inicie inmediatamente la siguiente

    var iniReserva = moment(reservas[0].fecha, 'YYYY-MM-DD HH:mm:ss'); //Primera Reserva
    iniReserva.add(1, 'hour');

    var iniInstalación = moment($("#horaIniInstalacion").text(), 'HH:mm');

    var finInstalación = moment($("#horaFinInstalacion").text(), 'HH:mm'); //Ultima Reserva

    var finReserva = moment(reservas[reservas.length - 1].fechafinal, 'YYYY-MM-DD HH:mm:ss');
    finReserva.add(1, 'hour');


    if (iniReserva.format("HH:mm") > iniInstalación.format("HH:mm")) {
        return false //Retorno falso cuando hay tiempo entre la apertura de la instalacion y la primera reserva
    }

    if (finReserva.format("HH:mm") < finInstalación.format("HH:mm")) {  //Compruebo que la ultima reserva acabe al cierre de la inst
        return false;
    }

    for (var i = 1; i < reservas.length; i++) {

        var iniActual = moment(reservas[i].fecha, 'YYYY-MM-DD HH:mm:ss');
        iniActual.add(1, 'hour');
        var finAnterior = moment(reservas[i - 1].fechafinal, 'YYYY-MM-DD HH:mm:ss');
        finAnterior.add(1, 'hour');

        if (iniActual.format("HH:mm") > finAnterior.format("HH:mm")) {
            console.log("C")
            return false
        }
    }


    return true;
}

$(document).on("click", ".eliminarElementoEspera", function () {
    var divContenedor = $(this).closest('.infoEspera') //Este es el div padre
    var correo = divContenedor.find('h5').text().slice(15,); //busco el p que contiene el correo 
    data={
        idEspera : divContenedor.data("idEspera")
    }
    $.ajax({
        method: "DELETE",
        url: "/reserva/eliminarEspera",
        data: data,
        success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
            if (datos !== "0") {
                
               

                divContenedor.slideUp(1500,function () {
                    alert("Elemento de lista de Espera eliminado")
                })


            } else {
                alert("No se pudo eliminar el elemento de la reserva")
            }
        },
        error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
            alert("No se ha podido obtener más información de este usuario")
        }
    });
})