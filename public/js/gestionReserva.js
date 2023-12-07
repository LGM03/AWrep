$(document).ready(function () {

    $("#periodoCheckbox").change(function () { //Cuando se pulse el checkbox
        if ($(this).is(':checked')) {
            $("#filtroFin").removeClass("d-none")
        } else {
            $("#filtroFin").addClass("d-none")
        }
    })

    $("#filtrarReservas").on("click", function (event) {
        event.preventDefault();

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
                        console.log(datos)
                        datos.datos.forEach(element => {
                            console.log(element)
                            if ((!filtro.nombre || filtro.nombre === element.nombre) &&
                                (!filtro.apellido1 || filtro.apellido1 === element.apellido1) &&
                                (!filtro.apellido2 || filtro.apellido2 === element.apellido2) &&
                                (!filtro.correo || filtro.correo === element.correo) &&
                                (!filtro.facultad || filtro.facultad === element.facultad) &&
                                (!filtro.instalacion || filtro.instalacion === element.nombreIns) &&

                                (!filtro.fechaIni || filtro.fechaIni === element.fecha) &&
                                (!filtro.fechaFin || filtro.fechaFin === element.fechafinal)) {


                                const arrayBuffer = element.imagenIns.data; //recojo la imagen de la instalacion y la paso a URL
                                const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                                const url = `data:image/png;base64,${base64String}`;

                                var nuevo = { //info de la reserva
                                    nombreIns: element.nombreIns,
                                    fecha: element.fecha,
                                    fechafinal: element.fechafinal,
                                    tipoReserva: element.tipoReserva,
                                    aforo: element.aforo,
                                    urlImagen: url,
                                };

                                agregarCajaReserva(datos.esAdmin, nuevo, $("#divListaReservas"))
                                existe = true
                            }
                        });
                    }
                    if (!existe) {
                        var alerta = $('<h5 class="mt-3 alert alert-warning cajaUsuario">No hay usuarios que mostrar</h2>');
                        $("#divUsuarios").append(alerta);
                    }
                },
                error: function (jqXHR, statusText, errorThrown) {
                    alert("Ha ocurrido un error con los usuarios");
                }
            })

        }
    })
})

function agregarCajaReserva(esAdmin, element, padre) {
    const caja = $('<div class="row cajaUsuario rounded m-2"></div>');
    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')

    const cajaImagen = $('<div class="col-2 d-flex justify-content-between align-items-center "> </div>')
    const imagen = '<img src="' + element.urlImagen + '" alt="Foto del usuario" class="img-fluid logoUsuario"></div>'
    cajaImagen.append(imagen)

    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');
    botonCancelar = $('<button class="btn btn-danger m-2 cancelarReserva"> X </button>');
    const nombreCom = $('<h5 class="mb-0"> <strong>Instalación : </strong>' + element.nombreIns + '</h5>')
    const tipo = $('<p class="mb-0"><strong>Tipo: </strong>' + element.tipoReserva + '</p>')
    const aforo = $('<p class="mb-0"><strong>Aforo: </strong>' + element.aforo + '</p>')

    const plazo = $('<p class="mb-0">  <strong>Plazo de la Reserva : </strong> ' + element.fecha.slice(0, 10) + " " + element.fecha.slice(11, 16) + "-" + element.fechafinal.slice(11, 16) + '</p>')

    infoContainer.append(cajaImagen);
    infoContainer.append(nombreCom);
    infoContainer.append(tipo);
    infoContainer.append(aforo);
    infoContainer.append(plazo);

    cajaReserva.append(infoContainer);
    if (esAdmin == 1) {//TODO
        infoContainer.append(botonCancelar);
    }
    caja.append(cajaReserva);
    padre.append(caja);
}

function nuevoUsuario(datos) {

    const nuevo = '<div class="row cajaUsuario rounded m-2">' +
        '<div class="col-2 d-flex justify-content-between align-items-center ">' +
        '<img src="' + datos.urlImagen + '" alt="Foto del usuario" class="img-fluid logoUsuario"></div>' +
        '<div class="col-7 d-flex flex-column">' +
        '<div class="d-flex justify-content-between align-items-center mb-1">' +
        '<h5 class="mb-0">' + datos.nombre + '</h5></div>' +
        '<p id = "correoUser">' + datos.correo + '</p></div>' +
        '<div class="col-3 mt-2" id = "zonaBotones">' +
        '<button class="btn btn-dark mb-2 w-100 verReservas"> Ver Reservas </button>' +
        '</div></div>';

    $("#divUsuarios").append(nuevo)

    if (datos.rol == 1) {
        var boton = '<button class="alert alert-success p-1 w-100"> Es Admin </button>'
    } else {
        var boton = '<button class="btn btn-secondary mb-2 w-100 darPermisos"> Dar Permisos </button>'
    }

    $(".cajaUsuario:last").find("#zonaBotones").append(boton);
}

function validarFiltro(datos) {
    var nombre = $("#nombreFiltrar").prop("value")
    var apellido1 = $("#apellido1Filtrar").prop("value")
    var apellido2 = $("#apellido2Filtrar").prop("value")
    var correo = $("#correoFiltrar").prop("value")
    var facultad = $("#facultadFiltrar").prop("value")

    if (nombre.trim() !== "") {
        if (validarnombre(nombre)) {
            datos.nombre = nombre
        } else {

            alert("El nombre introducido no es válido")
            return false
        }
    }
    if (apellido1.trim() !== "") {
        if (validarnombre(apellido1)) {
            datos.apellido1 = apellido1
        } else {

            alert("El apellido1 introducido no es válido")
            return false
        }
    }
    if (apellido2.trim() !== "") {
        if (validarnombre(apellido2)) {
            datos.apellido2 = apellido2
        } else {

            alert("El apellido2 introducido no es válido")
            return false
        }
    }
    if (correo.trim() !== "") {
        if (validarEmail(correo)) {
            datos.correo = correo
        } else {

            alert("El correo introducido no es válido")
            return false
        }
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