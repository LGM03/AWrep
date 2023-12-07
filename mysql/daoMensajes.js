class DAOInstalaciones{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    leerTodos(correo,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT mensajes.correoEmisor, mensajes.correoReceptor, mensajes.cuerpoMensaje, mensajes.fecha from mensajes where mensajes.correoEmisor=? OR mensajes.correoReceptor=?  ";
                connection.query(sql, [correo,correo], function (err, resultado) {
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

    altaMensaje(datos,callback) { //Lee todos los comentarios en funcion 

        console.log(datos);

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "insert into mensajes (correoEmisor,correoReceptor,cuerpoMensaje,fecha) values (?,?,?,?)";
                connection.query(sql, [datos.correoEmisor, datos.correoReceptor,datos.cuerpoMensaje,datos.fecha], function (err, resultado) {
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