var express = require('express');
var router = express.Router();

const multer = require("multer");

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
                const base64String = configDatos.logo.toString('base64');
                const imageUrl = `data:image/png;base64,${base64String}`;
                global.logo = imageUrl;
                global.gama = configDatos.gama;
                global.direccion = configDatos.direccion;
            } // Renderizamos la página principal con la información de todos las instalaciones
            if (req.session.usuario && req.session.usuario.rol == 1) {
                res.render('configuracionSistema', {
                    gama: global.gama,
                    logo: global.logo,
                    titulo: global.titulo,
                    direccion: global.direccion
                });
            } else {
                res.redirect('/')
            }

        });
    } else {
        // Si ya tenemos la configuración, renderizamos la página directamente
        if (req.session.usuario && req.session.usuario.rol == 1) {  //Si el usuario es un admin cargo la ventana de configuracion
            res.render('configuracionSistema', {
                gama: global.gama,
                logo: global.logo,
                titulo: global.titulo,
                direccion: global.direccion
            });
        } else {   //Si no es admin redirijo a ventana principal
            res.redirect('/')
        }

    }

})

router.post('/titulo', function (req, res, next) {// modifica el titulo
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

router.post('/gama', function (req, res, next) {//modifica la gama
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

router.post('/direccion', function (req, res, next) {//modifica la direcion fisica de abajo
    const DAOAp = require('../mysql/daoConfig')
    const midao = new DAOAp(pool)

    midao.altaDireccion(req.body.direccion, (err, datos) => {
        if (err) {
            res.send("0")
        } else {
            global.direccion = req.body.direccion
            res.send("1")
        }
    })
})

const multerFactory = multer({
    storage: multer.memoryStorage(), 
    limits: {   //Si la imagen es mas grande de los limites, tira excepcion
        fileSize: 300000,
    }
});

router.post('/logo', multerFactory.single('logo'), function (req, res, next) {// modifica el mogo
    const DAOAp = require('../mysql/daoConfig')
    const midao = new DAOAp(pool)

    const imageBuffer = req.file.buffer;  //paso la imagen a binario

    midao.altaLogo(imageBuffer, (err, datos) => { //subo la imagen a la bd
        if (err) {
            res.send("0")
        } else {
            const imageBase64 = imageBuffer.toString('base64');
            // Crea la URL base64
            const imageUrl = `data:${req.file.mimetype};base64,${imageBase64}`;
            // Envía la URL de la imagen como respuesta al cliente

            global.logo = imageUrl
            res.send(imageUrl)
        }
    })
})


module.exports = router;
