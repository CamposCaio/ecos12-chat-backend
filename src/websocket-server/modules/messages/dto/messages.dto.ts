import { MessageDto } from './message.dto'

export interface MessagesDto {
  conversationId: string
  messages: MessageDto[]
}
