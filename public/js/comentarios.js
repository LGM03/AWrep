$(document).ready(function(){

    $("#botonComentarios").on("click",function(){
        $("#botonComentarios").hide()
        $("#comentarios").fadeIn(1000)

        const destino = $('#nombreCiudad').text()
        $.ajax({
            method: "GET",
            url: "/comentarios",
            data: {ciudad:destino.trim()},
            success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
              if(datos !== "0"){
                $("#usuarioComentarios").text(datos.usuario)
                $("#usuarioComentarios").data("destino",datos.comentarios[0].destino_id )

                datos.comentarios.forEach(element => {
                    agregarCajaComentario(element)
                });
              }else{
                alert("Ha ocurrido un error con los comentarios")
              }
            },
            error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
             alert("Ha ocurrido un error con los comentarios")
            }
          });
    })

    $("#idComentar").on("click", function(event){

      console.log("AADASDAD" +$("#comentarioNuevo").prop("value"))

      console.log($("#usuarioComentarios").data("destino"))

   
        const coment = $("#comentarioNuevo").prop("value")
        const dest = $("#usuarioComentarios").data("destino")
      

      event.preventDefault();
      $.ajax({
        method: "POST",
        url: "/comentarios",
        data: {comentario: coment, destino : dest},
        success: function (datos, state, jqXHR) { //Si todo ha ido bien pongo un mensaje de acierto
          if(datos !== "0"){
            element = {
              nombre_usuario : datos,
              fecha_comentario : new Date().toISOString(),
              comentario : coment
            }
            agregarCajaComentario(element)
          }else{
            console.log()
            alert("No se pudo publicar el comentario")
          }
        },
        error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error pongo un mensaje de error
         alert("No se pudo publicar el comentario")
        }
      });
    })
})




function agregarCajaComentario(element) {
    const caja = $('<div class="row cajaComentario rounded m-2"></div>');

    // Sección de imagen de usuario
    const cajaImagen = $('<div class="col-2"></div>')
    const imagen = $('<img src="/images/usuario.png" alt="Foto del usuario" class="img-fluid">');
    cajaImagen.append(imagen);

    // Sección de info del comentario
    const cajaComentario = $('<div class="col-10 d-flex flex-column"></div>')
    const nombreCom = $('<h5 class="mb-0"></h5>').text(element.nombre_usuario);
    const fechaCom = $('<p class="mb-1"><em></em></p>').text(element.fecha_comentario.slice(0, 10));
    const textoCom = $('<p class="mb-0"></p>').text(element.comentario);

    cajaComentario.append(nombreCom);
    cajaComentario.append(fechaCom);
    cajaComentario.append(textoCom);

    caja.append(cajaImagen);
    caja.append(cajaComentario);
    $("#cajasComentarios").prepend(caja);
}