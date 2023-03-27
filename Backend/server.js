require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const http = require('http').createServer(app)
const io = require('socket.io')(http)
io.on('connection', socket => {
 SocketServer(socket)
})

// connect to mongodb
const URI = process.env.DB_URI
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => { console.log('Connected to Mongo!'); }) 
.catch((err) => { console.error('Error connecting to Mongo', err); });


// routes
// app.use('/api', require('./routes/router_user')) // mau connect


const PORT = process.env.PORT || 4000
http.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})