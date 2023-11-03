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
  //res.render('index', { title: 'Express' });  //Pagina dinamica
  console.log("hola?")
  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)
  midao.insertarUsuario(usuario, midao.cb_insertarUsuario)
  console.log(midao.nombre)
  res.sendFile('public/index.html'); //Pagina estatica, puede llevar parametros
});



module.exports = router;
