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


const DAOAp = require("../mysql/daoInstalaciones")
const midao = new DAOAp(pool)

const DAOConfig = require("../mysql/daoConfig")
const daoC = new DAOConfig(pool)

router.get('/', function (req, res, next) {

  console.log("hoala?")
  const DAOAp = require("../mysql/daoInstalaciones");
  const midao = new DAOAp(pool);

  const DAOConfig = require("../mysql/daoConfig");
  const daoC = new DAOConfig(pool);

  midao.leerTodas((err, datos) => {
    if (err) {
      res.render('error', { error: "Ha ocurrido un error" });
    } else {
      if (global.titulo == null) {
        daoC.leerConfig((err, configDatos) => {
          if (err) { // Si hay un error en el acceso a la bd, ponemos la info por defecto
            global.titulo = "UCM-RIU";
            global.logo = "/images/logo.png";
            global.gama = "/css/estiloOscuro.css";
          } else { // Si la configuración se obtiene correctamente, la almacenamos en global
            global.titulo = configDatos.nombre;
            global.logo = configDatos.logo;
            global.gama = configDatos.gama;
            global.direccion = configDatos.direccion;
          } // Renderizamos la página principal con la información de todos los destinos
          res.render('index', {
            instalaciones: datos,
            usuario: req.session.usuario,
            error: req.query.error,
            exito: req.query.exito,
            gama: global.gama,
            logo: global.logo,
            titulo: global.titulo,
            direccion : global.direccion
          });
        });
      } else {
        // Si ya tenemos la configuración, renderizamos la página directamente
        res.render('index', {
          instalaciones: datos,
          usuario: req.session.usuario,
          error: req.query.error,
          exito: req.query.exito,
          gama: global.gama,
          logo: global.logo,
          titulo: global.titulo,
          direccion : global.direccion
        });
      }
    }
  });

});

module.exports = router;
