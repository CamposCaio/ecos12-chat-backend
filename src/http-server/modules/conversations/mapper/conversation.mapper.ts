import { plainToInstance } from 'class-transformer'
import { Conversation } from '../../../../entities/conversation.entity'
import { userService } from '../../users/user.module'
import { ConversationDto, CreateConversationDto } from '../dto/conversation.dto'

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

  entityToDto(conversation: Conversation): ConversationDto {
    return {
      title: conversation.title,
      participants: conversation.participants,
      creator: conversation.creator,
    }
  }
}
