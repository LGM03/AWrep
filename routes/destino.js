var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "admin_aw",
  password: "",
  database: "viajes"
})


/* GET home page. */
router.get('/', function(req, res, next) {
  

  let id = Number(req.query.id);

  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)

  midao.leerPorID(id, (err, datos) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(datos)
      res.render('destino', { destino : datos }); 
    }
  });

});

module.exports = router;
