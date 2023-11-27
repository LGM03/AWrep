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


router.get('/validar', function (req, res, next) {  

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)

    midao.leerNOValidados((err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            console.log(err)
            res.send("0") //si ocurre un error cargo la ventana de error 
        }
        else {
            res.render('gestionUsuarios',{usuarios : datos, logo : global.logo, titulo : global.titulo, gama: global.gama});//Cargo la ventana destino con los usuarios no validados
        }
    });
});

router.post('/validar', function (req, res, next) {  

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)

    midao.validarUsuario(req.body.correo,(err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            console.log(err)
            res.send("0") 
        }
        else {
            res.send("1");//Cargo la ventana destino con los usuarios no validados
        }
    });
});

router.post('/eliminar', function (req, res, next) {  

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)

    midao.eliminarUsuario(req.body.correo,(err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            console.log(err)
            res.send("0") 
        }
        else {
            res.send("1");//Cargo la ventana destino con los usuarios no validados
        }
    });
});



module.exports = router;
