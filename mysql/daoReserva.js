

class DAOReserva{

    constructor(pool) {
        this.pool = pool
    }

    altaReserva(datosReserva, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(`Error al obtener la conexión: ${err.message}`);
                callback(err, null);
            } else {
                const sql = "INSERT INTO `reservas` (`id`, `destino_id`, `nombre_cliente`, `correo_cliente`, `fecha_reserva`) VALUES (NULL, ?,?,?,?);";
                let nombre = datosReserva.nombre + " "+ datosReserva.apellido
                connection.query(sql,[datosReserva.destino,nombre, datosReserva.correo,datosReserva.fecha], function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log(`Error en la consulta a la base de datos: ${err.message}`);
                        callback(err, null);
                    } else {
                        callback(null, resultado);
                    }
                });
            }
        });
    }  

}


module.exports = DAOReserva
