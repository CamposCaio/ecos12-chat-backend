import { webSocketManager } from '../../../main'
import * as jwt from 'jsonwebtoken'

interface JwtPeerToPeer {
  registry: string
  ip: string
}

export class PeerToPeerService {
  async getIp(clientRegistry: string, targetRegistry: string) {
    const target = webSocketManager
      .getOnlineClients()
      .find((client) => client.registry === targetRegistry)
    if (!target) throw new Error("The client doesn't exist or is offline.")
    const token = this.generateToken(clientRegistry, target.userIp)
    return {
      userRegistry: targetRegistry,
      userIp: target.userIp,
      token,
    }
  }

  async validate(targetRegistry: string, token: string) {
    if (!process.env?.JWT_KEY) throw new Error('JWT server error.')
    const privateKey = process.env.JWT_KEY
    try {
      const jwtPayload = jwt.verify(token, privateKey) as JwtPeerToPeer
      if (jwtPayload.registry === targetRegistry) return jwtPayload
      else throw new Error('Inconsistent token.')
    } catch {
      throw new Error('Invalid token.')
    }
  }

  private generateToken(registry: string, ip: string) {
    if (!process.env?.JWT_KEY) throw new Error('JWT server error.')
    const privateKey = process.env.JWT_KEY
    const token = jwt.sign({ registry, ip }, privateKey, {
      expiresIn: '12h',
    })

    if (!token) throw new Error(`Error while generating JWT.`)
    return token
  }
}
