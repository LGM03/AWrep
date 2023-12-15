
class daoEstadisticas{   //DAO que accede a los destinos y su respectiva información

    constructor(pool) { //Constructor guarda pool en un atributo propio
        this.pool = pool
    }


    porFacultad(facultad,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = 'select count(*) as contador, ucm_aw_riu_ins_instalaciones.nombre  from ucm_aw_riu_res_reservas inner join ucm_aw_riu_usu_usuarios on correo = idUsu inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns where facultad= ? group by idIns'; //rol 0 representa los usuarios validados
                connection.query(sql, [facultad], function (err, resultado) {
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
    porUsuario(correo,callback) { //Lee todos los comentarios en funcion 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null); //Si ha ocurrido un error retorno el error
            } else {
                const sql = 'select count(*) as contador, ucm_aw_riu_ins_instalaciones.nombre  from ucm_aw_riu_res_reservas inner join ucm_aw_riu_usu_usuarios on correo = idUsu inner join ucm_aw_riu_ins_instalaciones on ucm_aw_riu_ins_instalaciones.id = idIns where ucm_aw_riu_res_reservas.idUsu= ? group by idIns'; //rol 0 representa los usuarios validados
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


   

    

 
   

}


module.exports = daoEstadisticas
