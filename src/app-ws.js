const WebSocket = require('ws')

function onError(ws, err) {
  console.error(`onError: ${err.message}`)
}

function onMessage(ws, data, server) {
  console.log(`onMessage: ${data.toString()}`)
  server.broadcast(data.toString())
  // ws.send(`recebido!`)
}

function onConnection(ws, req) {
  const server = this
  ws.on('message', (data) => onMessage(ws, data, server))
  ws.on('error', (error) => onError(ws, error))
  console.log(`onConnection`)
}

function broadcast(jsonObject) {
  if (!this.clients) return
  this.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(jsonObject))
    }
  })
}

module.exports = (server) => {
  const wss = new WebSocket.Server({
    server,
  })

  wss.on('connection', onConnection)
  wss.broadcast = broadcast

  console.log(`App Web Socket Server is running!`)
  return wss
}
