var express = require('express');
var router = express.Router();

const mysql = require("mysql")
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "UCM_RIU",
  port : 3306
})

router.post('/crearInstalacion',(req,res)=>{ //TODO hacer ajax
   
    datosInstalacion={
        nombre: req.body.nombre,
        tipoReserva: req.body.tipoReserva,
        imagenInstalacion: req.body.imagenInstalacion
    }
    console.log(datosInstalacion);

    const DAOAp = require("../mysql/daoInstalaciones")
    const midao = new DAOAp(pool)

    midao.altaInstalacion(datos, (err, datos) => {
        if (err) {
            res.redirect(`/?error=${"No se ha dado de alta la instalacion"}`); //Si ha ocurrido un error, recargo la ventana con mensaje de fallo
          }
          else {
            res.redirect(`/?exito=${'instalacion creada con éxito'}`); //Si todo ha ido bien recargo la instalacion
          }
    })

});


router.get('/',(req,res)=>{
  const DAOAp = require("../mysql/daoInstalaciones")
  const midao = new DAOAp(pool)
  console.log("estamos en router get / instalacion"+ req.query.id)

  midao.leerInstalacionID(req.query.id, (err, datos) => {
    if (err) {
      res.render('error',{error:"Ha ocurrido un error"});//si ocurre un error cargo la ventana de error 
    }
    else { 
      if (global.titulo == null) {
        daoC.leerConfig((err, configDatos) => {
          if (err) { // Si hay un error en el acceso a la bd, ponemos la info por defecto
            global.titulo = "UCM-RIU";
            global.logo = "/images/logo.png";
            global.gama = "/css/estiloOscuro.css";
          } else { // Si la configuración se obtiene correctamente, la almacenamos en global
            global.titulo = configDatos.nombre;
            const base64String = configDatos.logo.toString('base64');
            const imageUrl = `data:image/png;base64,${base64String}`;
            global.logo = imageUrl;
            global.gama = configDatos.gama;
            global.direccion = configDatos.direccion;
          } // Renderizamos la página principal con la información de todos los destinos
          res.render('instalacion', {
            instalacion: datos,
            gama: global.gama,
            logo: global.logo,
            titulo: global.titulo,
            direccion: global.direccion
          });
        });
      } else {
        // Si ya tenemos la configuración, renderizamos la página directamente
        res.render('instalacion', {
          instalacion: datos,
          gama: global.gama,
          logo: global.logo,
          titulo: global.titulo,
          direccion: global.direccion
        });
      }
    }
})

})
module.exports = router;