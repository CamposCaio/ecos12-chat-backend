import WebSocket, { WebSocketServer } from 'ws'
import { Server } from 'http'

interface SocketDictionary {
  [index: number]: WebSocket.WebSocket
}

export class WebSocketManager {
  wsServer: WebSocket.Server
  onlineClients: SocketDictionary = {}
  counter = 0

  constructor(server: Server) {
    this.wsServer = new WebSocketServer({ server })
    this.wsServer.on('connection', this.onConnection.bind(this))
  }

  onConnection(socket: WebSocket.WebSocket, request: any) {
    socket.on('message', this.onMessage.bind(this))
    socket.on('error', (err) => console.error(`Socket error: ${err.message}`))
    // const ip = request.socket.remoteAddress
    // const ip = request.headers['x-forwarded-for'].split(',')[0].trim()
    this.onlineClients[this.counter] = socket
    this.counter++
    socket.send(JSON.stringify(Object.keys(this.onlineClients)))
    this.onlineClients[0].send('A new client has been connected!')
  }

  onMessage(data: WebSocket.RawData) {
    const message = data.toString()
    if (this.isPingMessage(message)) return
    const messageToSend = this.addTimestamp(message)
    this.broadcast(messageToSend)
  }

  isPingMessage(message: string) {
    return message === '{}' ? true : false
  }

  addTimestamp(message: string) {
    const objMessage = JSON.parse(message)
    objMessage.timestamp = Date.now()
    return JSON.stringify(objMessage)
  }

  broadcast(message: string) {
    if (!this.wsServer.clients) return
    this.wsServer.clients.forEach((client: WebSocket.WebSocket) => {
      client.readyState === WebSocket.OPEN && client.send(message)
    })
  }
}
