export interface BaseWsDto {
  type: 'message' | 'sync' | 'error'
  token?: string
}
