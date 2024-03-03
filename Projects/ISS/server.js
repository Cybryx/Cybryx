// Import
const fs = require('fs');
const path = require('path')
const express = require('express');
const axios = require('axios');
const app = express();

function X(req, res, next) {
    res.setHeader('X-Powered-By', 'AuthX Services // CybryX');
    next()
}
app.use(X)
app.use(express.static(path.join(__dirname, 'site')));

//--------------------------------------GETS--------------------------------------//
app.get('/app', async (req, res) => {
    res.redirect("/CybryX.mobileconfig")
}); 


app.get('/iss', async (req, res) => {
    try {
        const response = await axios.get('http://api.open-notify.org/iss-now.json');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//-------------------------------Server Startup Config----------------------------//
const file = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.ISS.port

var server = app.listen(port, function () {
    var port = server.address().port
    var family = server.address().family
    var address = server.address().address
    if (address == "::") { address = "this ratio mf" }
    console.log("Server running on Port: http://localhost:" + port, "| Family:", family, "| Address", address)
});
