
$(document).ready(function () {

  $("#idCrearCuenta").on("click", function () { //TODO
    //Recojo los valores de las variables del formulario de registro
    
    var datosInicio = {
      nombre: $("#nombre").prop("value"),
      apellido1: $("#apellido1").prop("value"),
      apellido2: $("#apellido2").prop("value"),
      contraseña: $("#contraseña").prop("value"),
      contraseñaRep: $("#contraseñaRep").prop("value"),
      email: $("#correo").prop("value"),
      facultad: $("#facultad").prop("value"),
      facultad: $("#facultad").prop("value"),
      curso: $("#curso").prop("value"),
      grupo: $("#grupo").prop("value"),
      imagenUser: $("#imagenUser").prop("value")
    }

    if (!validarInicio(datosInicio)) {
      event.preventDefault(); // Evita el envío del formulario si la validación falla
    }
  })

  $("#idInicioSesion").on("click", function () {
    if (!validarEmail($("#correoInicio").prop("value"))) {
      event.preventDefault();
    }
  })


  //Validador de Reserva
  $("#idReservar").on("click", function () {
    var datosReserva = {
      nombre: $("#nombreReserva").prop("value"),
      apellido: $("#apellidoReserva").prop("value"),
      email: $("#correoReserva").prop("value"),
      fecha: $("#fechaReserva").prop("value")
    }

    if (!validarReserva(datosReserva)) {
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
  if (datosInicio.facultad.trim() === '') {
    alert('Seleccione una facultad');
    return false;
  }
  if (datosInicio.facultad.trim() === '') {
    alert('Seleccione un Curso');
    return false;
  }
  if (datosInicio.facultad.trim() === '') {
    alert('Seleccione un Grupo');
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

function validarInstalacion(instalacion) {
  return true;
}

function validarfecha(fecha) {
  const fechaComprobar = /^\d{4}-\d{2}-\d{2}$/;
  return fechaComprobar.test(fecha);
}

//Validador de formulario de Reserva
function validarReserva(datosReserva) {

  // Realiza la validación de campos aquí
  const fechaActual = new Date();
  const fechaComparar = new Date(datosReserva.fecha);

  if (datosReserva.nombre.trim() === '' || datosReserva.apellido.trim() === '' || !validarnombre(datosReserva.nombre) || !validarnombre(datosReserva.apellido)) {
    alert('Por favor, ingrese un nombre y apellido válidos.');
    return false;
  }

  if (!validarEmail(datosReserva.email)) {
    alert('Por favor, ingrese una dirección de correo electrónico válida.');
    return false;
  } else if (!validarfecha(datosReserva.fecha)) {
    alert('Por favor, ingrese una fecha válida.');
    return false;
  } else if (fechaComparar < fechaActual) {
    alert('Solo puede reservar en días posteriores al actual');
    return false;
  }

  return true; // Si la validación pasa, permite el envío del formulario
}
