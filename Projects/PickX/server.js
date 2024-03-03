// Import
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const flip = require('flipacoin');


// Custom middleware
function X(req, res, next) {
  res.setHeader('X-Powered-By', 'AuthX Services // CybryX');
  next()
}
app.use(express.static('site'));
app.use(X)


//--------------------------------------GETS--------------------------------------//
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/flip', (req, res) => {
  const userChoice = req.query.choice;
  const coinResult = flip('num');

  if (userChoice == coinResult) {
    res.send('🎉 Do it! 🎉');
  } else {
    res.send('😕 It\'s not worth it.');
  }
});


//-------------------------------Server Startup Config----------------------------//
const file = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.PickX.port

var server = app.listen(port, function () {
    var port = server.address().port;
    var family = server.address().family;
    var address = server.address().address;
    if (address == '::') {
        address = 'this ratio mf';
    }
    console.log('Server running on Port: http://localhost:' + port, '| Family:', family, '| Address', address);
});