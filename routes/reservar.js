var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
    host: "localhost",
    user: "admin_aw",
    password: "",
    database: "viajes"
})

//Cuando se mande un formulario de reserva 
router.post('/', (req, res) => {
    
    datosReserva = { //Recojo la información que viene del forms
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        fecha: req.body.fecha,
        destino : req.query.id
    }

    const DAOAp = require("../mysql/daoReserva")
    const midao = new DAOAp(pool)

    midao.altaReserva(datosReserva, (err, datos) => { //Guardamos en la base de datos la información de la reserva
        if (err) {
            res.redirect(`/destino?id=${req.query.id}&error=${"No se ha podido realizar la reserva"}`); //Si ha ocurrido un error, recargo la ventana con mensaje de fallo
        }
        else {
            res.redirect(`/destino?id=${req.query.id}&exito=${'Reserva guardada con éxito'}`); //Si todo ha ido bien redirijo a /destino con el mensaje de exito
        }
    });

});

module.exports = router;
