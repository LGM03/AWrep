var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
const multer = require("multer");

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "UCM_RIU",
  port: 3306
})

//Cuando se mande un formulario de reserva 

router.get("/login", async (req, res) => {
  try {
    const DAOAp = require("../mysql/daoUsuario")
    const midao = new DAOAp(pool)
    var correo = req.query.correo
    var contraseña = req.query.contraseña
    midao.leerPorID(correo, async (err, datos) => { //Aqui habria que pasarle la contraseña 
      if (err || datos == null) {
        res.redirect(`/?error=${"Su usuario no existe o no ha sido validado"}`) //Cargo una ventana de error y ha ocurrido un problema
      }
      else {
        const coincide = await bcrypt.compare(contraseña, datos.contraseña)
        if (coincide) {
          var url = "/images/usuario.png"
          if (datos.imagen) {
            const imageBase64 = datos.imagen.toString('base64');
            url = `data:image/png;base64,${imageBase64}`;
          }

          req.session.usuario = {
            nombre: datos.nombre,
            correo: correo,
            apellido1: datos.apellido1,
            apellido2: datos.apellido2,
            rol: datos.rol,
            imagen: url
          };
          res.redirect('/');
        } else {
          res.redirect(`/?error=${"Credenciales no válidas"}`)
        }
      }
    });
  } catch {
    res.redirect(`/?error=${'Ha ocurrido un error'}`)
  }


})

router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.redirect(`/?error=${"Error al cerrar sesión"}`)
    } else {
      res.redirect('/');
    }
  });
})


const multerFactory = multer({
  storage: multer.memoryStorage(), 
  limits: {
    fileSize: 300000,
  }
});
router.post('/crearCuenta', multerFactory.single("imagenUser"), (req, res) => {
  datosUsuario = { //Recojo la información que viene del forms
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    correo: req.body.correo,
    facultad: req.body.facultad,
    curso: req.body.curso,
    grupo: req.body.grupo,
    imagenUser: req.file.buffer,
    contrasena: req.body.contrasena,
  }

  const DAOAp = require("../mysql/daoUsuario")
  const midao = new DAOAp(pool)
  const saltRounds = 10; // Número de rondas para el proceso de hashing (mayor es más seguro, pero más lento)

  if (validarEmail(req.body.correo) && validarnombre(req.body.nombre) && validarnombre(req.body.apellido1) && validarnombre(req.body.apellido2) &&validarnovacio(req.body.facultad) && validarnovacio(req.body.curso)&& validarnovacio(req.body.grupo)) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(datosUsuario.contrasena, salt, (err, hash) => {
        // Almacena el 'hash' y el 'salt' en la base de datos
        datosUsuario.contrasena = hash;
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
  }


});

function validarEmail(email) {//El mail deben ser letras o numeros, seguido de @ seguido de letras y numeros un punto y mas de dos letras
  const emailComprobar = /^[A-Za-z0-9._%+-]+@ucm\.es$/
  return emailComprobar.test(email);
}

function validarnombre(nombre) {//admite nombres y apellidos compuestos y con tildes 
  const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
  return nombreComprobar.test(nombre);
}
function validarnovacio(aux){// miramos que no se incluyan datos vacios en facultad curso y grupo
  return aux!='';
}

module.exports = router;
