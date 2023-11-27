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
                    document.cookie = "titulo=" + tituloNuevo;
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

        $("#hojaEstilosGama").prop("href","/css/estiloOscuro.css")
        $("#cambiarGama").text("Modo Claro")
    })

})


function obtenerValorCookie(nombre) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(nombre + "=") === 0) {
            return cookie.substring((nombre + "=").length, cookie.length);
        }
    }
    return null;
}