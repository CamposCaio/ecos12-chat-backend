import { BaseWsDto } from './base.dto'

export interface ErrorDto extends BaseWsDto {
  statusCode: number
  description: string
}
