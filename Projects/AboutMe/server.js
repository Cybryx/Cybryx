// Core Imports
const express = require('express');
const app = express();
const ejs = require('ejs'); // initialize frontend X

// Form Handling
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

// X Authentication
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

// Passport Initialize
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    username => db.X.find(user => user.username === username),
    id => db.X.find(user => user.id === id)
)

// Database Initialization
const db = require(__dirname + '/db.json')

// Express Configurations
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash())
app.use(session({ secret: "CybryX", resave: false, saveUninitialized: false })) // use uuid
app.use(passport.initialize())
app.use(passport.session())


//--------------------------------------GETS--------------------------------------//

app.get('/x', checkAuthenticated, (req, res, next) => {
    res.sendFile(__dirname + '/build/x/home/index.html');
});

app.get('/hash/:id', async (req, res) => {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(id, 10);
    res.send(hashedPassword);
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/build/x/login/index.html');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//--------------------------------------POST--------------------------------------//

app.post('/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            const errorMessage = info.message;
            return res.redirect(`/auth?redirect=failure&error=${encodeURIComponent(errorMessage)}`);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/auth?redirect=success&uname=${encodeURIComponent(user.username)}`);
        });
    })(req, res, next);
});

app.post('/contact', function (req, res) {
    var username = req.body.name;
    if (!username) {
        res.redirect('/confirm')
    } else {
        id = Date.now().toString();
        store = require(__dirname + '/messages.json');
        storepath = __dirname + '/messages.json';
        department = req.body.category
        message = {
            id: id,
            name: username,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
        };
        store[department].push(message);
        fs.writeFileSync(storepath, JSON.stringify(store, null, 4));
        res.redirect('/confirm?name=' + username + '&subject=' + req.body.subject);
    }
});


//-----------------------------DELETE Route for Logout----------------------------//
app.delete('/logout', (req, res, next) => {
    req.logOut(function (err) { return next(err); })
    res.redirect('/login')
})
//--------------------------------User Not Signed In------------------------------//
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    res.redirect('/login')
}
//---------------------------------User IS Signed In------------------------------//
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return res.redirect('/x') }
    next()
}


//-------------------------------Server Startup Config----------------------------//
var server = app.listen(5001, function () {
    var port = server.address().port;
    var family = server.address().family;
    var address = server.address().address;
    if (address == '::') {
        address = 'this ratio mf';
    }
    console.log('Server running on Port: https://localhost:' + port, '| Family:', family, '| Address', address);
});