import { plainToInstance } from 'class-transformer'
import { Conversation } from '../../../../entities/conversation.entity'
import { userMapper, userService } from '../../users/user.module'
import { ConversationDto, CreateConversationDto } from '../dto/conversation.dto'
import { participantService } from '../participants/participant.module'

export class ConversationMapper {
  async DtoToEntity(
    createConversationDto: CreateConversationDto
  ): Promise<Conversation> {
    const conversation = new Conversation()
    const user = await userService.findByRegistry(
      createConversationDto.creatorRegistry
    )
    conversation.creator = user
    conversation.title = createConversationDto.title
    return conversation
  }

  async entityToDto(conversation: Conversation): Promise<ConversationDto> {
    const participants = await participantService.findByConversation(
      conversation.id
    )

    !conversation.creator &&
      (conversation.creator = await userService.find(conversation.creatorId))

    const users = await Promise.all(
      participants.map((participant) => userService.find(participant.userId))
    )
    const participantsRegistry = users.map((user) => user.registry)

    return {
      id: conversation?.id,
      title: conversation?.title,
      participantsRegistry,
      creator: userMapper.entityToDto(conversation?.creator),
      timestamp: conversation?.created_at.getTime(),
    }
  }
}
