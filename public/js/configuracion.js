$(document).ready(function () {

    $("#guardarTitulo").on("click", function (event) {
        var tituloNuevo = $("#nuevoTitulo").prop("value")
        console.log(tituloNuevo)
        event.preventDefault();

      

        $.ajax({
            method: "POST",
            url: "/configuracion/titulo",
            data: { titulo: tituloNuevo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                    $("#Titulo").text(tituloNuevo)
                    $("title").text(tituloNuevo)
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
        console.log(dirNueva)
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
        $("#cambiarTitulo").modal('hide')
    })


    $("#cambiarGama").on("click", function (event) {

        var estilo = $("#hojaEstilosGama").attr('href')
        console.log(estilo)
        if (estilo == "/css/estiloOscuro.css") {
            var nuevo = "/css/estiloClaro.css"
            $("#hojaEstilosGama").prop("href", "/css/estiloClaro.css")
        } else {
            var nuevo = "/css/estiloOscuro.css"
            $("#hojaEstilosGama").prop("href", "/css/estiloOscuro.css")
        }

        $.ajax({
            method: "POST",
            url: "/configuracion/gama",
            data: { gama: nuevo },
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
                if (datos !== "0") {
                } else {
                    alert("No se ha podido validar")
                }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
                alert("No se ha podido guardar la configuracion")
            }
        });

    })

    $("#guardarLogo").on("click", function () {

        const fileInput = $("#logoInput")

        const file = fileInput[0].files[0];

        var comprobarEx = /(\.png)$/i;
        if (!file|| !comprobarEx.exec(file.name) || file.size > 300000) {
            alert("Seleccione una imagen válida")
            return false;
        }


        if (file) {
            const formData = new FormData();
            formData.append('logo', file);

            $.ajax({
                method: "POST",
                url: "/configuracion/logo",
                data: formData,
                contentType: false,
                processData: false,
                success: function (datos, state, jqXHR) {
                    $("#logConfiguracion").attr("src", datos)
                    $("#logoPequeño").attr("src", datos)
                    $("#cambiarLogo").modal('hide')
                    $("#logoInput").prop("value","")
                },
                error: function (jqXHR, statusText, errorThrown) {
                    console.error('Error al enviar el formulario al servidor:', errorThrown);
                },
            });
        } else {
            console.error('Selecciona una imagen antes de intentar guardarla.');
        }

    })

})


