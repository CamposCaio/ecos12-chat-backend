import express from 'express'

import { getUser } from './login.service.js'

export const router = express.Router()

router.post('/', function (req, res, next) {
  try {
    res.json(getUser(req.body))
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while getting user: `, err.message)
    next(err)
  }
})
