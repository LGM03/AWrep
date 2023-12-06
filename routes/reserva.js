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
   
router.get('/porInst', function (req, res, next) {
    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    midao.leerReservaPorInst(req.query.id, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json(datos)
        }
    })
}) 

router.get('/porUsuario', function (req, res, next) {
    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    midao.leerReservaPorUsuario(req.query.correo, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json(datos)
        }
    })
}) 


router.get('/infoUsuarioReserva', function (req, res, next) {

    const DAOAp = require('../mysql/daoUsuario')
    const midao = new DAOAp(pool)
  
    midao.leerPorID(req.query.correo, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json(datos)
        }
    })
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
