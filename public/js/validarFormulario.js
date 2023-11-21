
$(document).ready(function(){

    $("#idCrearCuenta").on("click", function(){
      //Recojo los valores de las variables del formulario de registro
      var datosInicio ={
        nombre : $("#nombre").prop("value"),
       apellido : $("#apellido").prop("value"),
       contraseña : $("#contraseña").prop("value"),
       contraseñaRep : $("#contraseñaRep").prop("value"),
       email : $("#correo").prop("value")
      }
    
      if (!validarInicio(datosInicio)) {
        event.preventDefault(); // Evita el envío del formulario si la validación falla
      }
    })

    $("#idInicioSesion").on("click",function(){
        if(!validarEmail($("#correoInicio").prop("value"))){
            event.preventDefault();
        }
    })

    $("#idReservar").on("click", function(){
      var datosReserva ={
        nombre : $("#nombreReserva").prop("value"),
       apellido : $("#apellidoReserva").prop("value"),
       email : $("#correoReserva").prop("value"),
       fecha : $("#fechaReserva").prop("value")
      }

      if(!validarReserva(datosReserva)){
        event.preventDefault();
      }

    })

})

    function validarInicio(datosInicio) { //Toggle es mas bonito que alert
      //Aqui se validan los campos 
      if (datosInicio.nombre.trim() === '' || datosInicio.apellido.trim() === '' || !validarnombre(datosInicio.nombre) || !validarnombre(datosInicio.apellido)) {
        alert('Por favor, ingrese un nombre y apellido válidos.');
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
      const emailComprobar = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
      return emailComprobar.test(email);
    }

    function validarnombre(nombre) {//admite nombres y apellidos compuestos y con tildes 
      const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
      return nombreComprobar.test(nombre);
    }

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


    function validarfecha(fecha) {
      const fechaComprobar = /^\d{4}-\d{2}-\d{2}$/;
      return fechaComprobar.test(fecha);
    }
