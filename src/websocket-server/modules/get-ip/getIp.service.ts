import { webSocketManager } from '../../../main'
import { newError } from '../../utils/error.builder'
import { GetIpDto } from './dto/getIp.dto'

export class GetIpService {
  async find(registry: string): Promise<GetIpDto> {
    const client = webSocketManager
      .getOnlineClients()
      .find((client) => client.registry === registry)
    if (!client) throw newError("The client doesn't exist or is offline.", 400)
    return {
      userRegistry: registry,
      userIp: client?.userIp,
    }
  }
}
