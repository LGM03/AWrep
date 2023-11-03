var nombre 

class DAODestino{

    constructor(pool) {
        this.pool = pool
    }

    leerDestino(usuario, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`Error al obtener la conexión: ${err.message}`);
            }
            else {
                const sql= "SELECT TOP 1 Nombre from destinos"
                connection.query( 
                    sql, None,function(err, resultado) {
                        connection.release();
                        nombre= resultado
                    callback(err,resultado)
                });
            }
        });
    }  //index.js crea el pool de conexiones, al llamar al consructor del dao le paso el pool, 

    cb_insertarUsuario(err,resultado){
        if (err) {
        console.log("ERROR EN LA INSERCIÓN DE USUARIO");
        console.log(err)
        }
        else {
        console.log("USUARIO INSERTADO CORRECTAMENTE" + resultado);
        }
    };
    
}


module.exports = DAODestino
