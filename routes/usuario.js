var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "UCM_RIU",
  port : 3306
})

//Cuando se mande un formulario de reserva 

router.post("/login", async (req, res) => {
  try{

  
  const DAOAp = require("../mysql/daoUsuario")
  const midao = new DAOAp(pool)
  var correo = req.body.correo
  var contraseña = req.body.contraseña

    midao.leerPorID(correo, async (err, datos) => { //Aqui habria que pasarle la contraseña 
      if (err || datos == null) {
        res.redirect(`/?error=${"No se ha podido iniciar sesion"}`) //Cargo una ventana de error y ha ocurrido un problema
      }
      else {
        const coincide = await bcrypt.compare(contraseña, datos.contraseña)
        if(coincide){
          req.session.usuario = {
            nombre: datos.nombre,
            correo: correo,
            apellido1 : datos.apellido1,
            apellido2 : datos.apellido2,
            rol : datos.rol
          };
          res.redirect('/');
        }else{
          res.redirect(`/?error=${"Credenciales no validas"}`)
        }
      }
    });
  }catch{
    res.render('error', { error: 'Ha ocurrido un error', logo : global.logo, titulo : global.titulo, gama: global.gama });
}


})

router.post("/logout", (req, res) => {
  console.log("He llegado aquí")
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
})


router.post('/crearCuenta', (req, res) => {
  datosUsuario = { //Recojo la información que viene del forms
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    correo: req.body.correo,
    facultad: req.body.facultad,
    contraseña: req.body.contraseña
  }

  const DAOAp = require("../mysql/daoUsuario")
  const midao = new DAOAp(pool)
  const saltRounds = 10; // Número de rondas para el proceso de hashing (mayor es más seguro, pero más lento)

  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(datosUsuario.contraseña, salt, (err, hash) => {
      // Almacena el 'hash' y el 'salt' en la base de datos
      datosUsuario.contraseña = hash;
      datosUsuario.salt = salt;

      midao.altaUsuario(datosUsuario, (err, datos) => { //Guardamos en la base de datos la información de la reserva
        console.log(err)
        if (err) {
          res.redirect(`/?error=${"Ya existe una cuenta con esos datos"}`); //Si ha ocurrido un error, recargo la ventana con mensaje de fallo
        }
        else {
          res.redirect(`/?exito=${'Cuenta creada con éxito'}`); //Si todo ha ido bien redirijo a /destino con el mensaje de exito
        }
      });

    });
  });


});

module.exports = router;
