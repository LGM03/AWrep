
class DAOGestion {   //DAO que accede a los destinos y su respectiva información

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

    validarUsuario(correo, callback) {
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


    eliminarUsuario(correo, callback) {
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

    hacerAdmin(idUsu, callback) { //Lee todos los comentarios en funcion 
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

    filtrar(filtro, callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var sql = "select * from ucm_aw_riu_usu_usuarios"
                var condicion = ""
                var variables = []

                if (filtro.nombre) {
                    if (condicion !== "") {
                        condicion += " and nombre = ?"
                    } else {
                        condicion += " where nombre = ?"
                    }
                    variables.push(filtro.nombre)
                }

                if (filtro.apellido1) {
                    if (condicion !== "") {
                        condicion += " and apellido1 = ?"
                    } else {
                        condicion += " where apellido1 = ?"
                    }
                    variables.push(filtro.apellido1)
                }
              
                if (filtro.apellido2) {
                    if (condicion !== "") {
                        condicion += " and apellido2 = ?"
                    } else {
                        condicion += " where apellido2 = ?"
                    }
                    variables.push(filtro.apellido2)
                }

                if (filtro.correo) {
                    if (condicion !== "") {
                        condicion += " and correo = ?"
                    } else {
                        condicion += " where correo = ?"
                    }
                    variables.push(filtro.correo)
                }

                if (filtro.facultad) {
                    if (condicion !== "") {
                        condicion += " and facultad = ?"
                    } else {
                        condicion += " where facultad = ?"
                    }
                    variables.push(filtro.facultad)
                }

                if (filtro.curso) {
                    if (condicion !== "") {
                        condicion += " and curso = ?"
                    } else {
                        condicion += " where curso = ?"
                    }
                    variables.push(filtro.curso)
                }

                if (filtro.grupo) {
                    if (condicion !== "") {
                        condicion += " and grupo = ?"
                    } else {
                        condicion += " where grupo = ?"
                    }
                    variables.push(filtro.grupo)
                }

                sql += condicion

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

    listarTodos(callback) { //Lee todos los comentarios en funcion 
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
