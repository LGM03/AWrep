class DAOInstalaciones{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }

    leerTodas(callback) { //Lee todos los destinos de la base de datos 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "SELECT * from ucm_aw_riu_ins_instalaciones ";
                connection.query(sql, null, function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        for(var i = 0 ; i<resultado.length ; i++){
                            const base64String = resultado[i].imagen.toString('base64');
                            resultado[i].imagen= `data:image/png;base64,${base64String}`
                        }
                        callback(null, resultado); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  

    altaInstalacion(datos,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "insert into ucm_aw_riu_ins_instalaciones (nombre,tipoReserva,horaInicio,horafin,aforo,imagen) values (?,?,?,?,?,?)";
                connection.query(sql, [datos.nombre, datos.tipoReserva,datos.horaInicio,datos.horaFin, datos.aforo,datos.imagenInstalacion], function (err, resultado) {
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

    leerInstalacionID(id,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = "select * from ucm_aw_riu_ins_instalaciones where id  = ?"; //Recojo toda la info de esta instalacion
                connection.query(sql, [id], function (err, resultado) {
                    connection.release(); //Libero la conexion
                    if (err) {
                        callback(err, null); //Si ha ocurrido un error retorno el error
                    } else {
                        const base64String = resultado[0].imagen.toString('base64');
                        const imageUrl = `data:image/png;base64,${base64String}`;
                        resultado[0].imagen=imageUrl
                        resultado[0].horaInicio = resultado[0].horaInicio.split(':').slice(0, 2).join(':');
                        resultado[0].horaFin = resultado[0].horaFin.split(':').slice(0, 2).join(':');

                        callback(null, resultado[0]); //Si todo ha ido bien retorno la información obtenida 
                    }
                });
            }
        });
    }  
}


module.exports = DAOInstalaciones