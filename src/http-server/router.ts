import { Router } from 'express'
import { conversationRouter } from './modules/conversations/conversation.module'
import { loginRouter } from './modules/login/login.module'
import { peerToPeerRouter } from './modules/peer-to-peer/peerToPeer.module'
import { userRouter } from './modules/users/user.module'
import { authorizer } from './utils/authorizer'

export const router = Router()

router.get('/', (_req, res) => {
  res.send({ timestamp: Date.now() })
})
router.use('/login', loginRouter)
router.use(authorizer)
router.use('/users', userRouter)
router.use('/conversations', conversationRouter)
router.use('/peer-to-peer', peerToPeerRouter)
