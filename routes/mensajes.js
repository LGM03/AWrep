var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
    host: "localhost",
    user: "admin_aw",
    password: "",
    database: "UCM_RIU"
})


router.get('/mensajes', function (req, res, next) {

    const DAOAp = require("../mysql/daoMensajes")
    const midao = new DAOAp(pool)

    midao.leerTodos(req.session.usuario.correo, (err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            res.send("0") //si ocurre un error cargo la ventana de error 
        }
        else {
            res.send({mensajes: datos});//Cargo la ventana destino con los mensajes y las imagenes
        }
    });

});

router.post('/', function (req, res, next) {
    const DAOAp = require('../mysql/daoMensaje')
    const midao = new DAOAp(pool)
    var user = req.session.usuario.correo

    datos={
        correoEmisor : user, 
        correoReceptor : req.body.correoReceptor,
        cuerpoMensaje : req.body.cuerpoMensaje,
        fecha: new Date() ,  //fecha actual, en la que se hace el comentario
    }

    midao.altaMensaje(datos, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            res.send(user)
        }
    })
})

module.exports = router;