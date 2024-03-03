// Import
const fs = require('fs');
const path = require('path')
const express = require('express');
const app = express();

function X(req, res, next) {
    res.setHeader('X-Powered-By', 'AuthX Services // CybryX');
    next()
}
app.use(X)
app.use(express.static(path.join(__dirname, 'build')));

// Database Initialization
const db = require(path.join(__dirname, '..', 'db.json'))
const dbpath = path.join(__dirname, '..', 'db.json');

//--------------------------------------GETS--------------------------------------//
app.get('/', async (req, res) => {
    res.sendFile("/build/index.html")
}); 

app.get('/db/:user', async (req, res) => {
  try {
    const username = req.params.user;
    const user = db.X.find(user => user.username === username);

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user has a TODO property
    if (!user.TODO || !Array.isArray(user.TODO) || !user.TODO.length) {
      return res.status(404).json({ error: 'TODO list not found' });
    }

    // Return the user's TODO list
    res.json(user.TODO[0].list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//--------------------------------------POST--------------------------------------//
app.post('/db/sync/:user', async (req, res) => {
  // handle syncingg
    res.send("DONE")
});

//-------------------------------Server Startup Config----------------------------//
const file = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.Todo.port

var server = app.listen(port, function () {
    var port = server.address().port
    var family = server.address().family
    var address = server.address().address
    if (address == "::") { address = "this ratio mf" }
    console.log("Server running on Port: http://localhost:" + port, "| Family:", family, "| Address", address)
});