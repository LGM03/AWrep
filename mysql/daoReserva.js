
class DAOConfig{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    altaReserva(datosReserva,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = datosReserva.fechaIni.slice(0, 19).replace('T', ' ')
                var fechaFin = datosReserva.fechaFin.slice(0, 19).replace('T', ' ')
                const sql = "insert into ucm_aw_riu_res_reservas (fecha, fechafinal, idUsu, idIns) values (?,?,?,?) "
                connection.query(sql, [fechaInicio, fechaFin ,datosReserva.correo,datosReserva.instalacion], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado.insertId); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  


    comprobarOcupacion(datosReserva,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = datosReserva.fechaIni.replace('T', ' ')
                var fechaFin = datosReserva.fechaFin.replace('T', ' ')
                fechaFin += ":00"
                fechaInicio += ":00"
                const sql = "SELECT * FROM `ucm_aw_riu_res_reservas` WHERE idIns = ? AND ( (fecha>? AND fecha<?) OR (fechafinal>? AND fechafinal<?) OR ( fecha<? AND fechaFinal>?) OR  (fechafinal>? AND fecha<?) or fechafinal = ? or fecha = ?)"
                connection.query(sql, [datosReserva.instalacion, fechaInicio, fechaFin ,fechaInicio, fechaFin,fechaInicio,fechaFin,fechaInicio,fechaInicio,fechaFin,fechaInicio], function (err, resultado) {
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

    listaEspera(datosReserva,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = datosReserva.fechaIni.slice(0, 10).replace('T', ' ')
                const sql = "insert into listaespera (idUsu, idIns,fechaReserva) values (?,?,?) "
                connection.query(sql, [datosReserva.correo, datosReserva.instalacion ,fechaInicio], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado.insertId); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }

    leerListaEspera(datos,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * FROM listaespera inner join ucm_aw_riu_usu_usuarios on idUsu = correo where idIns = ? and fechaReserva = ? order by fechaEntrada"
                connection.query(sql, [datos.id,datos.dia], function (err, resultado) {
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

    leerReservaPorInstyDia(datos,callback) { //Retorno las reservas de un dia e instalación ordenadas por fecha
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * FROM ucm_aw_riu_res_reservas WHERE idIns = ? and  CAST(? AS DATE) = CAST(fecha AS DATE) order by fecha"
                connection.query(sql, [datos.id,datos.dia], function (err, resultado) {
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
    
    leerReservaPorUsuario(idUsu,callback) { //Lee todos los comentarios en funcion 
    
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select ucm_aw_riu_res_reservas.fecha, ucm_aw_riu_res_reservas.id, ucm_aw_riu_res_reservas.fechafinal, ucm_aw_riu_ins_instalaciones.nombre as nombreIns, ucm_aw_riu_ins_instalaciones.tipoReserva,  ucm_aw_riu_ins_instalaciones.horaInicio,  ucm_aw_riu_ins_instalaciones.horaFin,  ucm_aw_riu_ins_instalaciones.aforo,  ucm_aw_riu_ins_instalaciones.imagen as imagenIns, ucm_aw_riu_usu_usuarios.nombre,ucm_aw_riu_usu_usuarios.apellido1,ucm_aw_riu_usu_usuarios.apellido2,ucm_aw_riu_usu_usuarios.facultad,ucm_aw_riu_usu_usuarios.curso,ucm_aw_riu_usu_usuarios.grupo,ucm_aw_riu_usu_usuarios.imagen as imagenUsu from ucm_aw_riu_res_reservas inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns inner join ucm_aw_riu_usu_usuarios on correo = idUsu where idUsu = ?"
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

    leerReservas(callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select ucm_aw_riu_res_reservas.fecha, ucm_aw_riu_res_reservas.fechafinal, ucm_aw_riu_ins_instalaciones.nombre as nombreIns, ucm_aw_riu_ins_instalaciones.tipoReserva,  ucm_aw_riu_ins_instalaciones.horaInicio,  ucm_aw_riu_ins_instalaciones.horaFin,  ucm_aw_riu_ins_instalaciones.aforo,  ucm_aw_riu_ins_instalaciones.imagen as imagenIns, ucm_aw_riu_usu_usuarios.nombre,ucm_aw_riu_usu_usuarios.apellido1,ucm_aw_riu_usu_usuarios.apellido2,ucm_aw_riu_usu_usuarios.facultad,ucm_aw_riu_usu_usuarios.curso,ucm_aw_riu_usu_usuarios.grupo,ucm_aw_riu_usu_usuarios.imagen as imagenUsu ,ucm_aw_riu_usu_usuarios.correo from ucm_aw_riu_res_reservas inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns inner join ucm_aw_riu_usu_usuarios on correo = idUsu"
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


    borrarReserva(idReserva,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "delete from ucm_aw_riu_res_reservas where id = ?"
                connection.query(sql, [idReserva], function (err, resultado) {
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

    notificacionAdelantarListaespera(idReserva, callback) {
        
        let idIns;
        let userCola;
        let correoEmisor = "ADMINISTRACION";
        let fechanueva= new Date;

        const getInfoReserva = (idReserva) => {
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "SELECT * FROM ucm_aw_riu_res_reservas WHERE id=?";
                        connection.query(sql, [idReserva], (err, resultado) => {
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

        const getUserCola = (idIns,Fecha) => {
             return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "SELECT * FROM listaespera WHERE idIns=? AND fechaReserva=? order by fechaEntrada";
                        connection.query(sql, [idIns,Fecha], (err, resultado) => {
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

        const eliminarListadeespera=(idListaEspera) => {
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "DELETE FROM listaespera WHERE id=?";
                        connection.query(sql, [idListaEspera], (err, resultado) => {
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

        }

        const getInfoInstalacion = (idInstalacion) => {
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "SELECT * FROM ucm_aw_riu_ins_instalaciones WHERE id=?";
                        connection.query(sql, [idInstalacion], (err, resultado) => {
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
            
                const resultReserva = await getInfoReserva(idReserva);

                var fechaInicioISO=resultReserva[0].fecha
                idIns=resultReserva[0].idIns
    
                // Crear un objeto de fecha a partir de la cadena ISO 8601
                var fechaInicio = new Date(fechaInicioISO);

                // Obtener las partes de la fecha
                var año = fechaInicio.getFullYear();
                var mes = ('0' + (fechaInicio.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11
                var dia = ('0' + fechaInicio.getDate()).slice(-2);

                // Construir la nueva cadena de fecha en el formato deseado
                var fechaFormateada = año + '-' + mes + '-' + dia;

                const resultInfoIns = await getInfoInstalacion(idIns);

                let nombreins =resultInfoIns[0].nombre

                let mensaje = "Su reserva de la instalacion "+ nombreins + " para el dia "+fechaFormateada+" que se encontraba en lista de espera ahora esta disponible";

                const resultUserCola = await getUserCola(idIns, fechaFormateada);
              
                try{
                    userCola=resultUserCola[0].idUsu;
                    let idLista=resultUserCola[0].id;
                    eliminarListadeespera(idLista);
                }
                catch{}
                if (userCola != null) {
                    this.pool.getConnection((err, connection) => {
                        if (err) {
                            callback(err, null);
                            return;
                        }
                        const sql = "INSERT INTO mensajes (correoEmisor, correoReceptor, cuerpoMensaje, fecha) VALUES (?, ?, ?, ?)";
                        connection.query(sql, [correoEmisor, userCola, mensaje, fechanueva], (err, resultado) => {
                            connection.release();
                            if (err) {
                                console.error(err);
                                callback(err, null);
                            } else {
                                callback(null, resultado.insertId);
                            }
                        });
                    });
                } else {
                    callback(null, null); // No user in the waiting list
                }
        };
    
        executeQueries();
    }





    borrarEspera(idEspera,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "delete from listaEspera where id = ?"
                connection.query(sql, [idEspera], function (err, resultado) {
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


module.exports = DAOConfig
