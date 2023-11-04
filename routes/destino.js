var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "admin_aw",
  password: "",
  database: "viajes"
})


router.get('/', function(req, res, next) {
  
  let id = Number(req.query.id)
  let error = req.query.error
  console.log("HAS SIDO REDIRIIGDO "+ id + error)

  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)

  midao.leerPorID(id, (err, datos) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(datos)
      res.render('destino', { destino : datos , mensaje : error}); 
    }
  });

});

module.exports = router;
