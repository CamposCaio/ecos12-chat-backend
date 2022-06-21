import { plainToInstance } from 'class-transformer'
import { Message } from '../../../../entities/message.entity'
import { userService } from '../../../../http-server/modules/users/user.module'
import { CreateMessageDto, MessageDto } from '../dto/message.dto'

export class MessageMapper {
  async dtoToEntity(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = plainToInstance(Message, createMessageDto, {
      excludeExtraneousValues: true,
    })
    message.content = createMessageDto.text
    const user = await userService.findByRegistry(
      createMessageDto.senderRegistry
    )
    if (!user) throw new Error('Invalid sender registry.')
    message.senderId = user.id
    return message
  }

  async entityToDto(message: Message): Promise<MessageDto> {
    const sender = await userService.find(message.senderId)

    return {
      type: 'message',
      id: message?.id,
      senderId: sender?.id,
      senderRegistry: sender?.registry,
      conversationId: message?.conversationId,
      text: message?.content,
      timestamp: message?.created_at.getTime(),
    }
  }
}
