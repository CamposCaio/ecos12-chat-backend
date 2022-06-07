import { WebSocket } from 'ws'
import { SyncDto } from './dto/sync.dto'
import { newError } from '../../utils/error.builder'
import { webSocketManager } from '../../../main'
import { jwtManager } from '../../utils/jwt-manager'
import { messageService } from '../messages/message.module'
import { conversationService } from '../../../http-server/modules/conversations/conversation.module'

export class SyncService {
  async sync(data: SyncDto, socket: WebSocket) {
    if (!data.token) return newError('The token is required.', 400)
    const clientDto = jwtManager.getPayload(data.token)
    if (!clientDto) return newError('Invalid JWT.', 400)
    webSocketManager.setOnlineClients(clientDto, socket, data.token)
    console.log(
      'Client connected. Online clients: ',
      webSocketManager
        .getOnlineClients()
        .map((onlineClient) => onlineClient.nickname)
    )
    this.sendNewEventsToClient(clientDto.id, data.lastSyncTimestamp)
  }
  async sendNewEventsToClient(clientId: string, fromTimestamp = 0) {
    const newConversations = await conversationService.findByUser(
      clientId,
      fromTimestamp
    )
    newConversations.length &&
      webSocketManager.sendMessage(
        JSON.stringify({
          type: 'conversations',
          conversations: newConversations,
        }),
        clientId
      )

    const newMessages = await messageService.findByUser(clientId, fromTimestamp)
    newMessages.length &&
      webSocketManager.sendMessage(
        JSON.stringify({
          type: 'messages',
          messages: newMessages,
        }),
        clientId
      )
  }
}
