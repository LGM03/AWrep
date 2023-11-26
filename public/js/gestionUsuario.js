$(document).ready(function () {

    $(".validarUsuario").on("click", function () {
        var divContenedor = $(this).closest('.cajaUsuario') //Escondo al div padre 
        var correo = divContenedor.find('p').text(); //busco el p que contiene el correo 

        $.ajax({
            method: "POST",
            url: "/gestionUsuarios/validar",
            data: { correo: correo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    alert("Se ha validado el usuario")
                    divContenedor.slideUp(function(){
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
                    divContenedor.slideUp(function(){
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

})

function mensajeVacio(){
    console.log("vacio")
    var contenedor = $("<div class='col-12 text-center'>")
    var mensaje = $("<h2 class='mt-3'>No hay usuarios pendientes de validar</h2>")
    var imagen = $("<img class='img-fluid h-75' src='/images/vacio.png' alt='Imagen de Vacio'>")

    contenedor.append(mensaje)
    contenedor.append(imagen)
    $("#divUsuariosValidar").append(contenedor)
}

