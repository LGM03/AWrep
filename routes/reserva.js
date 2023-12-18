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
        id: req.query.id,
        dia: req.query.dia
    }

    midao.leerReservaPorInstyDia(info, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json({ reservas: datos, esAdmin: req.session.usuario.rol })
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
            } // Renderizamos la página principal con la información de todas las instalaciones
            if (req.session.usuario && req.session.usuario.rol !== -1) {  //Si tengo usuario validado o admin cargo gestion de reserva
                res.render('gestionReserva', {
                    logo: global.logo, titulo: global.titulo, gama: global.gama,
                    direccion: global.direccion, sesion: req.session.usuario
                });
            } else {   //Si no tengo usuario o tengo usuario no validado, redirijo a ventana principal
                res.redirect('/')
            }
        });
    } else {
        if (req.session.usuario && req.session.usuario.rol !== -1) {  //Si tengo usuario validado o admin cargo gestion de reserva
            res.render('gestionReserva', {
                logo: global.logo, titulo: global.titulo, gama: global.gama,
                direccion: global.direccion, sesion: req.session.usuario
            });
        } else {   //Si no tengo usuario o tengo usuario no validado, redirijo a ventana principal
            res.redirect('/')
        }
    }

});


router.get('/porUsuario', function (req, res, next) {
    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)


    if (validarEmail(req.query.correo)) {
        midao.todasReservasPorUsuario(req.query.correo, (err, datos) => {
            if (err) {
                res.json("0")
            } else {
                res.json(datos)
            }
        })
    }
})


router.get('/infoUsuarioReserva', function (req, res, next) {

    const DAOAp = require('../mysql/daoUsuario')
    const midao = new DAOAp(pool)
    if (validarEmail(req.query.correo)) {
        midao.leerPorID(req.query.correo, (err, datos) => {
            if (err) {
                res.json("0")
            } else {
                res.json(datos)
            }
        })
    }
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

    if (validarEmail(req.body.correo)) {
        midao.comprobarOcupacion(datosReserva, (err, datos) => {
            if (err) {
                res.json("-1")
            } else if (datos.length != 0) { //Si hay coincidente guardo en lista de espera
                midao.listaEspera(datosReserva, (err, datos) => {
                    if (err) {
                        res.json("-1")
                    } else {
                        res.json("0")
                    }
                })
            } else { //si no hay reservas coincidentes

                midao.altaReserva(datosReserva, (err, datos) => {
                    if (err) {
                        res.json("0")
                    } else {
                        res.json("1")
                    }
                })
            }
        })
    }
})

router.get('/filtrar', function (req, res, next) {

    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    var filtro = {
        nombre: req.query.nombre,
        apellido1: req.query.apellido1,
        apellido2: req.query.apellido2,
        correo: req.query.correo,
        facultad: req.query.facultad,
        fechaFin: req.query.fechaFin,
        fechaIni: req.query.fechaIni,
        instalacion: req.query.instalacion,
        usuario :req.session.usuario.correo

    }
    if (validarFiltro(filtro)) {

        if (req.session.usuario.rol == 1) {
            
            midao.leerReservas(filtro, (err, datos) => { //Saca todas las reservas si es el admin
                if (err) {
                    res.json("0")
                } else {
                    //retorno tambien el rol para saber como construir la vista
                    res.json({ datos: datos, esAdmin: req.session.usuario.rol })
                }
            })
        } else {
            midao.leerReservaPorUsuario(filtro, (err, datos) => { //Si es usuario saca solo sus reservas
                if (err) {
                    res.json("0")
                } else {
                    res.json({ datos: datos, esAdmin: req.session.usuario.rol })
                }
            })
        }
    } else {
        res.json("0")
    }

})

function validarFiltro(datos) {

    if (datos.nombre && datos.nombre.trim() !== "") {
        if (!validarnombre(nombre)) {
            return false
        }
    }

    if (datos.apellido1 && datos.apellido1.trim() !== "") {
        if (!validarnombre(datos.apellido1)) {
       
            return false
        }
    }
    if (datos.apellido2 && datos.apellido2.trim() !== "") {
        if (!validarnombre(datos.apellido2)) {
        
            return false
        }
    }
    if (datos.correo && datos.correo.trim() !== "" && !validarEmail(datos.correo)) {
        return false
    }

    if (datos.instalacion == "") {
        datos.instalacion = null
    }

    if (datos.fechaFin && datos.fechaIni > datos.fechaFin) {
        return false
    }

    if( datos.fechaFin == ""){
        datos.fechaFin= null
    }

    if( datos.fechaIni == ""){
        datos.fechaIni= null
    }

    if (datos.facultad == "") {
        datos.facultad = null
    }
    return true
}

router.delete('/borrarReserva', function (req, res, next) {

    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    

    midao.notificacionAdelantarListaespera(req.body.idReserva, (err, datos) => { //avisamos al usuarion que ahora va a ser el nuevo 
    })

    midao.borrarReserva(req.body.idReserva, (err, datos) => { //Saca todas las reservas si es el admin
        if (err) {
            res.json("0")
        } else {
            //retorno tambien el rol para saber como construir la vista
            res.json("1")
        }
    })
})

router.delete('/eliminarEspera', function (req, res, next) {

    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    midao.borrarEspera(req.body.idEspera, (err, datos) => { //Saca todas las reservas si es el admin
        if (err) {
            res.json("0")
        } else {
            res.json("1")
        }
    })
})

router.get('/leerListaEspera', function (req, res, next) {

    const DAOAp = require('../mysql/daoReserva')
    const midao = new DAOAp(pool)

    midao.leerListaEspera({ id: req.query.id, dia: req.query.dia }, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json(datos)
        }
    })
})

function validarEmail(email) {//El mail deben ser letras o numeros, seguido de @ seguido de letras y numeros un punto y mas de dos letras
    const emailComprobar = /^[A-Za-z0-9._%+-]+@ucm\.es$/
    return emailComprobar.test(email);
}

function validarnombre(nombre) {//admite nombres y apellidos compuestos y con tildes 
    const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
    return nombreComprobar.test(nombre);
}


module.exports = router;
