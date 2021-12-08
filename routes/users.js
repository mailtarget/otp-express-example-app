const { default: axios } = require('axios')
var express = require('express')
const debug = require('debug')('otp-example-app:users')
const jwt = require('jsonwebtoken')


var router = express.Router()


const apiUrl = process.env.MT_MAGIC_API_URL
const apiKey = process.env.MT_MAGIC_API_KEY
const secretKey = process.env.MT_MAGIC_SECRET_KEY
const jwtSecret = process.env.JWT_SECRET

const otpAuth = (email) => {
  return axios({
    url: apiUrl + '/auth/app/login/start',
    method: 'POST',
    headers: {
      "public_key": apiKey
    },
    data: {
      email
    }
  })
}

const otpStatus = (token) => {
  return axios({
    url: apiUrl + '/auth/app/login/status',
    method: 'POST',
    headers: {
      "public_key": apiKey
    },
    data: {
      statusToken: token
    }
  })
}

const userDetail = (authUserId) => {
  return axios({
    url: apiUrl + '/auth/app/login/user/' + authUserId,
    headers: {
      "secret_key": secretKey
    }
  })
}

router.post('/login', (req, res, next) => {
  const email = req.body.email
  otpAuth(email)
    .then(result => {
      debug('logged', result.data)
      let token = result.data.replace('logged  ', '')
      res.redirect('/auth/' + token)
    })
    .catch(err => {
      debug(err.response.data)
      next(err)
    })
})

router.get('/status/:token', (req, res, next) => {
  const token = req.params.token
  otpStatus(token)
    .then(result => {
      const authUserId = result.data.authUserId
      debug('ok 1', result.data)
      return userDetail(authUserId)
    })
    .then(result => {
      const data = result.data
      
      const jwtToken = jwt.sign({
        data: {
          email: data.email
        },
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
      }, jwtSecret)

      res.json({ status: 'ok', token: jwtToken })
    })
    .catch(err => {
      debug(err.response.data)
      const code = err.response.data.code
      if (err.response.status === 401) {
        res.status(401)
        res.json({ code })
      } else {
        next(err)
      }
    })
})


module.exports = router;
