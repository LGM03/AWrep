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
    console.log(req.body)
    
    datosReserva = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        fecha: req.body.fecha,
        destino : req.query.id
    }

    console.log("!! "+datosReserva.nombre+ " "+ datosReserva.apellido + " "+ datosReserva.correo + " "+ datosReserva.fecha+ " "+ datosReserva.destino)

    //Compruebo que se han introducido todos los datos necesarios 
    if (!esValido(datosReserva)) {
        res.redirect(`/destino?id=${req.query.id}&error=${'Datos de reserva no validos'}`);
        return;
    }

    const DAOAp = require("../mysql/daoReserva")
    const midao = new DAOAp(pool)

    midao.altaReserva(datosReserva, (err, datos) => {
        if (err) {
            console.log(err);  //Si hay un error tengo que poner un mensaje de alerta 
            console.log("FALLO")
            res.redirect(`/destino?id=${req.query.id}&error=${"No se ha podido realizar la reserva"}`);
        }
        else {
            console.log("EXITO")
            res.redirect(`/destino?id=${req.query.id}&exito=${'Reserva guardada con éxito'}`);
        }
    });

});

function esValido(datos) {
    const nombreComprobar = /^[A-Za-z]+$/
    const emailComprobar = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    const fechaComprobar = /^(\d{4}\-\d{1,2}\-\d{1,2})$/
   
    console.log("AQUI VIENEN LAS COMPROBACIONES")

    console.log(nombreComprobar.test(datos.nombre))
    console.log( nombreComprobar.test(datos.apellido))
    console.log( emailComprobar.test(datos.correo))
    console.log(datos.fecha)
    console.log(fechaComprobar.test((datos.fecha)))

    return nombreComprobar.test(datos.nombre) && nombreComprobar.test(datos.apellido) && emailComprobar.test(datos.correo) && fechaComprobar.test((datos.fecha))
}


module.exports = router;
