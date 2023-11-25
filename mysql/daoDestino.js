
class DAODestino{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    leerTodos(callback) { //Lee todos los destinos de la base de datos 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * from destinos";
                connection.query(sql, null, function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }   
 
    leerPorID(id, callback) { //Leo un destino en funcion de su id
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ocurre un error lo retorno 
            } else {
                const sql = "SELECT * from destinos where id = ?";
                connection.query(sql, [id] , function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, resultado[0]);  //Si todo ha ido bien retorno los datos del destino
                    }
                });
            }
        });
    } 

    leerImagenes(id,callback){ //Leo las imagenes de un destino en concreto
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error lo retorno
            } else {
                const sql = "SELECT * from imagendestino where idDestino = ?";
                connection.query(sql, [id] , function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error lo retorno
                    } else {
                        callback(null, resultado); //Si todo ha ido bien devuelvo toda la información
                    }
                });
            }
        });
    }
    
    leerItinerario(destino,callback){
        this.pool.getConnection(function(err,connection){
            if(err){
                callback(err,null)
            }else{
                const sql = "SELECT itinerario from destinos where id = ?";
                connection.query(sql, [destino] , function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error lo retorno
                    } else {
                        callback(null, resultado[0].itinerario); //Si todo ha ido bien devuelvo toda la información
                    }
                });
            }
        })
    }
}


module.exports = DAODestino
