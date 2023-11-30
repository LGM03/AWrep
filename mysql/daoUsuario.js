
class DAOUsuario{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }
 
    leerPorID(correo, callback) { //Leo un usuario en funcion de su correo
        this.pool.getConnection(function (err, connection) {  //Solo pueden iniciar sesion usuarios validados
            if (err) {
                callback(err, null); //Si ocurre un error lo retorno 
            } else {
                const sql = "SELECT * from ucm_aw_riu_usu_usuarios where correo = ? and rol <> -1 ";
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

    altaUsuario(datosUsuario, callback) { //guarda en la base de datos la información del usuario
        console.log(datosUsuario);
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);  //Si ocurre algun error retornamos el error
            } else {
                const sql = "INSERT INTO `ucm_aw_riu_usu_usuarios`(nombre,apellido1,apellido2,correo,facultad,curso,grupo,imagen,contraseña,salt) VALUES (?,?,?,?,?,?,?,?,?,?);";
                connection.query(sql,[datosUsuario.nombre,datosUsuario.apellido1,datosUsuario.apellido2,datosUsuario.correo,datosUsuario.facultad,datosUsuario.curso,datosUsuario.grupo,datosUsuario.imagenUser,datosUsuario.contraseña, datosUsuario.salt], function (err, resultado) {
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
