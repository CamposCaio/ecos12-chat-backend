import { WebSocket } from 'ws'
import { SyncDto } from './sync.dto'
import * as jwt from 'jsonwebtoken'
import { ClientDto } from '../../utils/client.dto'
import { newError } from '../../utils/handlers'
import { webSocketManager } from '../../../index'
import { MessagesService } from '../messages/messages.service'

export class SyncService {
  private messagesService = new MessagesService()

  sync(data: SyncDto, socket: WebSocket) {
    const client = this.authenticateToken(data?.token)
    if (!client) return newError('Invalid token.', 400)
    webSocketManager.setOnlineClients(client, socket)
    return this.messagesService.getMessages(client.id, data.lastSyncTimestamp)
  }

  private authenticateToken(token: string | undefined) {
    if (!token) return
    if (!process.env?.JWT_KEY) return
    const privateKey = process.env.JWT_KEY
    return jwt.verify(token, privateKey) as ClientDto
  }
}
