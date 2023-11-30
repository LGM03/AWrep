var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "UCM_RIU",
  port : 3306
})


router.get('/',(req,res)=>{
  const DAOAp = require("../mysql/daoInstalaciones")
  const midao = new DAOAp(pool)
  console.log("estamos en router get / instalacion"+ req.query.id)

  midao.leerInstalacionID(req.query.id, (err, datos) => {
    if (err) {
      res.render('error',{error:"Ha ocurrido un error"});//si ocurre un error cargo la ventana de error 
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
          } // Renderizamos la página principal con la información de todos los destinos
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

const multerFactory = multer({ storage: multer.memoryStorage() });

router.post('/crearInstalacion', multerFactory.single('imagenInstalaciones'),function(req, res, next){
    const DAOAp = require('../mysql/daoInstalaciones')
    const midao = new DAOAp(pool)

    const imageBuffer = req.file.buffer;  //paso la imagen a binario

    datosInstalacion={
      nombre: req.body.nombre,
      tipoReserva: req.body.tipoReserva,
      imagenInstalacion: imageBuffer,
      aforo: req.body.aforo,
      horaInicio: req.body.horaInicio,
      horaFin: req.body.horaFin
    }
    console.log(datosInstalacion);
    midao.altaInstalacion(datosInstalacion, (err, datos) => { //subo la info a la bd
        if (err) {
            res.send("0")
        } else {
            res.send("1")
        }
    })
})
})
module.exports = router;