import { webSocketManager } from '../../../main'
import { CreateMessageDto } from './dto/message.dto'
import { messageMapper, messageService } from './message.module'
import { ErrorDto } from '../../utils/dto/error.dto'

export class MessageController {
  async create(createMessageDto: CreateMessageDto) {
    const message = await messageService.create(
      await messageMapper.dtoToEntity(createMessageDto)
    )
    if (message instanceof ErrorDto) return message
    const messageDto = await messageMapper.entityToDto(message)
    webSocketManager.broadcast(messageDto)
    return messageDto
  }
}
