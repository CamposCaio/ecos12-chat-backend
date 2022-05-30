import { MessageDTO } from './messages.dto'
import { WebSocket } from 'ws'

export function handleNewMessage(SocketClient: WebSocket, message: MessageDTO) {
  message.timestamp = Date.now()
}
