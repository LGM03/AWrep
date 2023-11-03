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
router.get('/', function (req, res, next) {
  
  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)

  midao.leerTodos(null, (err, datos) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("HOLA = "+datos)
      res.render('index', { destinos : datos }); 
    }
  });
});

module.exports = router;
