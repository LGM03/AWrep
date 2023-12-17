$(function () {

  $("#btnEstadFacultad").on("click", function () { //Muestra una grafica de las instalaciones reservadas en la facultad seleccionada
    $("#miGrafica").addClass('d-none')
    $("#noEstadisticas").addClass('d-none')
    $('#divGeneral').remove()
    var divGeneral = $("<div class = 'row' id= 'divGeneral'> </div>")
    var div = $("<div class = 'col-lg-3 col-12'> </div>")
    var textCombo = $("<p>Seleccione facultad para ver sus estadísticas:</p>")
    var div2 = $("<div class = 'col-lg-9 col-12'> </div>")
    var combo = `
        <select class="form-control" id="selectorFacultad" name="facultad" required>
          <option value="" disabled selected>Seleccione su facultad aquí:</option>
          <option value="Mates">Mates</option>
          <option value="Fisica">Fisica</option>
          <option value="Informatica">Informatica</option>
        </select>
      `;
    div2.append(combo)  //Añado el div con el select de la facultad y el texto para introducirla 
    div.append(textCombo)
    divGeneral.append(div)
    divGeneral.append(div2)
    $("#selector").empty()
    $("#selector").append(divGeneral) //Meto el selector en el div

    $("#selector").removeClass('d-none') //hago que el selector sea visible

  })

  $(document).on('change', 'select', function () { //cuando el select cambie 
    var facultad = $(this).prop("value") //Recojo el valor de la facultad

    $("#divGeneral1").empty();
    $("#miGrafica").empty();

    $.ajax({  //Consulto los valores de las reservas para esa facultad
      method: "GET",
      url: "/estadisticas/porFacultad",
      data: { facultad: facultad },
      success: function (datos, state, jqXHR) {
        if (datos.length == 0) {  //Si no hay ninguna reserva aviso al usuario
          $("#miGrafica").addClass('d-none')
          $("#noEstadisticas").removeClass('d-none')
          $("#noEstadisticas").text("No hay estadisticas disponibles para esta facultad")

        } else {  //Si hay reservas muestro el canvas
          $("#miGrafica").removeClass('d-none')
          $("#noEstadisticas").addClass('d-none')

          var dates = []
          var inst = []
          datos.forEach(element => { //Preparo los datos en un formato admitido por canvas
            dates.push(element.contador)
            inst.push(element.nombre)
          });

          var barColors = [ //Colores de los que va a ser el canva
            "darkkhaki",
            "darkmagenta",
            "darkolivegreen",
            "darkorange",
            "darkorchid"
          ];

          new Chart("miGrafica", {
            type: "pie",
            data: {
              labels: inst,
              datasets: [{
                backgroundColor: barColors, //Incluyo los valores y colores del grafico
                data: dates,
              }]
            },
            options: {
              title: {
                display: true,
                text: "Estadísticas reserva del facultad: " + facultad,
                fontColor: "white",
                fontSize: 18, // Tamaño de la letra del título
              },
              legend: {
                labels: {
                  fontColor: "white", // Establece el color de las letras de la leyenda a blanco
                  fontSize: 14, // Tamaño de la letra de las etiquetas de la leyenda
                }
              }
            }
          });
        }


      },
      error: function (jqXHR, statusText, errorThrown) { //Si ha ocurrido un error aviso al usuario
        alert("Ha ocurrido un error con las estadisticas");
      }
    })
  })

  $("#btnEstadMostrarUsu").on("click", function () { //Muestra una grafica de las instalaciones reservadas en el usuario seleccionada
    $("#miGrafica").addClass('d-none')
    $("#noEstadisticas").addClass('d-none')
    $('#divGeneral1').remove()
    var divGeneral1 = $("<div class = 'row' id= 'divGeneral1'> </div>")
    var div3 = $("<div class = 'col-6'> </div>")
    var input = $('<input type="text" class="form-control" id="txtUsuario" placeholder="Ingrese el correo del usuario">')
    var botonuser =$('<button id="btnEstadUsuario" class="btn btn-primary">Ver estadísticas por usuario</button>')
    var div4 = $("<div class = 'col-sm-6'> </div>")
    div4.append(botonuser)  //Incluyo todos los elementos en el div padre
    div3.append(input)
    divGeneral1.append(div3)
    divGeneral1.append(div4)
    $("#selector").empty()
    $("#selector").append(divGeneral1)

    $("#selector").removeClass('d-none') //Hago visible el selector

  })

  $(document).on("click", "#btnEstadUsuario", function () { //Cuando se pulsa el boton de estadisticas del usuario
    // Obtener el correo del usuario desde el input
    var usuario = $("#txtUsuario").val();
    $("#divGeneral1").empty();
    $("#miGrafica").empty();
    // Realizar la petición AJAX
    $.ajax({
      method: "GET",
      url: "/estadisticas/porUsuario",  //Leo todas las reservas de ese usuario
      data: { usuario: usuario },
      success: function (datos, state, jqXHR) { //en caso de exito muestro el resultado
      
        if (datos.length == 0) {  //Si no hay ninguna reserva aviso al usuario 
          $("#miGrafica").addClass('d-none')
          $("#noEstadisticas").removeClass('d-none')
          $("#noEstadisticas").text("No hay estadisticas disponibles para este usuario")
        } else {
          $("#miGrafica").removeClass('d-none') //Si hay reservas muestro la grafica necesaria
          $("#noEstadisticas").addClass('d-none')


          var dates = []
          var inst = [] 
          datos.forEach(element => { //Preparo los datos en un formato admitido por canva
            dates.push(element.contador)
            inst.push(element.nombre)
          });

          var barColors = [ //Colores que va a tener el grafico
            "darkkhaki",
            "darkmagenta",
            "darkolivegreen",
            "darkorange",
            "darkorchid"
          ];

          new Chart("miGrafica", { //Meto los valores en el grafico
            type: "pie",
            data: {
              labels: inst,
              datasets: [{
                backgroundColor: barColors, //Meto en el grafico los valores 
                data: dates,
              }]
            },
            options: { 
              title: {
                display: true,
                text: "Estadísticas reserva del usuario: " + usuario, // titulo del canva
                fontColor: "white",
                fontSize: 18, // Tamaño de la letra del título
              },
              legend: {
                labels: {
                  fontColor: "white", // Establece el color de las letras de la leyenda a blanco
                  fontSize: 14, // Tamaño de la letra de las etiquetas de la leyenda
                }
              }
            }
          });
          
        }
      },
      error: function (jqXHR, statusText, errorThrown) { //Si hay un error aviso al usuario
        alert("Ha ocurrido un error con las estadísticas");
      }
    });
  });
})

