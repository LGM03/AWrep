
class DAOComentarios{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    leerTodos(ciudad,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT comentarios.nombre_usuario, comentarios.comentario, comentarios.fecha_comentario, comentarios.destino_id from comentarios  join destinos on destinos.id = comentarios.destino_id where destinos.nombre=?";
                connection.query(sql, [ciudad], function (err, resultado) {
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

    altaComentario(datos,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "insert into comentarios (destino_id, nombre_usuario, comentario,fecha_comentario) values (?,?,?,?)";
                connection.query(sql, [datos.destino, datos.nombre, datos.comentario, datos.fecha], function (err, resultado) {
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
}


module.exports = DAOComentarios
