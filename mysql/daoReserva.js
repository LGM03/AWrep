
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
                        console.log(err)
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        callback(null, resultado.insertId); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  


    leerReservaPorInst(idIns,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * FROM ucm_aw_riu_res_reservas WHERE idIns = ?"
                connection.query(sql, [idIns], function (err, resultado) {
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

    
    leerReservaPorUsuario(idUsu,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select ucm_aw_riu_res_reservas.fecha, ucm_aw_riu_res_reservas.fechafinal, ucm_aw_riu_ins_instalaciones.nombre as nombreIns, ucm_aw_riu_ins_instalaciones.tipoReserva,  ucm_aw_riu_ins_instalaciones.horaInicio,  ucm_aw_riu_ins_instalaciones.horaFin,  ucm_aw_riu_ins_instalaciones.aforo,  ucm_aw_riu_ins_instalaciones.imagen as imagenIns, ucm_aw_riu_usu_usuarios.nombre,ucm_aw_riu_usu_usuarios.apellido1,ucm_aw_riu_usu_usuarios.apellido2,ucm_aw_riu_usu_usuarios.facultad,ucm_aw_riu_usu_usuarios.curso,ucm_aw_riu_usu_usuarios.grupo,ucm_aw_riu_usu_usuarios.imagen as imagenUsu from ucm_aw_riu_res_reservas inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns inner join ucm_aw_riu_usu_usuarios on correo = idUsu where idUsu = ?"
                connection.query(sql, [idUsu], function (err, resultado) {
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

    hacerAdmin(idUsu,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select ucm_aw_riu_res_reservas.fecha, ucm_aw_riu_res_reservas.fechafinal, ucm_aw_riu_ins_instalaciones.nombre as nombreIns, ucm_aw_riu_ins_instalaciones.tipoReserva,  ucm_aw_riu_ins_instalaciones.horaInicio,  ucm_aw_riu_ins_instalaciones.horaFin,  ucm_aw_riu_ins_instalaciones.aforo,  ucm_aw_riu_ins_instalaciones.imagen as imagenIns, ucm_aw_riu_usu_usuarios.nombre,ucm_aw_riu_usu_usuarios.apellido1,ucm_aw_riu_usu_usuarios.apellido2,ucm_aw_riu_usu_usuarios.facultad,ucm_aw_riu_usu_usuarios.curso,ucm_aw_riu_usu_usuarios.grupo,ucm_aw_riu_usu_usuarios.imagen as imagenUsu from ucm_aw_riu_res_reservas inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns inner join ucm_aw_riu_usu_usuarios on correo = idUsu where idUsu = ?"
                connection.query(sql, [idUsu], function (err, resultado) {
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


module.exports = DAOConfig
