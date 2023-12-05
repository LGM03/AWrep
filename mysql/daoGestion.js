
class DAOGestion{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }


    leerValidados(callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * from ucm_aw_riu_usu_usuarios where rol = 0"; //rol 0 representa los usuarios validados
                connection.query(sql, [], function (err, resultado) {
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



    leerTodos(callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * from ucm_aw_riu_usu_usuarios"; //rol -1 representa los usuarios no validados
                connection.query(sql, [], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {

                        for(var i = 0 ; i< resultado.length; i++){
                            const imageBase64 = resultado[i].imagen.toString('base64');
                            resultado[i].imagen = `data:/image/png;base64,${imageBase64}`;
                        }

                        callback(null, resultado); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  

    validarUsuario(correo, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "UPDATE ucm_aw_riu_usu_usuarios set rol = 0 where correo = ?"; //rol 0 representa los usuarios validados
                connection.query(sql, [correo], function (err, resultado) {
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

    
    eliminarUsuario(correo, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "DELETE FROM ucm_aw_riu_usu_usuarios where correo = ?"; //rol 0 representa los usuarios validados
                connection.query(sql, [correo], function (err, resultado) {
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
}


module.exports = DAOGestion
