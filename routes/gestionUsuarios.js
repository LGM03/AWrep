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


router.get('/validar', function (req, res, next) {

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)
    const DAOConfig = require("../mysql/daoConfig");
    const daoC = new DAOConfig(pool);

    midao.leerTodos((err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            console.log(err)
            res.send("0") //si ocurre un error cargo la ventana de error 
        }
        else {
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
                    res.render('gestionUsuarios', {
                        usuarios: datos, logo: global.logo, titulo: global.titulo, gama: global.gama,
                        direccion: global.direccion,sesion :req.session.usuario
                    });
                });
            } else {
                res.render('gestionUsuarios', {
                    usuarios: datos, logo: global.logo, titulo: global.titulo, gama: global.gama,
                    direccion: global.direccion, sesion :req.session.usuario
                });//Cargo la ventana destino con los usuarios no validados
            }
        }
    });
});

router.post('/validar', function (req, res, next) {

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)

    midao.validarUsuario(req.body.correo, (err, datos) => {  //Leo en la BD los destinos con el id de la url
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

    midao.eliminarUsuario(req.body.correo, (err, datos) => {  //Leo en la BD los destinos con el id de la url
        if (err) {
            res.send("0")
        }
        else {
            res.send("1");//Cargo la ventana destino con los usuarios no validados
        }
    });
});

router.post('/hacerAdmin', function (req, res, next) {
    const DAOAp = require('../mysql/daoGestion')
    const midao = new DAOAp(pool)

    midao.hacerAdmin(req.body.correo, (err, datos) => {
        if (err) {
            console.log(err)
            res.json("0")
        } else {
            res.json("1")
        }
    })
}) 



module.exports = router;
