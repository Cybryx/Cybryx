const express = require('express');
const fs = require('fs');
const path = require('path');
const { isAuthenticated } = require('../middleware/authenticated');

// Database Configurations
const db = require(path.join(__dirname, '/../../', 'db.json'));
const dbpath = path.join(__dirname, '/../../', 'db.json');

const router = express.Router();

// Function to get the enabled status of a specific service
router.get('/status/:service', isAuthenticated, (req, res) => {
  try {
    const authuser = req.user.username
    const { service } = req.params;
    
    const account = db.X.find(user => user.username === authuser);
    
    if (!account[service]) { return res.status(404).json({ status: "null", error: "Unknown service" }); }
    const getStatus = account[service][0];

    switch (getStatus.enabled) {
      case null:
        res.json({ status: "ready", username: authuser, action: "Init" });
        break;
      case false:
        res.json({ status: "deactivated", username: authuser, action: "Start" });
        break;
      case true:
        switch (service) {
          case 'TODO':
            res.status(200).json({ status: "active", username: authuser, list: getStatus.list });
            break;
          case 'CDN':
            res.status(200).json({ status: "active", username: authuser, content: getStatus.content });
            break;
          case 'ASLIMOSIQI':
            res.status(200).json({ status: "active", username: authuser, playlist: getStatus.list });
            break;
          case 'CYBERCRAFT':
            res.status(200).json({ status: "active", username: authuser, skin: getStatus.skin, ign: getStatus.ign });
            break;
        }
        break;
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Function to status the enabled property for a specific service
router.patch('/status/:service/:update', isAuthenticated, (req, res) => {
  try {
    // const { username, service, update } = req.body;
    const { service, update } = req.params;
    const id = req.user.id;

    // Find the user by username
    const user = db.X.find(user => user.id === id);
    if (!user) { return res.status(404).json({ error: 'User not found' }); }

    // Check if the service exists for the user
    if (!user[service]) { return res.status(404).json({ error: 'Banned' }); }

    // Convert the update value to boolean or null using a switch statement
    let updatedValue;
    switch (update) {
      case 'true':
        updatedValue = true;
        break;
      case 'false':
        updatedValue = false;
        break;
      case 'null':
        updatedValue = null;
        break;
      default:
        return res.status(400).json({ error: 'Invalid update value' });
    }
    user[service][0].enabled = updatedValue;
    fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));
    res.status(200).json({ message: 'Success' });
  } catch (error) { res.status(500).json({ error: 'Internal server error' }); }
});


module.exports = router;