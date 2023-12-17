$(function () {

  $("#btnEstadFacultad").on("click", function () { //Muestra una grafica de las instalaciones reservadas en la facultad seleccionada
    $("#miGrafica").addClass('d-none')
    $("#noEstadisticas").addClass('d-none')
    $('#divGeneral').remove()
    var divGeneral = $("<div class = 'row' id= 'divGeneral'> </div>")
    var div = $("<div class = 'col-3'> </div>")
    var textCombo = $("<p>Seleccione facultad para ver sus estadísticas:</p>")
    var div2 = $("<div class = 'col-sm-9'> </div>")
    var combo = `
        <select class="form-control" id="selectorFacultad" name="facultad" required>
          <option value="" disabled selected>Seleccione su facultad aquí:</option>
          <option value="Mates">Mates</option>
          <option value="Fisica">Fisica</option>
          <option value="Informatica">Informatica</option>
        </select>
      `;
    div2.append(combo)
    div.append(textCombo)
    divGeneral.append(div)
    divGeneral.append(div2)
    $("#selector").empty()
    $("#selector").append(divGeneral)

    $("#selector").removeClass('d-none')

  })

  $(document).on('change', 'select', function () {
    var facultad = $(this).prop("value")

    $("#divGeneral1").empty();
    $("#miGrafica").empty();

    $.ajax({
      method: "GET",
      url: "/estadisticas/porFacultad",
      data: { facultad: facultad },
      success: function (datos, state, jqXHR) {
        if (datos.length == 0) {
          $("#miGrafica").addClass('d-none')
          $("#noEstadisticas").removeClass('d-none')
          $("#noEstadisticas").text("No hay estadisticas disponibles para esta facultad")

        } else {
          $("#miGrafica").removeClass('d-none')
          $("#noEstadisticas").addClass('d-none')

          var dates = []
          var inst = []
          datos.forEach(element => {
            dates.push(element.contador)
            inst.push(element.nombre)
          });

          var barColors = [
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
                backgroundColor: barColors,
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
      error: function (jqXHR, statusText, errorThrown) {
        alert("Ha ocurrido un error con las estadisticas");
      }
    })
  })

  $("#btnEstadMostrarUsu").on("click", function () { //Muestra una grafica de las instalaciones reservadas en la facultad seleccionada
    $("#miGrafica").addClass('d-none')
    $("#noEstadisticas").addClass('d-none')
    $('#divGeneral1').remove()
    var divGeneral1 = $("<div class = 'row' id= 'divGeneral1'> </div>")
    var div3 = $("<div class = 'col-6'> </div>")
    var input = $('<input type="text" class="form-control" id="txtUsuario" placeholder="Ingrese el correo del usuario">')
    var botonuser =$('<button id="btnEstadUsuario" class="btn btn-primary">Ver estadísticas por usuario</button>')
    var div4 = $("<div class = 'col-sm-6'> </div>")
    div4.append(botonuser)
    div3.append(input)
    divGeneral1.append(div3)
    divGeneral1.append(div4)
    $("#selector").empty()
    $("#selector").append(divGeneral1)

    $("#selector").removeClass('d-none')

  })

  $(document).on("click", "#btnEstadUsuario", function () {
    // Obtener el correo del usuario desde el input
    var usuario = $("#txtUsuario").val();
    $("#divGeneral1").empty();
    $("#miGrafica").empty();
    // Realizar la petición AJAX
    $.ajax({
      method: "GET",
      url: "/estadisticas/porUsuario",
      data: { usuario: usuario },
      success: function (datos, state, jqXHR) {
      
        if (datos.length == 0) {
          $("#miGrafica").addClass('d-none')
          $("#noEstadisticas").removeClass('d-none')
          $("#noEstadisticas").text("No hay estadisticas disponibles para este usuario")
        } else {
          $("#miGrafica").removeClass('d-none')
          $("#noEstadisticas").addClass('d-none')


          var dates = []
          var inst = []
          datos.forEach(element => {
            dates.push(element.contador)
            inst.push(element.nombre)
          });

          var barColors = [
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
                backgroundColor: barColors,
                data: dates,
              }]
            },
            options: {
              title: {
                display: true,
                text: "Estadísticas reserva del usuario: " + usuario,
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
      error: function (jqXHR, statusText, errorThrown) {
        alert("Ha ocurrido un error con las estadísticas");
      }
    });
  });
})

