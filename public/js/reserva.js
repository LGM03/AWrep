
$(document).ready(function () {

    $("#confirmarReserva").on("click", function (event) {
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

    $("#botonHistorial").on("click", function (event) {

        $("#botonHistorial").hide()
        $("#historiales").removeClass("d-none")

        //Saco el id de la instalacion correspondiente
        var urlParams = new URLSearchParams(window.location.search);
        var inst = urlParams.get('id');
        var data = {
            id: inst
        };
    
        $.ajax({
            method: "GET",
            url: "/reserva/porInst",
            data: data,
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos.length >0) {
                    datos.forEach(element => {
                        agregarCajaHistorial(element)
                    });
                } else {
                    mensajeVacio()
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("Ha ocurrido un error con los comentarios")
            }
        });


    })

    $(document).on("click", ".masInfo", function () {
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
    const caja = $('<div class="row rounded alert alert-secondary m-2"></div>');

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

function agregarCajaHistorial(element) {
    const caja = $('<div class="row cajaInfo rounded m-2"></div>');

    // Sección de info de la reserva
    const cajaReserva = $('<div class="col-10 d-flex flex-column"></div>')
  
    // Contenedor para el nombre y la fecha
    const infoContainer = $('<div class="d-flex justify-content-between align-items-center mb-1"></div>');
    const botonX = $('<button type="button" class="btn btn-success m-2"> <span aria-hidden="true">+</span> </button>')
    botonX.addClass("masInfo")
  
    const nombreCom = $('<h5 class="mb-0"> <strong>Responsable : </strong>'+ element.idUsu + '</h5>')
    const fechaCom = $('<p class="mb-0"><strong>Fecha : </strong>'+element.fecha.slice(0, 10) + '</p>')
    const fechaCom2 = $('<p class="mb-0">  <strong>Horas : </strong> '+element.fecha.slice(11, 16) + "-"+element.fechafinal.slice(11, 16)+ '</p>')

    infoContainer.append(botonX);
    infoContainer.append(nombreCom);
    infoContainer.append(fechaCom);
    infoContainer.append(fechaCom2);

    cajaReserva.append(infoContainer);
  
    caja.append(cajaReserva);
    $("#cajasHistorial").prepend(caja);
}

function mensajeVacio(){
    var contenedor = $("<div class='col-12 text-center'>")
    var mensaje = $("<h2 class='mt-3'>Historial de reservas vacío</h2>")
    var imagen = $("<img class='img-fluid h-75' src='/images/vacio.png' alt='Imagen de Vacio'>")

    contenedor.append(mensaje)
    contenedor.append(imagen)
    $("#cajasHistorial").append(contenedor)
}