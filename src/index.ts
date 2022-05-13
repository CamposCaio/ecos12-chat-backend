import { app } from './app.js'
import { wsserver } from './app-ws.js'

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App Express is running!`)
})

const wss = wsserver(server)
// wss.broadcast({ message: 'Hello!' })
// setInterval(() => {
//   wss.broadcast({ n: Math.random() })
// }, 1000)
