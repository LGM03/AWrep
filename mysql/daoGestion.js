
class DAOGestion {   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }


    leerValidados(callback) { //Lee los usurios validados que no sean admin (rol 0)
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



    leerTodos(callback) { //Lee todos los usuarios, independientemente del rol
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * from ucm_aw_riu_usu_usuarios"; //Leo todos los usuarios
                connection.query(sql, [], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {

                        for (var i = 0; i < resultado.length; i++) {
                            const imageBase64 = resultado[i].imagen.toString('base64');
                            resultado[i].imagen = `data:/image/png;base64,${imageBase64}`;
                        }

                        callback(null, resultado); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }

    validarUsuario(correo, callback) {  //Permite validar un usuario
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


    eliminarUsuario(correo, callback) { //Elimina un usuario que no ha sido validado todavia
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

    hacerAdmin(idUsu, callback) { //Hace admin a un usuario validado
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "update ucm_aw_riu_usu_usuarios set rol = 1 where correo = ?"
                connection.query(sql, [idUsu], function (err, resultado) {
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

    filtrar(filtro, callback) { //Filtra usuarios
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select * from ucm_aw_riu_usu_usuarios where (? is NULL OR nombre = ?) "+  //Si se no se han introducido parametros o el parametro corresponde
                "and (? is null or apellido1 = ?)"+
                "and (? is null or apellido2 = ?)"+
                "and (? is null or correo = ?)"+
                "and (? is null or facultad = ?)"+
                "and (? is null or curso = ?)"+
                "and (? is null or grupo = ?) and rol <> -1 order by nombre"

                var variables = [filtro.nombre,filtro.nombre,filtro.apellido1,filtro.apellido1,filtro.apellido2,filtro.apellido2,filtro.correo,filtro.correo,filtro.facultad,filtro.facultad,filtro.curso,filtro.curso,filtro.grupo,filtro.grupo ]
    
                connection.query(sql, variables, function (err, resultado) {
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

    listarTodos(callback) { //Lee todos los usuarios validos y admins
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select * from ucm_aw_riu_usu_usuarios where rol <> -1"
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

}


module.exports = DAOGestion
