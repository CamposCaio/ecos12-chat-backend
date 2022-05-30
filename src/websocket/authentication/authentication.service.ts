import { WebSocket } from 'ws'
import { AuthenticationDTO } from './authentication.dto'

export function authenticate(
  SocketClient: WebSocket,
  data: AuthenticationDTO
) {}
