import express from 'express'
import { UsersController } from './users.controller'

export const usersRouter = express.Router()

const usersController = new UsersController()

usersRouter.get('/:registry', async (req, res, next) => {
  try {
    res.json(await usersController.find(req))
  } catch (err) {
    err instanceof Error && res.send(err.message)
    next(err)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    res.json(await usersController.findAll(req))
  } catch (err) {
    err instanceof Error && res.send(err.message)
    next(err)
  }
})

usersRouter.post('/', async (req, res, next) => {
  try {
    res.json(await usersController.create(req))
  } catch (err) {
    err instanceof Error && res.send(err.message)
    next(err)
  }
})

usersRouter.patch('/', async (req, res, next) => {
  try {
    res.json(await usersController.update(req))
  } catch (err) {
    err instanceof Error && res.send(err.message)
    next(err)
  }
})

usersRouter.delete('/:registry', async (req, res, next) => {
  try {
    res.json(await usersController.delete(req))
  } catch (err) {
    err instanceof Error && res.send(err.message)
    next(err)
  }
})
