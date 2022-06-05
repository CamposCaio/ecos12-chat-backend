import { MessageController } from './modules/messages/messages.controller'
import { SyncController } from './modules/sync/sync.controller'
import { WebSocket } from 'ws'
import { newError } from './utils/handlers'

export class AppController {
  private messageController = new MessageController()
  private syncController = new SyncController()

  route(data: any, socket: WebSocket) {
    if (!data || !data?.type)
      return newError('The data object needs the property type.', 400)
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
  }
}
