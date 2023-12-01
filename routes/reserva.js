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
   
router.post('/direccion', function (req, res, next) {
    const DAOAp = require('../mysql/daoConfig')
    const midao = new DAOAp(pool)

    midao.altaReserva(req.body.datos, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            res.send("1")
        }
    })
})

module.exports = router;
