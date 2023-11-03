var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });  //Pagina dinamica
  res.sendFile('public/index.html'); //Pagina estatica, puede llevar parametros
});



module.exports = router;
