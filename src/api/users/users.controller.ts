import express from 'express'
import {
  createUser,
  deleteUser,
  readAllUsers,
  readUser,
  updateUser,
} from './users.service'

export const usersRouter = express.Router()

usersRouter.get('/', async (_req, res, next) => {
  try {
    res.json(await readAllUsers())
  } catch (err) {
    err instanceof Error && res.status(400).send(err.message)
    next(err)
  }
})

usersRouter.get('/:registry', async (req, res, next) => {
  try {
    res.json(await readUser(req.params.registry))
  } catch (err) {
    err instanceof Error && res.status(400).send(err.message)
    next(err)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    res.json(await createUser(req.body))
  } catch (err) {
    err instanceof Error && res.status(400).send(err.message)
    next(err)
  }
})

usersRouter.patch('/', async (req, res, next) => {
  try {
    res.json(await updateUser(req.body))
  } catch (err) {
    err instanceof Error && res.status(400).send(err.message)
    next(err)
  }
})

usersRouter.delete('/:registry', async (req, res, next) => {
  try {
    res.json(await deleteUser(req.params.registry))
  } catch (err) {
    err instanceof Error && res.status(400).send(err.message)
    next(err)
  }
})
