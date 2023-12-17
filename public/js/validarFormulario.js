
$(function () {

  $('#mostrarContrasena2').change(function () {
    var passwordInput = $('#contraseñaRep');
    passwordInput.attr('type', this.checked ? 'text' : 'password');
  });

  $('#mostrarContrasena').change(function () {
    var passwordInput = $('#contraseña');
    passwordInput.attr('type', this.checked ? 'text' : 'password');
  }); 

  $('#mostrarContrasenaLogin').change(function () {
    var passwordInput = $('#clave1');
    passwordInput.attr('type', this.checked ? 'text' : 'password');
  });

  $("#idCrearCuenta").on("click", function (event) { //TODO limpiar codigo
    //Recojo los valores de las variables del formulario de registro
    event.preventDefault();
    var aux = $("#contraseña").prop("value")


    var datosCrearUsuario = new FormData();
    datosCrearUsuario.append("nombre", $("#nombre").val());
    datosCrearUsuario.append("apellido1", $("#apellido1").val());
    datosCrearUsuario.append("apellido2", $("#apellido2").val());
    datosCrearUsuario.append("contrasena", aux);
    datosCrearUsuario.append("imagenUser", $("#imagenUser")[0].files[0]);
    datosCrearUsuario.append("facultad", $("#facultad").val());
    datosCrearUsuario.append("curso", $("#curso").val());
    datosCrearUsuario.append("correo", $("#correo").val());
    datosCrearUsuario.append("grupo", $("#grupo").val());

    var datosInicio = {
      nombre: $("#nombre").prop("value"),
      apellido1: $("#apellido1").prop("value"),
      apellido2: $("#apellido2").prop("value"),
      contraseña: $("#contraseña").prop("value"),
      contraseñaRep: $("#contraseñaRep").prop("value"),
      email: $("#correo").prop("value"),
      facultad: $("#facultad").prop("value"),
      curso: $("#curso").prop("value"),
      grupo: $("#grupo").prop("value"),
      imagenUser: $("#imagenUser")[0].files[0]
    }

    if (validarInicio(datosInicio)) {
      $.ajax({
        method: "POST",
        url: "/user/crearCuenta",
        data: datosCrearUsuario,
        contentType: false,
        processData: false,
        success: function (datos, state, jqXHR) {
          //Cerramos el modal
          if (datos !== "0") { //Si estamos en el / añadimos la tarjeta correspondiente 
            $("#crearCuenta").modal('hide')
            $("#nombre").prop("value", "")
            $("#apellido1").prop("value", "")
            $("#apellido2").prop("value", "")
            $("#contraseña").prop("value", "")
            $("#contraseñaRep").prop("value", "")
            $("#correo").prop("value", "")
            $("#facultad").prop("value", "")
            $("#curso").prop("value", "")
            $("#grupo").prop("value", "")
            $("#imagenUser").prop("value", "")
            alert("Cuenta creada con éxito")

          } else {
            alert("No se ha podido crear el usuario")
          }
        },
        error: function (jqXHR, statusText, errorThrown) {
          alert("Error al crear usuario")
          console.error('Error al enviar el formulario al servidor:', errorThrown);
        },
      });
    }
  })

  $("#idInicioSesion").on("click", function (event) {
    if (!validarEmail($("#correoInicio").prop("value"))) {
      event.preventDefault();
    }
  })

})
//Validador de formulario de Inicio
function validarInicio(datosInicio) { //Toggle es mas bonito que alert
  //Aqui se validan los campos 
  if (datosInicio.nombre.trim() === '' || datosInicio.apellido1.trim() === '' || datosInicio.apellido2.trim() === '' || !validarnombre(datosInicio.nombre) || !validarnombre(datosInicio.apellido1) || !validarnombre(datosInicio.apellido2)) {
    alert('Por favor, ingrese un nombre y apellido válidos.');
    return false;
  }
  if (datosInicio.facultad.trim() == '') {
    alert('Seleccione una facultad');
    return false;
  }
  if (datosInicio.curso == "") {
    alert('Seleccione un Curso');
    return false;
  }
  if (datosInicio.grupo == "") {
    alert('Seleccione un Grupo');
    return false;
  }

  var comprobarEx = /(\.png)$/i;
  if (!datosInicio.imagenUser || !comprobarEx.exec(datosInicio.imagenUser.name) || datosInicio.imagenUser.size > 300000) {
    alert("Seleccione una imagen válida")
    return false;
  }

  if (!validarEmail(datosInicio.email)) {
    alert('Por favor, ingrese una dirección de correo electrónico válida.');
    return false;
  } else if (datosInicio.contraseña != datosInicio.contraseñaRep) {
    alert('Las contraseñas no coinciden');
    return false;
  }

  return true; // Si la validación pasa, permite el envío del formulario
}

function validarEmail(email) {//El mail deben ser letras o numeros, seguido de @ seguido de letras y numeros un punto y mas de dos letras
  const emailComprobar = /^[A-Za-z0-9._%+-]+@ucm\.es$/
  return emailComprobar.test(email);
}

function validarnombre(nombre) {//admite nombres y apellidos compuestos y con tildes 
  const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
  return nombreComprobar.test(nombre);
}
