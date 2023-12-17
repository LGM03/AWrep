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

    midao.leerTodos((err, datos) => {  //Leo en la BD los instalacion con el id de la url
        if (err) {
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
                    } // Renderizamos la página principal con la información de todos las instalaciones
                    if (req.session.usuario && req.session.usuario.rol == 1) {  //Solo puedo acceder a gestion de usuarios si soy admin (rol = 1)
                        res.render('gestionUsuarios', {
                            usuarios: datos, logo: global.logo, titulo: global.titulo, gama: global.gama,
                            direccion: global.direccion, sesion: req.session.usuario
                        });
                    } else {
                        res.redirect('/')
                    }
                });
            } else {
                if (req.session.usuario && req.session.usuario.rol == 1) {  //Solo puedo acceder a gestion de usuarios si soy admin (rol = 1)
                    res.render('gestionUsuarios', {
                        usuarios: datos, logo: global.logo, titulo: global.titulo, gama: global.gama,
                        direccion: global.direccion, sesion: req.session.usuario
                    });
                } else {
                    res.redirect('/')
                }
            }
        }
    });
});

router.post('/validar', function (req, res, next) {

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)
    const DAOAs = require("../mysql/daoMensajes")
    const daome = new DAOAs(pool)


    if (validarEmail(req.body.correo) && validarEmail(req.session.usuario.correo)) {
        midao.validarUsuario(req.body.correo, (err, datos) => {  //Leo en la BD las instalaciones con el id de la url
            if (err) {
                res.send("0")
            }
            else {
                var date = new Date().toISOString()
                var mensaje = "Has sido aceptado dentro de la organizacion"
                datos = {
                    correoEmisor: req.session.usuario.correo,
                    correoReceptor: req.body.correo,
                    cuerpoMensaje: mensaje,
                    fecha: date,
                    rolEmisor: req.session.usuario.rol,
                }

                daome.mandaNotificacion(datos, (err, datos) => {
                    if (err) {
                        res.send("0")
                    } else {
                        res.send("1")
                    }
                })
            }
        });

    }
});

router.post('/eliminar', function (req, res, next) {//eliminamos a un user

    const DAOAp = require("../mysql/daoGestion")
    const midao = new DAOAp(pool)
    if (validarEmail(req.body.correo)) {
        midao.eliminarUsuario(req.body.correo, (err, datos) => {  //Leo en la BD las instalaciones con el id de la url
            if (err) {
                res.send("0")
            }
            else {
                res.send("1");//Cargo la ventana origen con los usuarios no validados
            }
        });
    }
});

router.post('/hacerAdmin', function (req, res, next) {// convertimos a un user en admin
    const DAOAp = require('../mysql/daoGestion')
    const midao = new DAOAp(pool)

    if (validarEmail(req.body.correo)) {
        midao.hacerAdmin(req.body.correo, (err, datos) => {
            if (err) {
                res.json("0")
            } else {
                res.json("1")
            }
        })
    }
})

router.get('/filtrar', function (req, res, next) {// listamos todos los usuarios en funcion de los filtros prevuiamente dados
    const DAOAp = require('../mysql/daoGestion')
    const midao = new DAOAp(pool)

    const nombreComprobar = /^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/
    const emailComprobar = /^[A-Za-z0-9._%+-]+@ucm\.es$/
    var filtro = {}

    if (req.query.nombre && nombreComprobar.test(req.query.nombre)) {
        filtro.nombre = req.query.nombre
    }
    if (req.query.apellido1 && nombreComprobar.test(req.query.apellido1)) {
        filtro.apellido1 = req.query.apellido1
    }
    if (req.query.apellido2 && nombreComprobar.test(req.query.apellido2)) {
        filtro.apellido2 = req.query.apellido2
    }
    if (req.query.correo && emailComprobar.test(req.query.correo)) {
        filtro.nombre = req.query.nombre
    }
    if (req.query.curso) {
        filtro.curso = req.query.curso
    }
    if (req.query.facultad) {
        filtro.facultad = req.query.facultad
    }
    if (req.query.grupo) {
        filtro.grupo = req.query.grupo
    }


    midao.filtrar(filtro, (err, datos) => {
        if (err) {
            res.json("0")
        } else {
            res.json(datos)
        }
    })
})

router.get('/listarTodos', function (req, res, next) {// listamso todos los usuarios
    const DAOAp = require('../mysql/daoGestion')
    const midao = new DAOAp(pool)
    midao.listarTodos((err, datos) => {
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


module.exports = router;
