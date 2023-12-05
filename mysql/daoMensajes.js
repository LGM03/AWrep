class DAOInstalaciones{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    leerTodosMensajesRecibidosUser(correo,callback) { //Lee todos los destinos de la base de datos 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                console.log(correo);
                const sql = "SELECT * mensajes where correoReceptor = ?";
                connection.query(sql, [correo] , function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, resultado);  //Si todo ha ido bien retorno los datos del destino
                    }
                });
            }
        });
    }  

    leerTodosMensajesMandadosUser(correo,callback) { //Lee todos los destinos de la base de datos 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * mensajes where correoEmisor = ?";
                connection.query(sql, [correo] , function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, resultado);  //Si todo ha ido bien retorno los datos del destino
                    }
                });
            }
        });
    }

    altaMensaje(datos,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "insert into mensajes (correoEmisor,correoReceptor,cuerpoMensaje) values (?,?,?)";
                connection.query(sql, [datos.correoEmisor, datos.correoReceptor,datos.cuerpoMensaje], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        console.log(err)
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado.insertId); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  

    
}


module.exports = DAOInstalaciones