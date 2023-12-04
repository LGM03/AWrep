
class DAOConfig{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    altaReserva(datosReserva,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                var fechaInicio = new Date(datosReserva.fechaIni)
                fechaInicio = fechaInicio.toISOString().slice(0, 19).replace('T', ' ')

                var fechaFin = new Date(datosReserva.fechaIni)
                fechaFin = fechaFin.toISOString().slice(0, 19).replace('T', ' ')

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

}


module.exports = DAOConfig
