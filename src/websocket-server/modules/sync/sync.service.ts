import { WebSocket } from 'ws'
import { SyncDto } from './sync.dto'
import { newError } from '../../utils/error.builder'
import { webSocketManager } from '../../../main'
import { MessagesService } from '../messages/messages.service'
import { jwtManager } from '../../utils/jwt-manager'

export class SyncService {
  private messagesService = new MessagesService()

  sync(data: SyncDto, socket: WebSocket) {
    if (!data.token) return newError('The token is required.', 400)
    const clientDto = jwtManager.getPayload(data.token)
    if (!clientDto) return newError('Invalid JWT.', 400)
    webSocketManager.setOnlineClients(clientDto, socket, data.token)
    return this.messagesService.getMessages(
      clientDto.id,
      data.lastSyncTimestamp
    )
  }
}
