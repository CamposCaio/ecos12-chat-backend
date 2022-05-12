const express = require('express')
const router = express.Router()
const login = require('./login.service')

router.get('/', function (req, res, next) {
  try {
    res.json(login.getUser(req.body))
  } catch (err) {
    console.error(`Error while getting user: `, err.message)
    next(err)
  }
})

module.exports = router
