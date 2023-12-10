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


router.get('/porInstyDia', function (req, res, next) {
    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    var info = {
        id : req.query.id,
        dia : req.query.dia
    }

    midao.leerReservaPorInstyDia(info, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json({reservas : datos, esAdmin : req.session.usuario.rol})
        }
    })
})

router.get('/', function (req, res, next) {

    const DAOAp = require("../mysql/daoReserva")
    const midao = new DAOAp(pool)
    const DAOConfig = require("../mysql/daoConfig");
    const daoC = new DAOConfig(pool);

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
            res.render('gestionReserva', {
                logo: global.logo, titulo: global.titulo, gama: global.gama,
                direccion: global.direccion, sesion: req.session.usuario
            });
        });
    } else {
        res.render('gestionReserva', {
            logo: global.logo, titulo: global.titulo, gama: global.gama,
            direccion: global.direccion, sesion: req.session.usuario
        });//Cargo la ventana destino con los usuarios no validados
    }

});


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
        fechaFin: req.body.fechaFin,
        fechaIni: req.body.fechaIni,
        instalacion: req.body.instalacion,
    }

    midao.comprobarOcupacion(datosReserva, (err,datos) =>{
        if (err) {
            res.json("-1")
        } else if(datos.length != 0) { //Si hay coincidente guardo en lista de espera
            midao.listaEspera(datosReserva, (err, datos) => {
                if (err) {
                    res.json("-1")
                } else {
                    res.json("0")
                }
            })
        }else{ //si no hay reservas coincidentes
            console.log(datos)
            midao.altaReserva(datosReserva, (err, datos) => {
                if (err) {
                    res.json("0")
                } else {
                    res.json("1")
                }
            })
        }
    })
})

router.get('/filtrar', function (req, res, next) {
    console.log("ASGASG")
    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)
    if (req.session.usuario.rol == 1) {

        midao.leerReservas((err, datos) => { //Saca todas las reservas si es el admin
            if (err) {
                res.json("0")
            } else {
                //retorno tambien el rol para saber como construir la vista
                res.json({ datos: datos, esAdmin: req.session.usuario.rol })
            }
        })

    } else {
        midao.leerReservaPorUsuario(req.session.usuario.correo, (err, datos) => { //Si es usuario saca solo sus reservas
            if (err) {
                res.json("0")
            } else {
                res.json({ datos: datos, esAdmin: req.session.usuario.rol })
            }
        })
    }

})



router.delete('/borrarReserva', function (req, res, next) {

    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    console.log(req.body.idReserva)

    midao.borrarReserva(req.body.idReserva , (err, datos) => { //Saca todas las reservas si es el admin
        if (err) {
            res.json("0")
        } else {
            //retorno tambien el rol para saber como construir la vista
            res.json("1")
        }
    })

})

router.get('/leerListaEspera', function (req, res, next) {

    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    midao.leerListaEspera({id : req.query.id,dia : req.query.dia}, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json(datos)
        }
    })
})



module.exports = router;
