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

router.get("/", function (req, res, next) {

    const DAOAp = require("../mysql/daoInstalaciones");
    const midao = new DAOAp(pool);

    const DAOConfig = require("../mysql/daoConfig");
    const daoC = new DAOConfig(pool);

    if (global.titulo == null) {
        daoC.leerConfig((err, configDatos) => {
            if (err) { // Si hay un error en el acceso a la bd, ponemos la info por defecto
                global.titulo = "UCM-RIU";
                global.logo = "/images/logo.png";
                global.gama = "/css/estiloOscuro.css";
                global.direccion = "Av. de Madrid"
            } else { // Si la configuración se obtiene correctamente, la almacenamos en global
                global.titulo = configDatos.nombre;
                global.logo = configDatos.logo;
                global.gama = configDatos.gama;
                global.direccion = configDatos.direccion;
            } // Renderizamos la página principal con la información de todos los destinos
            res.render('configuracionSistema', {
                gama: global.gama,
                logo: global.logo,
                titulo: global.titulo,
                direccion : global.direccion
            });
        });
    } else {
        // Si ya tenemos la configuración, renderizamos la página directamente
        res.render('configuracionSistema', {
            gama: global.gama,
            logo: global.logo,
            titulo: global.titulo,
            direccion : global.direccion
        });
    }

})

router.post('/titulo', function (req, res, next) {
    const DAOAp = require('../mysql/daoConfig')
    const midao = new DAOAp(pool)

    midao.altaTitulo(req.body.titulo, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            global.titulo = req.body.titulo
            res.send("1")
        }
    })
})

router.post('/gama', function (req, res, next) {
    const DAOAp = require('../mysql/daoConfig')
    const midao = new DAOAp(pool)

    midao.altaGama(req.body.gama, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            global.gama = req.body.gama
            res.send("1")
        }
    })
})


module.exports = router;
