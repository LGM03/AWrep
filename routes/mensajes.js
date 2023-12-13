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


router.get('/', function (req, res, next) {  //Cargo la configuracion para la ventana de mensajes

    const DAOAp = require("../mysql/daoMensajes")
    const midao = new DAOAp(pool)
    const DAOAp2 = require("../mysql/daoConfig")
    const daoC = new DAOAp2(pool)

    if (global.titulo == null) {
        daoC.leerConfig((err, configDatos) => {
            if (err) { // Si hay un error en el acceso a la bd, ponemos la info por defecto
                global.titulo = "CUM-RIU";
                global.logo = "/images/logo.png";
                global.gama = "/css/estiloOscuro.css";
                global.direccion = "Av. de Madrid"
            } else { // Si la configuración se obtiene correctamente, la almacenamos en global
                global.titulo = configDatos.nombre;
                const base64String = configDatos.logo.toString('base64');
                const imageUrl = `data:image/png;base64,${base64String}`;
                global.logo = imageUrl;
                global.gama = configDatos.gama;
                global.direccion = configDatos.direccion;
            } // Renderizamos la página principal con la información de todos los destinos
            res.render('mensajes', {
                logo: global.logo, titulo: global.titulo, gama: global.gama,
                direccion: global.direccion, sesion: req.session.usuario
            });
        });
    } else {
        res.render('mensajes', {
            logo: global.logo, titulo: global.titulo, gama: global.gama,
            direccion: global.direccion, sesion: req.session.usuario
        });//Cargo la ventana destino con los usuarios no validados
    }

});

router.get('/leerEnviados', function (req, res, next) {

    const DAOAp = require("../mysql/daoMensajes")
    const midao = new DAOAp(pool)


    midao.leerTodos(req.session.usuario.correo, (err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            console.log(err)
            res.send("0") //si ocurre un error cargo la ventana de error 
        }
        else {
            res.json({mensajes : datos, usuario : req.session.usuario})
        }
    })

    });



router.post('/mandarMensaje', function (req, res, next) {
    const DAOAp = require('../mysql/daoMensajes')
    const midao = new DAOAp(pool)
    console.log("ASDFASF")

    var date = new Date().toISOString()
    datos = {
        correoEmisor: req.body.correoEmisor,
        correoReceptor: req.body.correoReceptor,
        cuerpoMensaje: req.body.cuerpoMensaje,
        fecha: date,
        rolEmisor: req.session.usuario.rol,
    }

    midao.altaMensaje(datos, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            console.log("1223123")
            res.json(datos)
        }
    })
})

module.exports = router;