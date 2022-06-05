import { BaseWsDto } from '../../utils/base.dto'

export interface SyncDto extends BaseWsDto {
  lastSyncTimestamp: number
}
