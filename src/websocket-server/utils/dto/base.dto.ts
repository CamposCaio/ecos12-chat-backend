export class BaseWsDto {
  type: 'message' | 'sync' | 'error' | 'getIp'
  token?: string
}
