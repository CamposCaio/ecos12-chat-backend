const WebSocket = require('ws')

function onError(ws, err) {
  console.error(`onError: ${err.message}`)
}

function onMessage(ws, data) {
  console.log(`onMessage: ${data}`)
  ws.send(`recebido!`)
}

function onConnection(ws, req) {
  ws.on('message', (data) => onMessage(ws, data))
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
