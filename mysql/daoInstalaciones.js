class DAOInstalaciones{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    leerTodas(callback) { //Lee todos los destinos de la base de datos 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * from ucm_aw_riu_ins_instalaciones ";
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

    altaInstalacion(datos,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "insert into ucm_aw_riu_ins_instalaciones (nombre,tipoReserva,imagen) values (,?,?,?)";
                connection.query(sql, [datos.nombre, datos.tipoReserva, datos.imagen], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        console.log(err)
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  

    leerInstalacionID(id,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select * from ucm_aw_riu_ins_instalaciones where id  = ?"; //Recojo toda la info de esta instalacion
                connection.query(sql, [id], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado[0]); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  
}


module.exports = DAOInstalaciones