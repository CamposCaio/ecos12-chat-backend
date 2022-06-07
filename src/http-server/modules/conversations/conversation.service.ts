import { Conversation } from '../../../entities/conversation.entity'
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

    participantsRegistry?.forEach((participantRegistry) => {
      participantService.createByRegistry(
        participantRegistry,
        savedConversation.id
      )
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
