$(function () {

    $("#guardarTitulo").on("click", function (event) {
        var tituloNuevo = $("#nuevoTitulo").prop("value")
       
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: "/configuracion/titulo",
            data: { titulo: tituloNuevo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    $("#Titulo").text(tituloNuevo)
                    $("title").text(tituloNuevo)
                    $("#footerTitulo").text(tituloNuevo)
                } else {
                    alert("No se ha podido validar")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido guardar la configuracion")
            }
        });
        $("#cambiarTitulo").modal('hide')
    })

    $("#guardarDireccion").on("click", function (event) {
        var dirNueva = $("#direccion").prop("value")
        event.preventDefault();
        $.ajax({
            method: "POST",
            url: "/configuracion/direccion",
            data: { direccion: dirNueva },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    alert("La direccion física ha sido actualizada")
                    $("#direccion").prop("value", "")
                    $("#footerDireccion").text(dirNueva)
                } else {
                    alert("No se ha podido validar")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido guardar la configuracion")
            }
        });
    })


    $("#cambiarGama").on("click", function (event) {  //Cuando se pulsa el boton de cambiar gama

        var estilo = $("#hojaEstilosGama").attr('href')
   
        if (estilo == "/css/estiloOscuro.css") { //Si el estilo era oscuro paso al claro
            var nuevo = "/css/estiloClaro.css"
            $("#hojaEstilosGama").prop("href", "/css/estiloClaro.css")
        } else {
            var nuevo = "/css/estiloOscuro.css" //Si el estilo era claro paso al oscuro
            $("#hojaEstilosGama").prop("href", "/css/estiloOscuro.css")
        }

        $.ajax({  //Guardo en la base de datos el estilo nuevo
            method: "POST",
            url: "/configuracion/gama",
            data: { gama: nuevo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                } else {
                    alert("No se ha podido cambiar la gama")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido guardar la configuracion")
            }
        });

    })

    $("#guardarLogo").on("click", function () {  //Cambiar el logo

        const fileInput = $("#logoInput")

        const file = fileInput[0].files[0];

        var comprobarEx = /(\.png)$/i;  //Compruebo que sea png y su tamaño no sea mayor de 300KB
        if (!file|| !comprobarEx.exec(file.name) || file.size > 300000) {
            alert("Seleccione una imagen válida")
            return false;
        }


        if (file) { //Si todo va bien hago un update a la base de datos con el nuevo logo
            const formData = new FormData();
            formData.append('logo', file);

            $.ajax({
                method: "POST",
                url: "/configuracion/logo",
                data: formData,
                contentType: false,
                processData: false,
                success: function (datos, state, jqXHR) { //Si ya exito escondo el modal y vacio los parametros
                    $("#logConfiguracion").attr("src", datos)
                    $("#logoPequeño").attr("href", datos)
                    $("#cambiarLogo").modal('hide')
                    $("#logoInput").prop("value","")
                },
                error: function (jqXHR, statusText, errorThrown) {
                    alert('No se ha podido actualizar la iamgen')
                },
            });
        } else {
            alert('Selecciona una imagen antes de intentar guardarla.');
        }

    })

})


