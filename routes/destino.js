var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx")
  res.render('destino');  //Pagina dinamica se le pueden pasar parametros
});



module.exports = router;
