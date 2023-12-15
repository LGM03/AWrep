

$(function () {

    if ($('.validarUsuario').length === 0) {
        $("#NoValidar").removeClass("d-none")
    }

    $(".validarUsuario").on("click", function () {
        var divContenedor = $(this).closest('.cajaUsuario') //Escondo al div padre 
        var correo = divContenedor.find('p').text(); //busco el p que contiene el correo 

        $.ajax({
            method: "POST",
            url: "/gestionUsuarios/validar",
            data: { correo: correo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    const datos = {
                        correo: divContenedor.find('p').text(),
                        nombre: divContenedor.find('h5').text(),
                        urlImagen: divContenedor.find('img').attr('src')
                    }
                    nuevoUsuario(datos)
                    divContenedor.slideUp(function () {
                        divContenedor.remove()
                        if ($('.validarUsuario').length === 0) {
                            $("#NoValidar").removeClass("d-none")
                        }
                    })
                } else {
                    alert("No se ha podido validar")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido validar")
            }
        });
    })

    $(".eliminarUsuario").on("click", function () {
        var divContenedor = $(this).closest('.cajaUsuario') //Escondo al div padre 
        var correo = divContenedor.find('p').text(); //busco el p que contiene el correo 

        $.ajax({
            method: "POST",
            url: "/gestionUsuarios/eliminar",
            data: { correo: correo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    alert("Se ha eliminado el usuario")
                    divContenedor.slideUp(function () {
                        divContenedor.remove()
                        if ($('.validarUsuario').length === 0) {
                            mensajeVacio()
                        }
                    })

                } else {
                    alert("No se ha podido validar")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido validar")
            }
        });
    })

    $(document).on("click", ".verReservas", function (event) {
        $(this).removeClass("verReservas");
        var divContenedor = $(this).closest('.cajaUsuario') //Este es el div padre 
        var correo = divContenedor.find('p').text(); //busco el p que contiene el correo 
        var data = {
            correo: correo
        };

        $.ajax({
            method: "GET",
            url: "/reserva/porUsuario",
            data: data,
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos.length > 0) {
                    agregarCajaUsuario(datos[0], divContenedor)

                    datos.forEach(element => {
                        var fecha = new Date(element.fecha);
                        var fechafinal = new Date(element.fechafinal);
                        element.fecha = fecha.toLocaleString()
                        element.fechafinal = fechafinal.toLocaleString()


                        agregarCajaHistorial(element, divContenedor)
                    });
                } else {
                    var alerta = $('<h5 class="mt-3 alert alert-warning">No hay reservas disponibles</h2>')
                    divContenedor.append(alerta);
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("Ha ocurrido un error con los usuarios")
            }
        });
    })

    $(document).on("click", ".darPermisos", function (event) {
        var boton = $(this); // Almacena una referencia al botón fuera de la función success
        boton.removeClass("darPermisos");

        var divContenedor = boton.closest('.cajaUsuario'); // Este es el div padre 
        var correo = divContenedor.find('#correoUser').text(); // Busco el p que contiene el correo 
        console.log("ASDF" + correo)
        var data = {
            correo: correo
        };

        $.ajax({
            method: "POST",
            url: "/gestionUsuarios/hacerAdmin",
            data: data,
            success: function (datos, state, jqXHR) { // Si todo ha ido bien pongo un mensaje de acierto
                console.log(datos);
                if (datos == "1") {
                    console.log(datos);
                    boton.removeClass('btn btn-secondary mb-2').addClass('alert alert-success p-1');
                    boton.text("Es admin")
                } else {
                    alert("No se ha podido hacer admin");
                }
            },
            error: function (jqXHR, statusText, errorThrown) { // Si ha ocurrido un error pongo un mensaje de error
                alert("Ha ocurrido un error con los usuarios");
            }
        });
    })

    $("#idFiltrar").on("click", function (event) {
        event.preventDefault();

        $("#usuariosMostrados").slideUp(1000);
        $("#divUsuarios .cajaUsuario").slideUp(1000);
        var filtro = {};
        var existe = false

        if (esFiltroValido(filtro)) {
            $.ajax({
                method: "GET",
                url: "/gestionUsuarios/filtrar",
                data: filtro,  // Enviar los datos como parte de la solicitud GET
                success: function (datos, state, jqXHR) {

                    if (datos.length > 0) {
                        datos.forEach(element => {

                            const arrayBuffer = element.imagen.data;
                            const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                            const url = `data:image/png;base64,${base64String}`;

                            var nuevo = {
                                nombre: element.nombre + " " + element.apellido1 + " " + element.apellido2,
                                correo: element.correo,
                                urlImagen: url,
                                rol: element.rol,
                                clase: element.curso + " " + element.grupo,
                                facultad: element.facultad
                            };
                            nuevoUsuario(nuevo);
                            existe = true

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
            });
        }
    });


    $("#idListarTodos").on("click", function (event) {
        event.preventDefault();

        $("#usuariosMostrados").slideUp(1000);
        $("#divUsuarios .cajaUsuario").slideUp(1000);
        var existe = false

        $.ajax({
            method: "GET",
            url: "/gestionUsuarios/listarTodos",
            data: null,  // Enviar los datos como parte de la solicitud GET
            success: function (datos, state, jqXHR) {

                if (datos.length > 0) {
                    datos.forEach(element => {

                        const arrayBuffer = element.imagen.data;
                        const base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
                        const url = `data:image/png;base64,${base64String}`;
                        var nuevo = {
                            nombre: element.nombre + " " + element.apellido1 + " " + element.apellido2,
                            correo: element.correo,
                            urlImagen: url,
                            rol: element.rol,
                            clase: element.curso + " " + element.grupo,
                            facultad: element.facultad
                        };
                        nuevoUsuario(nuevo);
                        existe = true

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
        });

    });

})

function esFiltroValido(datos) {
    var nombre = $("#nombreFiltrar").prop("value")
    var apellido1 = $("#apellido1Filtrar").prop("value")
    var apellido2 = $("#apellido2Filtrar").prop("value")
    var correo = $("#correoFiltrar").prop("value")
    var facultad = $("#facultadFiltrar").prop("value")
    var curso = $("#cursoFiltrar").prop("value")
    var grupo = $("#grupoFiltrar").prop("value")


    if (nombre.trim() !== "") {
        if (validarnombre(nombre)) {
            datos.nombre = nombre
        } else {

            alert("El nombre introducido no es válido para filtrar")
            return false
        }
    }
    if (apellido1.trim() !== "") {
        if (validarnombre(apellido1)) {
            datos.apellido1 = apellido1
        } else {

            alert("El apellido1 introducido no es válido para filtrar")
            return false
        }
    }
    if (apellido2.trim() !== "") {
        if (validarnombre(apellido2)) {
            datos.apellido2 = apellido2
        } else {

            alert("El apellido2 introducido no es válido para filtrar")
            return false
        }
    }
    if (correo.trim() !== "") {
        if (validarEmail(correo)) {
            datos.correo = correo
        } else {

            alert("El correo introducido no es válido para filtrar")
            return false
        }
    }

    if (curso !== "") {
        datos.curso = curso
    }
    if (facultad !== "") {
        datos.facultad = facultad
    }
    if (grupo !== "") {
        datos.grupo = grupo
    }
    return true
}

function nuevoUsuario(datos) {  //datos.nombre, datos.urlImage, datos.correo

    const nuevo = `
    <div class="row cajaUsuario rounded m-2 align-items-center">
        <div class="col-2 d-flex justify-content-between align-items-center">
            <img src="${datos.urlImagen}" alt="Foto del usuario" class="img-fluid logoUsuario">
        </div>
        <div class="col-7">
            <div class="d-flex justify-content-between align-items-center mb-1">
                <h5 class="mb-0">${datos.nombre}</h5>
            </div>
            <p id="correoUser" class="mb-1">${datos.correo}</p>
            <div class="d-flex flex-column">
                <div class="d-flex mb-1">
                    <h5 class="mb-0 mr-2">Facultad:</h5>
                    <p class="mb-0">${datos.facultad}</p>
                </div>
                <div class="d-flex">
                    <h5 class="mb-0 mr-2">Grupo:</h5>
                    <p class="mb-0">${datos.clase}</p>
                </div>
            </div>
        </div>
        <div class="col-3 mt-2" id = "zonaBotones">
        <button class="btn btn-dark mb-2 w-100 verReservas"> Ver Reservas </button>
        </div>
    </div>
`;

    $("#divUsuarios").append(nuevo)

    if (datos.rol == 1) {
        var boton = '<button class="alert alert-success p-1 w-100"> Es Admin </button>'
    } else {
        var boton = '<button class="btn btn-secondary mb-2 w-100 darPermisos"> Dar Permisos </button>'
    }

    $(".cajaUsuario:last").find("#zonaBotones").append(boton);
}

function agregarCajaHistorial(element, divContenedor) {
    const caja = $('<div class="row cajaInfo rounded m-2"></div>');
    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')

    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');

    const nombreCom = $('<h5 class="mb-0"> <strong>Instalación : </strong>' + element.nombreIns + '</h5>')
    const tipo = $('<p class="mb-0"><strong>Tipo: </strong>' + element.tipoReserva + '</p>')
    const aforo = $('<p class="mb-0"><strong>Aforo: </strong>' + element.aforo + '</p>')

    const plazo = $('<p class="mb-0">  <strong>Plazo de la Reserva : </strong> ' + element.fecha.slice(0, 10) + " " + element.fecha.slice(11, -3) + "-" + element.fechafinal.slice(11, -3) + '</p>')

    infoContainer.append(nombreCom);
    infoContainer.append(tipo);
    infoContainer.append(aforo);
    infoContainer.append(plazo);

    cajaReserva.append(infoContainer);

    caja.append(cajaReserva);
    divContenedor.append(caja);
}

function agregarCajaUsuario(element, padre) {
    const caja = $('<div class="row rounded alert alert-secondary m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')

    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');

    const nombreCom = $('<h5 class="mb-0"> <strong>Nombre : </strong>' + element.nombre + ' ' + element.apellido1 + ' ' + element.apellido2 + '</h5>')
    const facultad = $('<p class="mb-0"><strong>Facultad : </strong>' + element.facultad + '</p>')
    const clase = $('<p class="mb-0">  <strong>Clase : </strong> ' + element.curso + "-" + element.grupo + '</p>')

    infoContainer.append(nombreCom);
    infoContainer.append(facultad);
    infoContainer.append(clase);

    cajaReserva.append(infoContainer);

    caja.append(cajaReserva);
    padre.append(caja);
}

function validarEmail(email) {//El mail deben ser letras o numeros, seguido de @ seguido de letras y numeros un punto y mas de dos letras
    const emailComprobar = /^[A-Za-z0-9._%+-]+@ucm\.es$/
    return emailComprobar.test(email);
}

function validarnombre(nombre) {//admite nombres y apellidos compuestos y con tildes 
    const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
    return nombreComprobar.test(nombre);
}