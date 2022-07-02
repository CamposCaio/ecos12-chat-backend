import { WebSocket } from 'ws'
import { SyncDto } from './dto/sync.dto'
import { newError } from '../../utils/error.builder'
import { webSocketManager } from '../../../main'
import { jwtManager } from '../../utils/jwt-manager'
import { messageMapper, messageService } from '../messages/message.module'
import {
  conversationMapper,
  conversationService,
} from '../../../http-server/modules/conversations/conversation.module'

export class SyncService {
  async sync(data: SyncDto, socket: WebSocket) {
    if (!data.token || !data.userIp) return newError('Invalid DTO.', 400)
    const clientDto = jwtManager.getPayload(data.token)
    if (!clientDto) return newError('Invalid JWT.', 400)
    webSocketManager.setOnlineClients(
      clientDto,
      socket,
      data.token,
      data.userIp
    )
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
          conversations: await Promise.all(
            newConversations.map(conversationMapper.entityToDto)
          ),
        }),
        { receiverId: clientId }
      )

    const newMessages = await Promise.all(
      (
        await messageService.findByUser(clientId, fromTimestamp)
      ).map(messageMapper.entityToDto)
    )
    newMessages.length &&
      webSocketManager.sendMessage(
        JSON.stringify({
          type: 'messages',
          messages: newMessages,
        }),
        { receiverId: clientId }
      )
  }
}
