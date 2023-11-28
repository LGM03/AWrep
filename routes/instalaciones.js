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

router.post('/crearInstalacion',(req,res)=>{
   
    datosInstalacion={
        nombre: req.body.nombre,
        tipoReserva: req.body.tipoReserva,
        imagenInstalacion: req.body.imagenInstalacion
    }
    console.log(datosInstalacion);

    const DAOAp = require("../mysql/daoInstalaciones")
    const midao = new DAOAp(pool)

    midao.altaInstalacion(datos, (err, datos) => {
        if (err) {
            res.redirect(`/?error=${"No se ha dado de alta la instalacion"}`); //Si ha ocurrido un error, recargo la ventana con mensaje de fallo
          }
          else {
            res.redirect(`/?exito=${'instalacion creada con éxito'}`); //Si todo ha ido bien recargo la instalacion
          }
    })

});
module.exports = router;