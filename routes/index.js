var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login')
});
router.get('/expired', function(req, res, next) {
  res.render('expired')
});


router.get('/auth/:id', (req, res) => {
  res.render('auth', { token: req.params.id})
})

router.get('/dashboard', (req, res) => {
  res.render('dash')
})

module.exports = router;
