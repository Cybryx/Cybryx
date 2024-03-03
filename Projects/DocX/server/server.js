// Import
const fs = require("fs");
const path = require("path");
const express = require('express');
const app = express();
const http = require('http');
const httpserver = http.createServer(app);
const { Server } = require("socket.io");


// Initialize the io server instance
const io = new Server(httpserver);

// Custom middleware
function X(req, res, next) {
  res.setHeader('X-Powered-By', 'AuthX Services // CybryX');
  next()
}
app.use(X)
app.use(express.static(path.join(__dirname, '../client', 'build')));



//--------------------------------------GETS--------------------------------------//
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', '/index.html'))
}); 

app.get('/*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', '/index.html'))
}); 


//---------------------------------------IO---------------------------------------//
const defaultValue = "";
io.on("connection", (socket) => {
  socket.on("get-document", (documentId) => {
    const document = findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      console.log(delta);
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", (data) => {
      console.log(data)
      saveDocument(documentId, data);
    });
  });
});


//-------------------------------------HELPER FUNCTIONS---------------------------//
function findOrCreateDocument(id) {
  const filePath = path.join(__dirname, "db.json");
  let documents = {};

  try {
    const data = fs.readFileSync(filePath, "utf8");
    documents = JSON.parse(data);
  } catch (error) {
    console.error("Error reading db.json file:", error.message);
  }

  if (id in documents) {
    return documents[id];
  }

  documents[id] = { _id: id, data: defaultValue };
  saveToFile(filePath, documents);

  return documents[id];
}

function saveDocument(id, data) {
  const filePath = path.join(__dirname, "db.json");
  let documents = {};

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    documents = JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading db.json file:", error.message);
  }

  documents[id] = { _id: id, data };
  saveToFile(filePath, documents);
}

function saveToFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing to db.json file:", error.message);
  }
}


//-------------------------------Server Startup Config----------------------------//
const file = path.join(__dirname, '../..', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.Docs.port


var server = httpserver.listen(port, function () {
  var port = server.address().port;
  var family = server.address().family;
  var address = server.address().address;
  if (address == '::') {
      address = 'this ratio mf';
  }
  console.log('Server running on Port: http://localhost:' + port, '| Family:', family, '| Address', address);
});