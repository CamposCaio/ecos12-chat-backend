import { RawData, WebSocket, WebSocketServer, Server as WSServer } from 'ws'
import { Server } from 'http'
import { AppController } from './app.controller'
import { webSocketManager } from '../index'
import { ClientDto } from './utils/client.dto'

interface OnlineClient extends ClientDto {
  socket: WebSocket
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

  setOnlineClients(clientDto: ClientDto, socket: WebSocket) {
    this.onlineClients.push({ ...clientDto, socket })
  }

  onConnection(socket: WebSocket) {
    socket.on('message', this.onMessage)
    socket.on('error', (err) => console.error(`Socket error: ${err.message}`))
    // const ip = request.socket.remoteAddress
    // const ip = request.headers['x-forwarded-for'].split(',')[0].trim()
  }

  onMessage(this: WebSocket, data: RawData) {
    const dataObj = JSON.parse(data.toString())
    if (!dataObj?.keys().length) return // ping message
    this.send(webSocketManager.appController.route(dataObj, this))
  }

  broadcast(message: string) {
    if (!this.wsServer.clients) return
    this.wsServer.clients.forEach((client: WebSocket) => {
      client.readyState === WebSocket.OPEN && client.send(message)
    })
  }
}
