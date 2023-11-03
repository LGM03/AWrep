var nombre 

class DAODestino{

    constructor(pool) {
        this.pool = pool
    }

    leerTodos(usuario, callback) {
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
                        callback(null, resultado);
                    }
                });
            }
        });
    }  //index.js crea el pool de conexiones, al llamar al consructor del dao le paso el pool, 


    
    leerPorID(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                console.log(`Error al obtener la conexión: ${err.message}`);
                callback(err, null);
            } else {
                const sql = "SELECT * from destinos where id = ?";
                connection.query(sql, [id] , function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log(`Error en la consulta a la base de datos: ${err.message}`);
                        callback(err, null);
                    } else {
                        callback(null, resultado[0]);
                    }
                });
            }
        });
    } 
}


module.exports = DAODestino
