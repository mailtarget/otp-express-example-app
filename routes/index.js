var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/auth/:id', (req, res) => {
  res.render('auth', { token: req.params.id})
})

router.get('/dashboard', (req, res) => {
  res.render('dash')
})

module.exports = router;
