import { Request, Router } from 'express'
import { route } from '../../utils/route'
import { peerToPeerService } from './peerToPeer.module'

export class PeerToPeerController {
  constructor(router: Router) {
    router.get('/:registry', route.bind(null, this.getIp))
    router.post('/', route.bind(null, this.validate))
  }

  async validate(req: Request) {
    const targetRegistry = req.body.registry
    const token = req.body.token
    return await peerToPeerService.validate(targetRegistry, token)
  }

  async getIp(req: Request) {
    const clientRegistry = req.headers['registry'] as string
    const targetRegistry = req.params.registry
    return await peerToPeerService.getIp(clientRegistry, targetRegistry)
  }
}
