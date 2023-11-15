var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "admin_aw",
  password: "",
  database: "viajes"
})

//Cuando se mande un formulario de reserva 

router.post("/login", (req, res) => {
  const DAOAp = require("../mysql/daoUsuario")
  const midao = new DAOAp(pool)
  var correo = req.body.correo
  var contraseña = req.body.contraseña

  midao.leerPorID(correo, (err, datos) => { //Aqui habria que pasarle la contraseña 
    if (err) {
      res.render('error', { error: "Ha ocurrido un error" }); //Cargo una ventana de error y ha ocurrido un problema
    }
    else {
      bcrypt.hash(contraseña, datos.salt, (err, hash) => {
        if (hash === datos.contraseña) {
          console.log("contraseña valida")
          req.session.usuario = {
            nombre: datos.nombre,
            correo: correo
          };
          res.redirect('/');  //Cargo la ventana principal con la información de todos los destinos
        } else {
          res.redirect(`/?error=${"Credenciales no validas"}`);  
        }
      });
    }
  });

})

router.post("/logout", (req, res) => {
  console.log("He llegado aquí")
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      console.log("se ha cerrado sesion")
      res.redirect('/');
    }
  });
  res.redirect('/');
})


router.post('/crearCuenta', (req, res) => {

  datosUsuario = { //Recojo la información que viene del forms
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    correo: req.body.correo,
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
