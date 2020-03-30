const WSServer = require('ws').Server // Import WS

// Create WS instance
const wss = new WSServer({
  port: config.SOCKETS.port,
  path: '/sockets'
})

// listen for event
wss.on('connection', (ws, req) => {
  ws.on('message', message => {
    
    console.log(wss.clients)
    console.log(req)
    console.log(`[${req.connection.remoteAddress}] > ${message}`)

  })
})

module.exports = wss