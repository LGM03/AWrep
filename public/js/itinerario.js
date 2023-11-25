$(document).ready(function(){

    $("#botonItinerario").on("click",function(){
        $("#botonItinerario").hide()
        $("#itinerario").fadeIn(2000)

        var urlParams = new URLSearchParams(window.location.search);  //Saco el id de los destino en el que estoy de a url
        var dest = urlParams.get('id');
        $.ajax({
            method: "GET",
            url: "/destino/itinerario",
            data: {ciudad:dest},
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
              if(datos !== "0"){
                $("#contenidoItinerario").text(datos)
              }else{
                alert("Ha ocurrido un error con el itineario222")
              }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
             alert("Ha ocurrido un error con el itinerario")
            }
          });
    })

  
})

