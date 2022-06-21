import { GetIpDto } from './dto/getIp.dto'
import { getIpService } from './getIp.module'

export class GetIpController {
  async find(getIpDto: GetIpDto) {
    return getIpService.find(getIpDto.userRegistry)
  }
}
