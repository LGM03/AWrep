var nombre 

class DAODestino{

    constructor(pool) {
        this.pool = pool
    }

    leerDestino(usuario, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(`Error al obtener la conexión: ${err.message}`);
                callback(err, null);
            } else {
                const sql = "SELECT * from destinos";
                connection.query(sql, null, function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log(`Error en la consulta a la base de datos: ${err.message}`);
                        callback(err, null);
                    } else {
                        callback(null, resultado[0].nombre);
                    }
                });
            }
        });
    }  //index.js crea el pool de conexiones, al llamar al consructor del dao le paso el pool, 
}


module.exports = DAODestino
