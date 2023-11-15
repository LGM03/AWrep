
class DAOUsuario{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }
 
    leerPorID(correo, callback) { //Leo un usuario en funcion de su correo
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ocurre un error lo retorno 
            } else {
                const sql = "SELECT * from usuarios where correo = ?";
                connection.query(sql, [correo] , function (err, resultado) {
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

    altaUsuario(datosUsuario, callback) { //guarda en la base de datos la información de la reserva
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);  //Si ocurre algun error retornamos el error
            } else {
                const sql = "INSERT INTO `usuarios` VALUES (?,?,?,?,?);";
                connection.query(sql,[datosUsuario.nombre,datosUsuario.apellido, datosUsuario.correo,datosUsuario.contraseña, datosUsuario.salt], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err, null); //Si ocurre algun error retornamos el error
                    } else {
                        callback(null, resultado); //Si todo va bien devolvemos la información 
                    }
                });
            }
        });
    } 

}


module.exports = DAOUsuario


/*bcrypt.compare(contraseña, usuario.contraseña, (err, resultado) => {
      if (resultado) {
        // Contraseña válida, establece la sesión
        req.session.usuario = nombreDeUsuario;
        res.send('Inicio de sesión exitoso');
      } else {
        res.send('Credenciales incorrectas');
      }
    });*/
