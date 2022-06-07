import { BaseWsDto } from './base.dto'

export class ErrorDto extends BaseWsDto {
  statusCode: number
  description: string
}
