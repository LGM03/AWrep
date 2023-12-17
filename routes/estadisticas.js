var express = require('express');
var router = express.Router();

const mysql = require("mysql")

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "UCM_RIU",
  port: 3306
})

router.get('/', function (req, res, next) {

  const DAOAp = require("../mysql/daoInstalaciones");
  const midao = new DAOAp(pool);

  const DAOConfig = require("../mysql/daoConfig");
  const daoC = new DAOConfig(pool);

      if (global.titulo == null) {
        daoC.leerConfig((err, configDatos) => {
          if (err) { // Si hay un error en el acceso a la bd, ponemos la info por defecto
            global.titulo = "UCM-RIU";
            global.logo = "/images/logo.png";
            global.gama = "/css/estiloOscuro.css";
          } else { // Si la configuración se obtiene correctamente, la almacenamos en global
            global.titulo = configDatos.nombre;
            const base64String = configDatos.logo.toString('base64');
            const imageUrl = `data:image/png;base64,${base64String}`;
            global.logo = imageUrl;
            global.gama = configDatos.gama;
            global.direccion = configDatos.direccion;
          } // Renderizamos la página principal con la información de todos las instalaciones
          if(req.session.usuario && req.session.usuario.rol == 1){  //Solo puedo acceder a estadisticas si soy admin (rol = 1)
            res.render('estadisticas', {
              usuario: req.session.usuario,
              error: req.query.error,
              exito: req.query.exito,
              gama: global.gama,
              logo: global.logo,
              titulo: global.titulo,
              direccion: global.direccion
            });
          }else{
            res.redirect('/')
          }
        });
      } else {
        // Si ya tenemos la configuración, renderizamos la página directamente
        if(req.session.usuario && req.session.usuario.rol == 1){  //Solo puedo acceder a estadisticas si soy admin (rol = 1)
          res.render('estadisticas', {
            usuario: req.session.usuario,
            error: req.query.error,
            exito: req.query.exito,
            gama: global.gama,
            logo: global.logo,
            titulo: global.titulo,
            direccion: global.direccion
          });
        }else{
          res.redirect('/')
        }
      }
});

router.get('/porFacultad', function (req, res, next) {// consigue lo datos de cada facultad
  const DAOAp = require('../mysql/daoEstadisticas')
  const midao = new DAOAp(pool)
  midao.porFacultad(req.query.facultad ,(err, datos) => {
      if (err) {
          res.json("0")
      } else {
          res.json(datos)
      }
  })
}) 

router.get('/porUsuario', function (req, res, next) {// muestro las reservas de instalaciones que ha hecho el user
  const DAOAp = require('../mysql/daoEstadisticas')
  const midao = new DAOAp(pool)
  midao.porUsuario(req.query.usuario ,(err, datos) => {
      if (err) {
          res.json("0")
      } else {
          res.json(datos)
      }
  })
}) 


module.exports = router;
