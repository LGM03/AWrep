$(document).ready(function () {

    $("#btnEstadFacultad").on("click", function (event) { //Muestra una grafica de las instalaciones reservadas en la facultad seleccionada
        var divGeneral = $("<div class = 'row'> </div>")
        var div = $("<div class = 'col-3'> </div>")
        var textCombo = $("<p>Seleccione facultad para ver sus estadísticas:</p>")
        var div2 = $("<div class = 'col-sm-9'> </div>")
        var combo = `
        <select class="form-control" id="facultad" name="facultad" required>
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
        $("#divFacultad").append(divGeneral)

        $("#divFacultad").removeClass('d-none')

    })


    $("#btnEstadUsuario").on("click", function (event) { //Muestra una grafica de las instalaciones reservadas para el usuario seleccionado
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

