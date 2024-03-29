// Import
const fs = require("fs")
const path = require('path');
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const upload = require('express-fileupload')
const methodOverride = require('method-override')

// Passport Initialize
const initializePassport = require('./passport-config');
initializePassport(
  passport,
  username => db.X.find(user => user.username === username),
  id => db.X.find(user => user.id === id)
)

let filename = []

// Database Configurations
const db = require(__dirname + '/db.json')
dbpath = __dirname + '/db.json'

// Express Configurations
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(express.static('./views'));
app.use(session({ secret: "CybryX", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(upload());

//--------------------------------------GETS--------------------------------------//
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.username })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs', { message: ""})
})

app.get('/bucket', checkAuthenticated, (req, res) => {
  const username = req.user.username;
  const masterPath = path.join(__dirname, '/views/content/', username);
  const fileItems = []; // Create an empty array to store file information

  function getDirectoryContents(dirPath, fileItems) {
    const items = fs.readdirSync(dirPath);
    for (let i = 0; i < items.length; i++) {
      const itemPath = path.join(dirPath, items[i]);
      const stats = fs.statSync(itemPath);
      if (stats.isFile()) {
        fileItems.push({
          name: itemPath.split("content/" + username)[1],
          type: items[i].split(".")[1],
          size: stats.size / (1024 * 1024),
          index: i,
          src: "https://cdn.cybryx.live/content/" + itemPath.split("/views/content/")[1]
        });
      } else if (stats.isDirectory()) {
        getDirectoryContents(itemPath, fileItems);
      }
    }
  }

  getDirectoryContents(masterPath, fileItems);
  res.render('bucket.ejs', { name: username, indexedFiles: fileItems });
});

app.get('/remove', checkAuthenticated, (req, res) => {
  const fileName = req.query.id;
  const filePath = path.join(__dirname + '/views/content/', req.user.username + "/" + fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      // handle the error
      res.send(err);
    } else {
      // file has been successfully deleted
      res.render('confirm-del.ejs', { filename: fileName })
    }
  });
});

app.get('/confirm', checkAuthenticated, (req, res) => {
  // find array based on username
  let username = req.user.username
  let upload = filename.find(user => user.username === username)
  if (!upload) {
    res.redirect("/")
  }
  else {
    filenow = upload.file // points at the filename
    res.render('confirm.ejs', { filename: filenow })
    filename.length = 0 // clears the array
  }
})

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/views/style.css')
});

app.get('/404', (req, res) => {
  username = "global"
  filenow = "The queried file"
  res.render('404.ejs', { filename: filenow, username: username })
  // res.send(`<?xml version='1.0' encoding='UTF-8'?><Error><Code>404</Code><Message>Not Found</Message><Details>The requested asset was not found inside the ${req.user.username} Cloud Storage bucket.</Details></Error>`)
});

app.get('/*', auth404, (req, res) => {
  username = req.user.username
  filenow = req.query
  res.render('404.ejs', { filename: filenow, username: username })
});
//--------------------------------------POST--------------------------------------//
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Check if the user already exists
    const existingUser = db.X.find(user => user.username === username);
    if (existingUser) {
      // User already exists, so redirect back to the registration page with an error message
      res.render('register.ejs', { message: 'User already exists' });
      return;
    }

    if(username.includes("/") || username.includes(".") || username.includes(" ") || username.includes("!") || username.includes("@") || username.includes("#") || username.includes("$") || username.includes("%") || username.includes("^") || username.includes("&") || username.includes("*") || username.includes("(") || username.includes(")")) {
      res.render('register.ejs', {message: 'Username contains illegal character' });
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Make an object to push the user information
    const newUser = {
      id: Date.now().toString(),
      username: username,
      password: hashedPassword
    }
    // Push the registration info to db
    db.X.push(newUser)
    // Add indentations to make the db readable
    fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));
    fs.mkdir(path.join(__dirname, `./views/content/${username}`), { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`Directory created for ${username}`);
    });
    res.redirect('/login')
  } catch (e) {
    console.log(e)
    res.redirect('/register')
  }
})

app.post('/', checkAuthenticated, (req, res) => {
  if (req.files) {
    console.log(req.files)

    // Store content and content name in variables
    var file = req.files.file
    var contentname = file.name
    let folder = req.user.username

    // Make a User Folder
    fs.mkdir(path.join(__dirname, `./views/content/${folder}`),
      { recursive: true }, (err) => {
        if (err) { return console.error(err); }
        console.log(`Directory created for ${folder}`);
      });

    // Move the file into the folder
    file.mv(`./views/content/${folder}/` + contentname, function (err) {
      if (err) { res.send(err) }
      else {
        // push username and filename to the filename list
        filename.push({
          username: req.user.username,
          file: contentname
        })
        console.log(`Done uploading ${contentname} in Content/${folder}!`);
        res.redirect('/confirm')
      }
    })
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
  if (req.isAuthenticated()) { return res.redirect('/') }
  next()
}
//--------------------------------User Not Signed In------------------------------//
function auth404(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.redirect('/404')
}
//-------------------------------Server Startup Config----------------------------//
var server = app.listen(5003, function () {
  var port = server.address().port
  var family = server.address().family
  var address = server.address().address
  if (address == "::") { address = "this ratio mf" }
  console.log("Server running on Port: http://localhost:" + port, "| Family:", family, "| Address", address)
});