import { BaseWsDto } from '../../utils/dto/base.dto'

export interface MessageDto extends BaseWsDto {
  id?: string
  senderRegistry?: string
  receiverRegistry?: string
  groupId?: string
  text: string
  timestamp?: number
}

export interface GetMessagesDto extends BaseWsDto {
  fromTimestamp?: number
}
