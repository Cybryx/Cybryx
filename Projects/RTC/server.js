// Import
const fs = require("fs");
const path = require("path");
const express = require('express')
const app = express()
const { v4: uuidV4 } = require('uuid')
const { ExpressPeerServer } = require("peer");


// Initialize the io server instance and peer server
const httpserver = require('http').Server(app)
const io = require('socket.io')(httpserver)
const peerServer = ExpressPeerServer(httpserver, {
	debug: true,
  proxied: true
});

// Custom middleware
function X(req, res, next) {
  res.setHeader('X-Powered-By', 'AuthX Services // CybryX');
  next()
}
app.use(X)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use("/peerjs", peerServer);


//--------------------------------------GETS--------------------------------------//
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

//--------------------------------------POSTS--------------------------------------//
app.post('/', (req, res) => {
  const roomName = req.body.roomName || uuidV4().split('-')[0];
  res.redirect(`/${roomName}`);
})


//---------------------------------------IO---------------------------------------//
io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

//-------------------------------Server Startup Config----------------------------//
const file = path.join(__dirname, '../', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.WebRTC.port


var server = httpserver.listen(port, function () {
  var port = server.address().port;
  var family = server.address().family;
  var address = server.address().address;
  if (address == '::') {
      address = 'this ratio mf';
  }
  console.log('Server running on Port: http://localhost:' + port, '| Family:', family, '| Address', address);
});