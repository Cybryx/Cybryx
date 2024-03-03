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

//--------------------------------------GETS--------------------------------------//
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
}); 


//-------------------------------Server Startup Config----------------------------//
const file = path.join(__dirname, '../..', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.Docs.port

var server = app.listen(port, function () {
    var port = server.address().port
    var family = server.address().family
    var address = server.address().address
    if (address == "::") { address = "this ratio mf" }
    console.log("Server running on Port: http://localhost:" + port, "| Family:", family, "| Address", address)
});