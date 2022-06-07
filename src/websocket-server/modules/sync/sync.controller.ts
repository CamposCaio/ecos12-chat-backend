import WebSocket from 'ws'
import { SyncDto } from './dto/sync.dto'
import { SyncService } from './sync.service'

export class SyncController {
  private syncService = new SyncService()

  async sync(data: SyncDto, socket: WebSocket) {
    return await this.syncService.sync(data, socket)
  }
}
