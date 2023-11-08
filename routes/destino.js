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

  let id = Number(req.query.id)
  let error = req.query.error
  let exito = req.query.exito

  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)

  midao.leerPorID(id, (err, datos) => {
    if (err) {
      res.render('error',{error:"Ha ocurrido un error"});
    }
    else {
      midao.leerImagenes(id, (err, imagenes) => {
        if (err) {
          res.render('error',{error:"Ha ocurrido un error"});
        }
        else {
          res.render('destino', { destino: datos, imagenes: imagenes, error: error, exito: exito });
        }
      });
    }
  });

});

module.exports = router;
