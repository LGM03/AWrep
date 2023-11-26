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


router.get('/', function (req, res, next) {

    const DAOAp = require("../mysql/daoComentarios")
    const midao = new DAOAp(pool)
    console.log("ABC" + req.query.ciudad)

    midao.leerTodos(req.query.ciudad, (err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            console.log(err)
            res.send("0") //si ocurre un error cargo la ventana de error 
        }
        else {
            var user = "anonimo"
            if (req.session.usuario != null) {
                user = req.session.usuario.nombre + " " + req.session.usuario.apellido
            }
            console.log(user)
            res.send({ comentarios: datos, usuario: user});//Cargo la ventana destino con los mensajes y las imagenes
        }
    });

});

router.post('/', function (req, res, next) {
    const DAOAp = require('../mysql/daoComentarios')
    const midao = new DAOAp(pool)

    console.log("ASDFASF222"+ req.body.destino + " "+ req.body.comentario)
    var user = "anonimo"
    if (req.session.usuario != null) {
        user = req.session.usuario.nombre + " " + req.session.usuario.apellido
    }


    datos={
        nombre : user, 
        comentario : req.body.comentario,
        fecha: new Date() ,  //fecha actual, en la que se hace el comentario
        destino: req.body.destino 
    }

    midao.altaComentario(datos, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            res.send(user)
        }
    })
})

module.exports = router;
