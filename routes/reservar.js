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
            res.redirect(`/destino?id=${req.query.id}&error=${"No se ha podido realizar la reserva"}`);
        }
        else {
            res.redirect(`/destino?id=${req.query.id}&error=${'Reserva guardada con éxito'}`);
        }
    });

});

function esValido(datos) {
    const nombreComprobar = /^[A-Za-z]+$/
    const emailComprobar = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const fechaComprobar = /^(\d{2}\/\d{2}\/\d{4})$/


    return nombreComprobar.test(datos.nombre) && nombreComprobar.test(datos.apellido) && emailComprobar.test(datos.email) && fechaComprobar(datos.fecha)
}


module.exports = router;
