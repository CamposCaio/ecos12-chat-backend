import { Request, Router } from 'express'
import { route } from '../../utils/route'
import { conversationMapper, conversationService } from './conversation.module'
import { CreateConversationDto } from './dto/conversation.dto'

export class ConversationController {
  constructor(router: Router) {
    router.post('/', route.bind(null, this.create))
    router.get('/', route.bind(null, this.findAll))
  }

  async create(req: Request) {
    const conversationDto: CreateConversationDto = req.body
    const conversation = await conversationService.create(
      await conversationMapper.DtoToEntity(conversationDto),
      conversationDto.participantsRegistry
    )
    return conversationMapper.entityToDto(conversation)
  }

  async findAll(_req: Request) {
    const conversations = await conversationService.findAll()
    return conversations
  }
}
