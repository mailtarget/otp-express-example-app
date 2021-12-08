var express = require('express');
var router = express.Router();
const debug = require('debug')('otp-example-app:dash')
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const jwtSecret = process.env.JWT_SECRET

const cekAuth = (req, res, next) => {
  const token = req.headers.authorization
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err !== null) next(createError(401))
    else {
      req.userdata = decoded
      next()
    }
  })
}

/* GET home page. */
router.get('/', cekAuth, function(req, res, next) {
  res.json({ status: 'ok' })
});

module.exports = router;
