import { RawData, WebSocket, WebSocketServer, Server as WSServer } from 'ws'
import { Server } from 'http'
import { handleNewMessage } from './messages/messages.service'
import { authenticate } from './authentication/authentication.service'

export class WebSocketManager {
  wsServer: WSServer

  constructor(server: Server) {
    this.wsServer = new WebSocketServer({ server })
    this.wsServer.on('connection', this.onConnection.bind(this))
  }

  onConnection(socket: WebSocket) {
    socket.on('message', this.onMessage)
    socket.on('error', (err) => console.error(`Socket error: ${err.message}`))
    // const ip = request.socket.remoteAddress
    // const ip = request.headers['x-forwarded-for'].split(',')[0].trim()
  }

  onMessage(this: WebSocket, data: RawData) {
    const flatMessage = data.toString()
    if (flatMessage === '{}') return // ping message
    const dataObj = JSON.parse(flatMessage)
    switch (dataObj?.type) {
      case 'message':
        handleNewMessage(this, dataObj.body)
        break
      case 'authentication':
        authenticate(this, dataObj.body)
        break
      default:
        throw new Error(
          "Unknown type of message. Please, specify a property 'type' in the body."
        )
    }
  }

  broadcast(message: string) {
    if (!this.wsServer.clients) return
    this.wsServer.clients.forEach((client: WebSocket) => {
      client.readyState === WebSocket.OPEN && client.send(message)
    })
  }
}
