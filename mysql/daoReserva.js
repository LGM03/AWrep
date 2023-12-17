
class DAOConfig {   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    altaReserva(datosReserva, callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = datosReserva.fechaIni.slice(0, 19).replace('T', ' ')
                var fechaFin = datosReserva.fechaFin.slice(0, 19).replace('T', ' ')
                const sql = "insert into ucm_aw_riu_res_reservas (fecha, fechafinal, idUsu, idIns) values (?,?,?,?) "
                connection.query(sql, [fechaInicio, fechaFin, datosReserva.correo, datosReserva.instalacion], function (err, resultado) {
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


    comprobarOcupacion(datosReserva, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = datosReserva.fechaIni.replace('T', ' ')
                var fechaFin = datosReserva.fechaFin.replace('T', ' ')
                fechaFin += ":00"
                fechaInicio += ":00"
                const sql = "SELECT * FROM `ucm_aw_riu_res_reservas` WHERE idIns = ? AND ( (fecha>? AND fecha<?) OR (fechafinal>? AND fechafinal<?) OR ( fecha<? AND fechaFinal>?) OR  (fechafinal>? AND fecha<?) or fechafinal = ? or fecha = ?)"
                connection.query(sql, [datosReserva.instalacion, fechaInicio, fechaFin, fechaInicio, fechaFin, fechaInicio, fechaFin, fechaInicio, fechaInicio, fechaFin, fechaInicio], function (err, resultado) {
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

    listaEspera(datosReserva, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = datosReserva.fechaIni.slice(0, 10).replace('T', ' ')
                const sql = "insert into listaespera (idUsu, idIns,fechaReserva) values (?,?,?) "
                connection.query(sql, [datosReserva.correo, datosReserva.instalacion, fechaInicio], function (err, resultado) {
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

    leerListaEspera(datos, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * FROM listaespera inner join ucm_aw_riu_usu_usuarios on idUsu = correo where idIns = ? and fechaReserva = ? order by fechaEntrada"
                connection.query(sql, [datos.id, datos.dia], function (err, resultado) {
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

    leerReservaPorInstyDia(datos, callback) { //Retorno las reservas de un dia e instalación ordenadas por fecha
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * FROM ucm_aw_riu_res_reservas WHERE idIns = ? and  CAST(? AS DATE) = CAST(fecha AS DATE) order by fecha"
                connection.query(sql, [datos.id, datos.dia], function (err, resultado) {
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

    leerReservaPorUsuario(filtro, callback) { //Lee todos los comentarios en funcion 

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select ucm_aw_riu_res_reservas.id,ucm_aw_riu_res_reservas.fecha, ucm_aw_riu_res_reservas.fechafinal, ucm_aw_riu_ins_instalaciones.nombre as nombreIns, ucm_aw_riu_ins_instalaciones.tipoReserva,  ucm_aw_riu_ins_instalaciones.horaInicio,  ucm_aw_riu_ins_instalaciones.horaFin,  ucm_aw_riu_ins_instalaciones.aforo,  ucm_aw_riu_ins_instalaciones.imagen as imagenIns, ucm_aw_riu_usu_usuarios.nombre,ucm_aw_riu_usu_usuarios.apellido1,ucm_aw_riu_usu_usuarios.apellido2,ucm_aw_riu_usu_usuarios.facultad,ucm_aw_riu_usu_usuarios.curso,ucm_aw_riu_usu_usuarios.grupo,ucm_aw_riu_usu_usuarios.imagen as imagenUsu ,ucm_aw_riu_usu_usuarios.correo from ucm_aw_riu_res_reservas inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns inner join ucm_aw_riu_usu_usuarios on correo = idUsu"+
                " where (? is NULL OR ucm_aw_riu_usu_usuarios.nombre = ?) "+ 
                "and (? is null or ucm_aw_riu_usu_usuarios.apellido1 = ?)"+
                "and (? is null or ucm_aw_riu_usu_usuarios.apellido2 = ?)"+
                "and (? is null or ucm_aw_riu_usu_usuarios.correo = ?)"+
                "and (? is null or ucm_aw_riu_usu_usuarios.facultad = ?)"+
                "and (? is null or ucm_aw_riu_ins_instalaciones.nombre  = ?)"+
                "and ucm_aw_riu_usu_usuarios.correo = ?"+
                "and( (? is null or fecha=?) or (? is null or (fecha<=? and fecha>=?)))"
                var variables = [filtro.nombre, filtro.nombre, filtro.apellido1, filtro.apellido1, filtro.apellido2, filtro.apellido2 ,
                    filtro.correo,filtro.correo, filtro.facultad,filtro.facultad,filtro.instalacion,filtro.instalacion,filtro.usuario,filtro.fechaIni,filtro.fechaIni,
                    filtro.fechaFin,filtro.fechaFin,filtro.fechaIni
                    ]
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

    leerReservas(filtro, callback) { //Lee todas las reserva en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                //Si el parametro es nulo o coincide con el valor
                const sql = "select ucm_aw_riu_res_reservas.fecha, ucm_aw_riu_res_reservas.fechafinal, ucm_aw_riu_ins_instalaciones.nombre as nombreIns, ucm_aw_riu_ins_instalaciones.tipoReserva,  ucm_aw_riu_ins_instalaciones.horaInicio,  ucm_aw_riu_ins_instalaciones.horaFin,  ucm_aw_riu_ins_instalaciones.aforo,  ucm_aw_riu_ins_instalaciones.imagen as imagenIns, ucm_aw_riu_usu_usuarios.nombre,ucm_aw_riu_usu_usuarios.apellido1,ucm_aw_riu_usu_usuarios.apellido2,ucm_aw_riu_usu_usuarios.facultad,ucm_aw_riu_usu_usuarios.curso,ucm_aw_riu_usu_usuarios.grupo,ucm_aw_riu_usu_usuarios.imagen as imagenUsu ,ucm_aw_riu_usu_usuarios.correo from ucm_aw_riu_res_reservas inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns inner join ucm_aw_riu_usu_usuarios on correo = idUsu"+
                " where (? is NULL OR ucm_aw_riu_usu_usuarios.nombre = ?) "+ 
                "and (? is null or ucm_aw_riu_usu_usuarios.apellido1 = ?)"+
                "and (? is null or ucm_aw_riu_usu_usuarios.apellido2 = ?)"+
                "and (? is null or ucm_aw_riu_usu_usuarios.correo = ?)"+
                "and (? is null or ucm_aw_riu_usu_usuarios.facultad = ?)"+
                "and (? is null or ucm_aw_riu_ins_instalaciones.nombre  = ?)"+
                "and( (? is null or fecha=?) or (? is null or (fecha<=? and fecha>=? )))"

                var variables = [filtro.nombre, filtro.nombre, filtro.apellido1, filtro.apellido1, filtro.apellido2, filtro.apellido2 ,
                filtro.correo,filtro.correo, filtro.facultad,filtro.facultad,filtro.instalacion,filtro.instalacion,filtro.fechaIni,filtro.fechaIni,
                filtro.fechaFin,filtro.fechaFin,filtro.fechaIni
                ]
                
                connection.query(sql, variables, function (err, resultado) {
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


    borrarReserva(idReserva, callback) { //Borra una reserva de la base de datos
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

    notificacionAdelantarListaespera(idReserva, callback) {  //Envia una notificacion al primer usuario de la lista de espera

        let idIns;
        let userCola;
        let correoEmisor = "ADMINISTRACION";
        let fechanueva = new Date;

        const getInfoReserva = (idReserva) => {  //Recoge la informacion de la reserva que ha sido borrada
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "SELECT * FROM ucm_aw_riu_res_reservas WHERE id=?";
                        connection.query(sql, [idReserva], (err, resultado) => {
                            connection.release();  //Libera la conexion
                            if (err) {
                                console.log(err)
                                reject(err);
                            } else {
                                console.log(resultado)
                                resolve(resultado);
                            }
                        });
                    }
                });
            });
        };

        const getUserCola = (idIns, Fecha) => {  //recojo el primer usuario de la lista de espera para ese dia y esa instalacion
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        reject(err);
                    } else {
                        const sql = "SELECT * FROM listaespera WHERE idIns=? AND fechaReserva=? order by fechaEntrada"; //Los usuarios van ordenados por fecha de entrada a la bd
                        connection.query(sql, [idIns, Fecha], (err, resultado) => {
                            connection.release();  //Libero la conexion
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

        const eliminarListadeespera = (idListaEspera) => { //Elimino el elemento de la lista de espera 
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

        const getInfoInstalacion = (idInstalacion) => { //Recojo la información de la instalacion
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



        const executeQueries = async () => {  //Ejecuto todas las query puestas arriba

            const resultReserva = await getInfoReserva(idReserva);

            var fechaInicioISO = resultReserva[0].fecha
            idIns = resultReserva[0].idIns

            // Crear un objeto de fecha a partir de la cadena ISO 8601
            var fechaInicio = new Date(fechaInicioISO);

            // Obtener las partes de la fecha
            var año = fechaInicio.getFullYear();
            var mes = ('0' + (fechaInicio.getMonth() + 1)).slice(-2); // Los meses van de 0 a 11
            var dia = ('0' + fechaInicio.getDate()).slice(-2);

           
            var minutosInicio=fechaInicio.getMinutes()
            if( fechaInicio.getMinutes() == 0 ){
                minutosInicio = "00"
            }
            var horaIni = fechaInicio.getHours() + ":" + minutosInicio
            
            var final = new Date(resultReserva[0].fechafinal)
            var minutosFinal=final.getMinutes()
            if( final.getMinutes() == 0 ){
                minutosFinal = "00"
            }
            var horaFin = final.getHours() + ":" + minutosFinal

            console.log("fecha Inicio " + fechaInicio.getHours())
            console.log("fecha final " + new Date(resultReserva[0].fechafinal).getHours())

            // Construir la nueva cadena de fecha en el formato deseado
            var fechaFormateada = año + '-' + mes + '-' + dia;

            const resultInfoIns = await getInfoInstalacion(idIns); //Espero a que se ejecute la query getInfoInstalacion

            let nombreins = resultInfoIns[0].nombre

            let mensaje = "La instalacion " + nombreins + " para el dia " + fechaFormateada + " en el horario de " + horaIni + "-" + horaFin + " ha quedado disponible";

            const resultUserCola = await getUserCola(idIns, fechaFormateada);

            try {
                userCola = resultUserCola[0].idUsu;
                let idLista = resultUserCola[0].id;
                eliminarListadeespera(idLista);
            }
            catch { }
            if (userCola != null) {
                this.pool.getConnection((err, connection) => {  //Si todo ha ido bien le mando el mensaje
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

        executeQueries(); //Ejecuto las querys
    }





    borrarEspera(idEspera, callback) { //Borra un elemento de la lista de espera
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
