import { GetMessagesDto, MessageDto } from './messages.dto'

export class MessageController {
  create(message: MessageDto) {
    // save in DB
    // send if online receiver
    return 1
  }

  find(data: GetMessagesDto) {
    return 'ok'
  }
}
