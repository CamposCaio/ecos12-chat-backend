import { RawData, WebSocket, WebSocketServer, Server as WSServer } from 'ws'
import { Server } from 'http'
import { AppController } from './app.controller'
import { webSocketManager } from '../main'
import { ClientDto } from './utils/dto/client.dto'

interface OnlineClient extends ClientDto {
  socket: WebSocket
  token: string
}

export class WebSocketManager {
  wsServer: WSServer
  appController = new AppController()
  private onlineClients: OnlineClient[] = []

  constructor(server: Server) {
    this.wsServer = new WebSocketServer({ server })
    this.wsServer.on('connection', this.onConnection.bind(this))
  }

  getOnlineClients() {
    return this.onlineClients
  }

  setOnlineClients(clientDto: ClientDto, socket: WebSocket, token: string) {
    this.onlineClients.push({ ...clientDto, socket, token })
  }

  onConnection(socket: WebSocket) {
    socket.on('message', this.onMessage.bind(this, socket))
    socket.on('close', this.onDisconnection.bind(this, socket))
    socket.on('error', (err) => console.error(`Socket error: ${err.message}`))
    // const ip = request.socket.remoteAddress
    // const ip = request.headers['x-forwarded-for'].split(',')[0].trim()
  }

  onMessage(socket: WebSocket, data: RawData) {
    const dataObj = JSON.parse(data.toString())
    if (!Object.keys(dataObj).length) return // ping message
    socket.send(
      JSON.stringify(webSocketManager.appController.route(dataObj, socket))
    )
    console.log(
      'Client connected. Online clients: ',
      this.onlineClients.map((client) => client.nickname)
    )
  }

  onDisconnection(socket: WebSocket) {
    for (let i = 0; i < this.onlineClients.length; i++) {
      if (this.onlineClients[i].socket === socket)
        this.onlineClients.splice(i, 1)
    }

    console.log(
      'Client disconnected. Online clients: ',
      this.onlineClients.map((client) => client.nickname)
    )
  }

  broadcast(message: string) {
    if (!this.wsServer.clients) return
    this.wsServer.clients.forEach((client: WebSocket) => {
      client.readyState === WebSocket.OPEN && client.send(message)
    })
  }
}
