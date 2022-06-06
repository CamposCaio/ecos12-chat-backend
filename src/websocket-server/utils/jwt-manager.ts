import { webSocketManager } from '../../main'
import * as jwt from 'jsonwebtoken'
import { ClientDto } from './dto/client.dto'

class JwtManager {
  getLogged(token: string) {
    webSocketManager.getOnlineClients().forEach((onlineClient) => {
      if (onlineClient.token === token) return onlineClient
    })
  }

  getPayload(token: string) {
    if (!process.env?.JWT_KEY) return
    const privateKey = process.env.JWT_KEY
    try {
      return jwt.verify(token, privateKey) as ClientDto
    } catch {
      throw new Error('Invalid JWT.')
    }
  }
}

export const jwtManager = new JwtManager()
