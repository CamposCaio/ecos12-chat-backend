import { Conversation } from '../../../entities/conversation.entity'
import { webSocketManager } from '../../../main'
import {
  conversationRepository,
  conversationService,
} from './conversation.module'
import { participantService } from './participants/participant.module'

export class ConversationService {
  async create(conversation: Conversation, participantsRegistry: string[]) {
    if (
      !conversation.creator ||
      !participantsRegistry ||
      !participantsRegistry.length
    )
      throw new Error('Invalid conversation request.')

    const savedConversation = await conversationRepository.save(conversation)
    if (!savedConversation) throw new Error('Error while saving conversation.')

    for (let i = 0; i < participantsRegistry.length; i++) {
      const participant = await participantService.createByRegistry(
        participantsRegistry[i],
        savedConversation.id
      )
      if (!participant) throw new Error('Error while saving participant.')
    }
    participantsRegistry.forEach((registry) => {
      webSocketManager.sendMessage(JSON.stringify(savedConversation), {
        receiverRegistry: registry,
      })
    })

    return savedConversation
  }

  async find(id: string) {
    return await conversationRepository.findOneBy({ id })
  }

  async findAll() {
    return await conversationRepository.find()
  }

  async findByUser(userId: string, fromTimestamp = 0) {
    const participants = await participantService.findByUser(userId)

    const res: Conversation[] = []
    for (let i = 0; i < participants.length; i++) {
      const conversation = await conversationService.find(
        participants[i]?.conversationId
      )
      if (!conversation) continue
      if (conversation?.created_at >= new Date(fromTimestamp))
        res.push(conversation)
    }

    return res
  }
}
