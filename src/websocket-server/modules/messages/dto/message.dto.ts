import { BaseWsDto } from '../../../utils/dto/base.dto'

export interface MessageDto extends BaseWsDto {
  id?: string
  senderId?: string
  senderRegistry: string
  conversationId: string
  text: string
  timestamp?: number
}

export interface CreateMessageDto extends BaseWsDto {
  senderRegistry: string
  conversationId: string
  text: string
}
