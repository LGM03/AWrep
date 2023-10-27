let usuarioG

class DAO{

    constructor(pool) {
        this.pool = pool
    }

    insertarUsuario(usuario, callback){
        this.pool.getConnection(function(err, connection) {
            if (err) {
                console.log(`Error al obtener la conexión: ${err.message}`);
            }
            else {
                usuarioG=usuario
                const sql= "INSERT INTO usuarios(usuario,correo,telefono) values(?,?,?)"
                connection.query( 
                    sql, [usuario.nombre,usuario.correo, usuario.telefono ],function(err, resultado) {
                        connection.release();
                    
                    callback(err,resultado,usuario)
                });
            }
        });
    }  //index.js crea el pool de conexiones, al llamar al consructor del dao le paso el pool, 

    cb_insertarUsuario(err,resultado){
        if (err) {
        console.log("ERROR EN LA INSERCIÓN DE USUARIO");
        console.log(err)
        }
        else {
        console.log("USUARIO INSERTADO CORRECTAMENTE");
            usuarioG.id=resultado.id
        }
    };
    
}

module.exports = DAO
