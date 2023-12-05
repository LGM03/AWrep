$(document).ready(function () {

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

    $(".verReservas").on("click", function (event) {

        console.log("hola")

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
                if (datos.length >0) {
                    datos.forEach(element => {
                        agregarCajaHistorial(element,divContenedor)
                    });
                } else {
                    var alerta = $('<h5 class="mt-3 alert alert-warning">No hay reservas disponibles</h2>')
                    divContenedor.append(alerta);
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("Ha ocurrido un error con los comentarios")
            }
        });


    })
})


function nuevoUsuario(datos) {

    const nuevo = '<div class="row cajaUsuario rounded m-2">' +
    '<div class="col-2 d-flex justify-content-between align-items-center ">' +
    '<img src="' + datos.urlImagen + '" alt="Foto del usuario" class="img-fluid logoUsuario"></div>' +
    '<div class="col-7 d-flex flex-column">' +
    '<div class="d-flex justify-content-between align-items-center mb-1">' +
    '<h5 class="mb-0">' + datos.nombre + '</h5></div>' +
    '<p>' + datos.correo + '</p></div>' +
    '<div class="col-3 mt-2">' +
    '<button class="btn btn-dark mb-2 w-100 verReservas"> Ver Reservas </button>' +
    '<button class="btn btn-secondary mb-2 w-100 verReservas"> Dar Permisos </button>' +
    '</div></div>';


    $("#divUsuarios").append(nuevo)
}


function agregarCajaHistorial(element,divContenedor) {
    const caja = $('<div class="row cajaInfo rounded m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')
  
    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');
  
    const nombreCom = $('<h5 class="mb-0"> <strong>Responsable : </strong>'+ element.idUsu + '</h5>')
    const fechaCom = $('<p class="mb-0"><strong>Fecha : </strong>'+element.fecha.slice(0, 10) + '</p>')
    const fechaCom2 = $('<p class="mb-0">  <strong>Horas : </strong> '+element.fecha.slice(11, 16) + "-"+element.fechafinal.slice(11, 16)+ '</p>')

    infoContainer.append(nombreCom);
    infoContainer.append(fechaCom);
    infoContainer.append(fechaCom2);

    cajaReserva.append(infoContainer);
  
    caja.append(cajaReserva);
    divContenedor.append(caja);
}

