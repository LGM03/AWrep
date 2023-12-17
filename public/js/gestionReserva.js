$(function () {

    $("#periodoCheckbox").change(function () { //Cuando se pulse el checkbox
        if ($(this).is(':checked')) {
            $("#filtroFin").removeClass("d-none")
        } else {
            $("#filtroFin").addClass("d-none")
            $("#fechaFinFiltro").prop("value", "")
        }
    })

    $("#filtrarReservas").on("click", function (event) {
        event.preventDefault();
        $("#divListaReservas .cajaUsuario").slideUp(1000);

        filtro = {
            fechaIni: $("#fechaIniFiltro").prop("value"),
            fechaFin: $("#fechaFinFiltro").prop("value"),
            instalacion: $("#instalacionFiltro").prop("value")
        }

        if (validarFiltro(filtro)) {

            $.ajax({
                method: "GET",
                url: "/reserva/filtrar",
                data: filtro,  // Enviar los datos como parte de la solicitud GET
                success: function (datos, state, jqXHR) {

                    if (datos.datos.length > 0) {
                        var existe = false

                        datos.datos.forEach(element => {

                            const arrayBuffer = element.imagenIns.data; //recojo la imagen de la instalacion y la paso a URL
                            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                            const url = `data:image/png;base64,${base64String}`;

                            const arrayBufferUsu = element.imagenUsu.data; //recojo la imagen de la instalacion y la paso a URL
                            const base64StringUsu = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBufferUsu)));
                            const urlUsu = `data:image/png;base64,${base64StringUsu}`;

                            element.urlImagen = url
                            element.nombre = element.nombre + " " + element.apellido1 + " " + element.apellido2
                            element.imagenUsu = urlUsu
                            element.clase = element.curso + " " + element.grupo

                            var fecha = new Date(element.fecha);
                            var fechafinal = new Date(element.fechafinal);
                            element.fecha = fecha.toLocaleString()
                            element.fechafinal = fechafinal.toLocaleString()

                            agregarCajaReserva(datos.esAdmin, element, $("#divListaReservas"))

                            existe = true

                        });
                    }
                    if (!existe) {
                        var alerta = $('<h5 class="mt-3 alert alert-warning cajaUsuario">No hay reservas que mostrar</h2>');
                        $("#divListaReservas .cajaUsuario").slideUp(1000)
                        $("#divListaReservas").append(alerta);
                    }
                },
                error: function (jqXHR, statusText, errorThrown) {
                    console.log(errorThrown)
                    alert("Ha ocurrido un error con los usuarios A");
                }
            })
        }
    })

    $(document).on("click", ".cancelarReserva", function (event) { //TODO notificacion

        var divContenedor = $(this).closest('.cajaUsuario'); // Este es el div padre 
        var idReserva = divContenedor.data("id")

        var data = {
            idReserva: idReserva
        };

        $.ajax({
            method: "DELETE",
            url: "/reserva/borrarReserva",
            data: data,
            success: function (datos, state, jqXHR) { // Si todo ha ido bien pongo un mensaje de acierto
                if (datos == "1") {
                    divContenedor.slideUp(1000)

                } else {
                    alert("No se ha podido borrar la reserva");
                }
            },
            error: function (jqXHR, statusText, errorThrown) { // Si ha ocurrido un error pongo un mensaje de error
                alert("Ha ocurrido un error para borrar la reserva");
            }
        });
    })
})


function agregarCajaReserva(esAdmin, element, padre) {
    const caja = $('<div class="row cajaUsuario rounded m-2"></div>');
    // Sección de info de la reserva

    const cajaImagen = $('<div class="col-md-2 col-sm-5 d-flex justify-content-between align-items-center "> </div>')
    const imagen = '<img src="' + element.urlImagen + '" alt="Foto del usuario" class="img-fluid logoUsuario mt-2"></div>'
    cajaImagen.append(imagen)

    // Contenedor para el nombre y la fecha
    const cajaNombre = $('<div class="col-md-3 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const nombreCom = $('<h5 class="mb-0"> <strong>Instalación : </strong>' + element.nombreIns + '</h5>')
    cajaNombre.append(nombreCom)

    var botonCancelar = $('<button class="btn btn-danger m-2 cancelarReserva"> X </button>');

    const cajatipo = $('<div class=" col-md-2 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const tipo = $('<p class="mb-0"><strong>Tipo: </strong>' + element.tipoReserva + '</p>')
    cajatipo.append(tipo)

    const cajaAforo = $('<div class="col-md-2 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const aforo = $('<p class="mb-0"><strong>Aforo: </strong>' + element.aforo + '</p>')
    cajaAforo.append(aforo)

    const cajaPlazo = $('<div class=" col-md-3 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const plazo = $('<p class="mb-0">  <strong>Plazo de la Reserva : </strong> <em>' + element.fecha.slice(0, 10) + '</em> ' + element.fecha.slice(11, -3) + "-" + element.fechafinal.slice(11, -3) + '</p>')
    cajaPlazo.append(plazo)

    caja.append(cajaImagen)
    caja.append(cajaNombre)
    caja.append(cajatipo)
    caja.append(cajaAforo)
    caja.append(cajaPlazo)

    caja.data("id", element.id) //Esto va a permitir saber que reserva hay que eliminar 
    padre.append(caja);
    if (esAdmin == 0) {
        cajaPlazo.append(botonCancelar);
    } else {
        infoUsuario(element, caja)
    }
}

function infoUsuario(datos, padre) {

    const caja = $('<div class="row alert alert-secondary  rounded m-2"></div>');
    // Sección de info de la reserva

    const cajaImagen = $('<div class="col-md-2 col-sm-5 d-flex justify-content-between align-items-center "> </div>')
    const imagen = '<img src="' + datos.imagenUsu + '" alt="Foto del usuario" class="img-fluid logoUsuario mt-2"></div>'
    cajaImagen.append(imagen)

    // Contenedor para el nombre y la fecha
    const cajaNombre = $('<div class="col-md-3 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const nombreCom = $('<p><strong>' + datos.nombre + '</strong></p>')
    cajaNombre.append(nombreCom)

    const cajaCorreo = $('<div class=" col-md-2 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const correo = $('<p class="mb-0"><strong>Correo: </strong>' + datos.correo + '</p>')
    cajaCorreo.append(correo)

    const cajaFacultad = $('<div class="col-md-2 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const facultad = $('<p class="mb-0"><strong>Facultad: </strong>' + datos.facultad + '</p>')
    cajaFacultad.append(facultad)

    const cajaClase = $('<div class=" col-md-3 col-sm-5  d-flex justify-content-between align-items-center mb-1"></div>');
    const clases = $('<p class="mb-0">  <strong>Grupo : </strong> <em>' +datos.clase+ '</p>')
    cajaClase.append(clases)

    caja.append(cajaImagen)
    caja.append(cajaNombre)
    caja.append(cajaCorreo)
    caja.append(cajaFacultad)
    caja.append(cajaClase)

    padre.append(caja);
}

function validarFiltro(datos) {
    var nombre = $("#nombreFiltrar").prop("value")
    var apellido1 = $("#apellido1Filtrar").prop("value")
    var apellido2 = $("#apellido2Filtrar").prop("value")
    var correo = $("#correoFiltrar").prop("value")
    var facultad = $("#facultadFiltrar").prop("value")

    if (nombre && nombre.trim() !== "") {
        if (validarnombre(nombre)) {
            datos.nombre = nombre
        } else {

            alert("El nombre introducido no es válido")
            return false
        }
    }
    if (apellido1 && apellido1.trim() !== "") {
        if (validarnombre(apellido1)) {
            datos.apellido1 = apellido1
        } else {

            alert("El apellido1 introducido no es válido")
            return false
        }
    }
    if (apellido2 && apellido2.trim() !== "") {
        if (validarnombre(apellido2)) {
            datos.apellido2 = apellido2
        } else {

            alert("El apellido2 introducido no es válido")
            return false
        }
    }
    if (correo && correo.trim() !== "") {
        if (validarEmail(correo)) {
            datos.correo = correo
        } else {

            alert("El correo introducido no es válido")
            return false
        }
    }

    if (datos.fechaFin && datos.fechaIni > datos.fechaFin) {
        alert("Periodo de fechas no válido")
        return false
    }

    if (facultad !== "") {
        datos.facultad = facultad
    }
    return true
}

function validarEmail(email) {//El mail deben ser letras o numeros, seguido de @ seguido de letras y numeros un punto y mas de dos letras
    const emailComprobar = /^[A-Za-z0-9._%+-]+@ucm\.es$/
    return emailComprobar.test(email);
}

function validarnombre(nombre) {//admite nombres y apellidos compuestos y con tildes 
    const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
    return nombreComprobar.test(nombre);
}