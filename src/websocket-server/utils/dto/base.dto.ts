export class BaseWsDto {
  type: 'message' | 'sync' | 'error'
  token?: string
}
