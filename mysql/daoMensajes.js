class DAOMensajes{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }
    
    mandaNotificacion(datos,callback){
        this.pool.getConnection((err, connection) => {
            if (err) {
                callback(err, null);
            } else {
                const sql = "INSERT INTO mensajes (correoEmisor, correoReceptor, cuerpoMensaje, fecha) VALUES (?, ?, ?, ?)";
                connection.query(sql, [datos.correoEmisor, datos.correoReceptor, datos.cuerpoMensaje, datos.fecha], (err, resultado) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    } else {
                        callback(null, resultado.insertId);
                    }
                });
            }
        });



    }


    leerTodos(correo,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT mensajes.correoEmisor, mensajes.correoReceptor, mensajes.cuerpoMensaje, mensajes.fecha from mensajes where mensajes.correoEmisor=? OR mensajes.correoReceptor=? ORDER BY mensajes.fecha DESC ";
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

    altaMensaje(datos, callback) {
        let rolReceptor;
        let rolEmisor;
        let facultadEmisor;
        let facultadReceptor;

        const getFacultadandRol = (correo) => {
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "SELECT facultad,rol FROM ucm_aw_riu_usu_usuarios WHERE correo=?";
                        connection.query(sql, [correo], (err, resultado) => {
                            connection.release();
                            if (err) {
                                reject(err);
                            } else {
                                resolve(resultado);
                            }
                        });
                    }
                });
            });
        };

        const executeQueries = async () => {
            try {
                const resultReceptor = await getFacultadandRol(datos.correoReceptor);
                const resultEmisor = await getFacultadandRol(datos.correoEmisor);

                rolReceptor = resultReceptor[0].rol;
                rolEmisor= resultEmisor[0].rol;
                facultadReceptor=resultReceptor[0].facultad;
                facultadEmisor=resultEmisor[0].facultad;


                if (datos.rolEmisor == 1 || (facultadEmisor == facultadReceptor && rolEmisor!=-1) || (rolReceptor==1 && rolEmisor!=-1)) {
                    this.pool.getConnection((err, connection) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            const sql = "INSERT INTO mensajes (correoEmisor, correoReceptor, cuerpoMensaje, fecha) VALUES (?, ?, ?, ?)";
                            connection.query(sql, [datos.correoEmisor, datos.correoReceptor, datos.cuerpoMensaje, datos.fecha], (err, resultado) => {
                                connection.release();
                                if (err) {
                                    console.log(err);
                                    callback(err, null);
                                } else {
                                    callback(null, resultado.insertId);
                                }
                            });
                        }
                    });
                } else {
                    callback(err, null); // Change the error handling as needed
                }
            } catch (err) {
                callback(err, null);
            }
        };

        executeQueries();
    }
}


module.exports = DAOMensajes