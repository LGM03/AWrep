var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "UCM_RIU",
    port: 3306
})
   
router.post('/alta', function (req, res, next) {
    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)
    var datosReserva = {
        correo: req.body.correo,
            fechaFin : req.body.fechaFin,
            fechaIni : req.body.fechaIni,
            instalacion:  req.body.instalacion
    }

    midao.altaReserva(datosReserva, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            res.send("1")
        }
    })
})

module.exports = router;
