const app = require('./app')
const WSServer = require('./app-ws')

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App Express is running!`)
})

const wss = WSServer(server)
// wss.broadcast({ message: 'Hello!' })
// setInterval(() => {
//   wss.broadcast({ n: Math.random() })
// }, 1000)
