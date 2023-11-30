var express = require('express');
var router = express.Router();

const mysql = require("mysql")

const pool = mysql.createPool({  //La conexion
  host: "localhost",
  user: "admin_aw",
  password: "",
  database: "viajes"
})


router.get('/', function (req, res, next) {
  
  const DAOAp = require("../mysql/daoDestino")
  const midao = new DAOAp(pool)
  midao.leerTodos((err, datos) => { //Accedo a la base de datos 
    if (err) {
      res.render('error',{error:"Ha ocurrido un error"}); //Cargo una ventana de error y ha ocurrido un problema
    }
    else {
      
      res.render('index', { destinos : datos, usuario : req.session.usuario, error : req.query.error, exito:req.query.exito });  //Cargo la ventana principal con la información de todos los destinos
    }
  });
});

module.exports = router;
