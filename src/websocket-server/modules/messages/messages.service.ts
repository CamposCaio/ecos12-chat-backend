import { MessageDto } from './messages.dto'

export class MessagesService {
  getMessages(userId: string, fromTimestamp?: number) {}

  create(message: MessageDto) {
    message.timestamp = Date.now()
  }
}
