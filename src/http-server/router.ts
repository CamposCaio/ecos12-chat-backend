import { Router } from 'express'
import { conversationRouter } from './modules/conversations/conversation.module'
import { loginRouter } from './modules/login/login.module'
import { userRouter } from './modules/users/user.module'

export const router = Router()

router.get('/', (_req, res) => {
  res.send({ timestamp: Date.now() })
})
router.use('/login', loginRouter)
router.use('/users', userRouter)
router.use('/conversations', conversationRouter)
