$(document).ready(function(){

    $("#guardarTitulo").on("click",function(event){
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
                    global.titulo = tituloNuevo
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

    $("#cambiarGama").on("click", function(event){
        if(global.gama == "/css/estiloOscuro.css"){
            global.gama = "/css/estiloClaro.css"
            $("#hojaEstilosGama").prop("href","/css/estiloClaro.css")
        }else{
            global.gama = "/css/estiloOscuro.css"
            $("#hojaEstilosGama").prop("href","/css/estiloOscuro.css")
        }
    })

})


