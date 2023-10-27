'use strict'

const mysql = require("mysql")
const pool = mysql.createPool({
    host:"localhost",
    user:"admin_aw",
    password:"",
    database:"viajes"
})

const DAOAp= require("./dao.js")
const midao= new DAOAp(pool)

let usuario ={
    id : 9,
    nombre : "a",
    correo:"b",
    telefono:"c"
}

midao.insertarUsuario(usuario, midao.cb_insertarUsuario)

