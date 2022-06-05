import WebSocket from 'ws'
import { SyncDto } from './sync.dto'
import { SyncService } from './sync.service'

export class SyncController {
  private syncService = new SyncService()

  sync(data: SyncDto, socket: WebSocket) {
    return this.syncService.sync(data, socket)
  }
}
