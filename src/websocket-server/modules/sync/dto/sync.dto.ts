import { BaseWsDto } from '../../../utils/dto/base.dto'

export interface SyncDto extends BaseWsDto {
  lastSyncTimestamp?: number
  clientIp: string
}
