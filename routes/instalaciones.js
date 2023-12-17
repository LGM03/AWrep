var express = require('express');
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


router.get('/', (req, res) => { //carga las instalaciones 
  const DAOAp = require("../mysql/daoInstalaciones")
  const midao = new DAOAp(pool)
  const DAOAp2 = require("../mysql/daoConfig")
  const daoC = new DAOAp2(pool)


  midao.leerInstalacionID(req.query.id, (err, datos) => {
    if (err) {
      res.render('error', { error: "Ha ocurrido un error" });//si ocurre un error cargo la ventana de error 
    }
    else {
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
          } // Renderizamos la página principal con la información de todos los instalacion
          res.render('instalacion', {
            instalacion: datos,
            gama: global.gama,
            logo: global.logo,
            titulo: global.titulo,
            direccion: global.direccion
          });
        });
      } else {
        // Si ya tenemos la configuración, renderizamos la página directamente
        res.render('instalacion', {
          instalacion: datos,
          gama: global.gama,
          logo: global.logo,
          titulo: global.titulo,
          direccion: global.direccion
        });
      }
    }
  })
})


const multerFactory = multer({
  storage: multer.memoryStorage(), 
  limits: {
    fileSize: 300000,
  }
});

router.post('/crearInstalacion', multerFactory.single("imagenInstalacion"), function (req, res, next) {
  const DAOAp = require('../mysql/daoInstalaciones')
  const midao = new DAOAp(pool)

  datosInstalacion = {
    nombre: req.body.nombre,
    tipoReserva: req.body.tipoReserva,
    imagenInstalacion: req.file.buffer,
    aforo: req.body.aforo,
    horaInicio: req.body.horaInicio,
    horaFin: req.body.horaFin
  }
  if (req.body.nombre.trim() !== "" && req.body.tipoReserva !== null && req.body.horaFin !== "" && req.body.horaInicio !== "" && req.body.horaFin>req.body.horaInicio) {

    var buffer = req.file.buffer
    const imageBase64 = buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`;

    midao.altaInstalacion(datosInstalacion, (err, datos) => { //subo la info a la bd
      if (err) {
        res.json("0")
      } else {
        res.json({ id: datos, imagen: imageUrl })
      }
    })
  }

})

module.exports = router;