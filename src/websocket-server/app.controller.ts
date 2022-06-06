import { MessageController } from './modules/messages/messages.controller'
import { SyncController } from './modules/sync/sync.controller'
import { WebSocket } from 'ws'
import { newError } from './utils/error.builder'

export class AppController {
  private messageController = new MessageController()
  private syncController = new SyncController()

  route(data: any, socket: WebSocket) {
    if (!data || !data?.type)
      return newError('Please, specify the data type.', 400)
    try {
      switch (data.type) {
        case 'sync':
          return this.syncController.sync(data, socket)
        case 'message':
          return this.messageController.create(data)
        case 'getMessages':
          return this.messageController.find(data)
        default:
          return newError('Unknown type of data.', 400)
      }
    } catch (err) {
      if (err instanceof Error) return newError(err.message, 400)
      else return newError('Unknown error.', 500)
    }
  }
}
