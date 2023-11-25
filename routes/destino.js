var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "admin_aw",
  password: "",
  database: "viajes"
})


router.get('/', function (req, res, next) {  

  let id = Number(req.query.id) //Recojo lo datos que vienen en la URL
  let error = req.query.error
  let exito = req.query.exito

  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)

  midao.leerPorID(id, (err, datos) => {  //Leo en la BD los destinos con el id de la url
    if (err) {
      res.render('error',{error:"Ha ocurrido un error"}); //si ocurre un error cargo la ventana de error 
    }
    else {
      midao.leerImagenes(id, (err, imagenes) => {  //Leo en la bd la info de las imagenes del destino dado
        if (err) {
          res.render('error',{error:"Ha ocurrido un error"});//si ocurre un error cargo la ventana de error 
        }
        else { 
          res.render('destino', { destino: datos, imagenes: imagenes, error: error, exito: exito });//Cargo la ventana destino con los mensajes y las imagenes
        }
      });
    }
  });

});


router.get('/itinerario',function(req,res,next){

  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)

    midao.leerItinerario(req.query.ciudad, (err, datos) => {  //Leo en la BD los destinos con el id de la url
    if (err) {
      res.send('0'); //si ocurre un error cargo la ventana de error 
    }
    else {
      res.send(datos)
    }
  });
})
module.exports = router;
