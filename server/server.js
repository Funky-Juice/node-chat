const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const http = require('http')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const message = (name, text) => ({name, text})

io.on('connection', (socket) => {

  socket.on('message: create', (data, callback) => {
    if (!data) {
      callback(`Message can't be empty`)
    } else {
      callback()
      io.emit('message: new', message('Admin', data.text))
    }
  })
})

app.use(express.static(publicPath))

server.listen(port, () => {
  console.log(`Server has been started on port ${port}...`)
})
