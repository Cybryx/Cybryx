const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');


const frontendRouter = require("./routes/frontend");
const authRouter = require("./routes/auth");
const contactRouter = require("./routes/contact");
const syncRouter = require("./routes/sync");
const servicesRouter = require("./routes/services");

function X(req, res, next) {
    res.setHeader('X-Powered-By', 'AuthX Services // CybryX');
    next()
}
app.use(X)
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use("/", frontendRouter)
app.use("/auth", authRouter);
app.use("/contact", contactRouter);
app.use("/sync", syncRouter);
app.use("/services", servicesRouter);

const file = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(file, 'utf8'));
const port = config.projects.AuthX.port

var server = app.listen(port, function () {
    var port = server.address().port;
    var family = server.address().family;
    var address = server.address().address;
    if (address == '::') {
        address = 'this ratio mf';
    }
    console.log('Server running on Port: http://localhost:' + port, '| Family:', family, '| Address', address);
});