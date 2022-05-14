import express from 'express'

import { authenticateUser } from './login.service.js'

export const loginRouter = express.Router()

loginRouter.post('/', async function (req, res, next) {
  try {
    const user = await authenticateUser(req.body)
    user
      ? res.json(user)
      : res.status(400).send('Invalid registry or password.')
  } catch (err) {
    if (err instanceof Error)
      console.error(`Error while getting user: `, err.message)
    next(err)
  }
})
