import { MoreThanOrEqual } from 'typeorm'
import { conversationService } from '../../../http-server/modules/conversations/conversation.module'
import { Message } from '../../../entities/message.entity'
import { messageRepository } from './message.module'
import { newError } from '../../utils/error.builder'

export class MessageService {
  async findByUser(userId: string, fromTimestamp = 0) {
    const conversations = await conversationService.findByUser(userId)

    let newMessages: Message[] = []
    for (let i = 0; i < conversations.length; i++) {
      const messages = await messageRepository.findBy({
        conversationId: conversations[i].id,
        created_at: MoreThanOrEqual(new Date(fromTimestamp)),
      })
      newMessages.push(...messages)
    }
    return newMessages
  }

  async create(message: Message) {
    const savedMessage = messageRepository.save(message)
    if (!savedMessage) return newError('Error while saving the message', 500)
    return savedMessage
  }
  // async syncMessages(userId: string, fromTimestamp = 0) {
  //   const conversations = await conversationService.findByUser(userId)
  //   conversations.forEach(async (conversation) => {
  //     const total = await messageRepository.countBy({
  //       conversationId: conversation.id,
  //       created_at: MoreThanOrEqual(new Date(fromTimestamp)),
  //     })
  //     if (!total) return
  //     for (let i = 0; i < total; i += TAKE) {
  //       const [messages] = await messageRepository.findAndCount({
  //         where: {
  //           conversationId: conversation.id,
  //           created_at: MoreThanOrEqual(new Date(fromTimestamp)),
  //         },
  //         take: TAKE,
  //         skip: i * TAKE,
  //       })
  //       messages &&
  //         webSocketManager.sendMessage(JSON.stringify(messages), userId)
  //     }
  //   })
  // }
}
