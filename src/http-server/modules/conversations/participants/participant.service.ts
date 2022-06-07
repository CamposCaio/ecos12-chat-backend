import { Participant } from '../../../../entities/participant.entity'
import { userService } from '../../users/user.module'
import { participantRepository } from './participant.module'

export class ParticipantService {
  async find(conversationId: string, userId: string) {
    return await participantRepository.findOneBy({
      conversationId,
      userId,
    })
  }

  async createByRegistry(registry: string, conversationId: string) {
    const user = await userService.findByRegistry(registry)
    const participant = new Participant()
    participant.conversationId = conversationId
    participant.userId = user.id
    const savedParticipant = await participantRepository.save(participant)
    if (!savedParticipant) throw new Error('Cannot create the participant.')
    return savedParticipant
  }

  async findByUser(userId: string) {
    // return await participantRepository.find()
    return await participantRepository.findBy({ userId })
  }

  async findByRegistry(registry: string) {
    const { id: userId } = await userService.findByRegistry(registry)
    return await participantRepository.findBy({ userId })
  }

  async findByConversation(conversationId: string) {
    return await participantRepository.findBy({ conversationId })
  }
}
