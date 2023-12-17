
class DAOConfig{   //DAO que accede a las instalaciones y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    altaTitulo(titulo,callback) { ///Da de alta un titulo nuevo para la organizacion
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "update configuracion set nombre= ? ;"
                connection.query(sql, [titulo], function (err, resultado) {
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

    altaGama(gama,callback) {//Da de alta una gama nueva para la organizacion
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "update configuracion set gama= ? ;"
                connection.query(sql, [gama], function (err, resultado) {
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

    altaDireccion(dir,callback) { //Da de alta una direccion nueva para la organizacion
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "update configuracion set direccion= ? ;"
                connection.query(sql, [dir], function (err, resultado) {
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

    altaLogo(logo,callback) { //Da de alta un logo nuevo para la organizacion
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "update configuracion set logo= ? ;"
                connection.query(sql, [logo], function (err, resultado) {
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

    leerConfig(callback){ //Leo la configuracion guardada en la base de datos
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select * from configuracion"
                connection.query(sql, [], function (err, resultado) {
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


module.exports = DAOConfig
