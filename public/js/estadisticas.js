$(function () {

  $("#btnEstadFacultad").on("click", function () { //Muestra una grafica de las instalaciones reservadas en la facultad seleccionada
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
    $("#selector").append(divGeneral)

    $("#selector").removeClass('d-none')

  })

  $(document).on('change', 'select', function () {
    var facultad = $(this).prop("value")

    $.ajax({
      method: "GET",
      url: "/estadisticas/porFacultad",
      data: { facultad: facultad },
      success: function (datos, state, jqXHR) {
        if (datos.length == 0) {
          
          $("#miGrafica").addClass('d-none')
          $("#noEstadisticas").removeClass('d-none')
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

          new Chart('miGrafica', {
            type: "pie",
            data: {
              labels: inst,
              datasets: [{
                backgroundColor: barColors,
                data: dates
              }]
            },
            options: {
              title: {
                display: true,
                text: "Estadisticas reservas facultad de "+facultad
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


  $("#btnEstadUsuario").on("click", function () { //Muestra una grafica de las instalaciones reservadas para el usuario seleccionado
    var divGeneral = $("<div class = 'row'> </div>")
    var div = $("<div class = 'col-3'> </div>")
    var textCombo = $("<p>Seleccione usuario para ver sus estadísticas:</p>")
    var div2 = $("<div class = 'col-sm-9'> </div>")

    //Accedo a la base de datos busncado todos los usuarios



    div2.append(combo)
    div.append(textCombo)

    divGeneral.append(div)
    divGeneral.append(div2)
    $("#divFacultad").append(divGeneral)

    $("#divFacultad").removeClass('d-none')

  })
})

