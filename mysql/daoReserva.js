

class DAOReserva{ //DAO que accede a la tabla reservas de la BD

    constructor(pool) {
        this.pool = pool
    }

    altaReserva(datosReserva, callback) { //guarda en la base de datos la información de la reserva
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);  //Si ocurre algun error retornamos el error
            } else {
                const sql = "INSERT INTO `reservas` (`id`, `destino_id`, `nombre_cliente`, `correo_cliente`, `fecha_reserva`) VALUES (NULL, ?,?,?,?);";
                let nombre = datosReserva.nombre + " "+ datosReserva.apellido
                connection.query(sql,[datosReserva.destino,nombre, datosReserva.correo,datosReserva.fecha], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err, null); //Si ocurre algun error retornamos el error
                    } else {
                        callback(null, resultado); //Si todo va bien devolvemos la información 
                    }
                });
            }
        });
    }  

}


module.exports = DAOReserva
