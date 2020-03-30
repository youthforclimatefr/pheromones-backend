global.config = require('./config.json')

const express = require('express') // import express
const bodyParser = require('body-parser') // import body-parser

const app = express() // create expresse instance
const port = config.API.port // set webserver' port

// init body-parser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use('/api', require('./server/modules/router')) // use API' router
require('./server/modules/sockets') // run websocket server

app.get('*', (req, res) => {
  res.json({
    version: '0.1'
  })
})

// run webserver
app.listen(port, () => {
  console.log(`Pheromones is running on port ${port}!`)
})