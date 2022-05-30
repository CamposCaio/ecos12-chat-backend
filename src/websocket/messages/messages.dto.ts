export interface MessageDTO {
  id?: number
  senderRegistry: string
  recipientRegistry?: string
  groupId?: number
  text: string
  timestamp?: number
}
