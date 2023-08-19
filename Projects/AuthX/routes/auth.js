// Imports
const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');


// Database Configurations
const db = require(path.join(__dirname, '/../../', 'db.json'));
const dbpath = path.join(__dirname, '/../../', 'db.json')

// Middleware & Initializations
const router = express.Router();
const JWT_SECRET_KEY = 'REDACTED';
const { UsernameValidity } = require('../middleware/username');
const { isAuthenticated } = require('../middleware/authenticated');


// Endpoint to log in a user and get a JWT token
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user with the provided username
        const user = db.X.find(user => user.username === username);
        if (!user) { return res.status(404).json({ error: 'User not found' }); }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) { return res.status(401).json({ error: 'Invalid credentials' }); }

        // Generate a JWT token with the user's id and username as payload
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET_KEY, 
            {expiresIn: '1m'}
        );

        // Return the token
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;

        // Check if the username is already taken
        const user = db.X.find(user => user.username === username);
        if (user) { return res.status(409).json({ error: 'Username already taken' }); }

        // Check if the username is valid
        if (!UsernameValidity(username)) { return res.status(400).json({ error: 'Username contains illegal characters' }); }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user object
        const newUser = {
            id: Date.now(),
            perms: 7,
            username: username,
            password: hashedPassword,
            CDN: {
                enabled: null,
                size: 0,
                content: [
                    {
                        id: 0,
                        path: '',
                        size: '',
                        access_token: '',
                        usage: [
                            {
                                date: '',
                                count: 0,
                            },
                        ],
                    },
                ],
            },
            TODO: [
                {
                    enabled: null,
                    list: [{}],
                },
            ],
            CYBERCRAFT: [
                {
                    enabled: null,
                    skin: null
                }
            ],
            ASLIMOSIQI: [
                {
                    enabled: null,
                    favourites: [{}],
                    playlists: [{}]
                }
            ]
        };

        // Push to db and add indentations to make the db readable
        db.X.push(newUser);
        fs.writeFileSync(dbpath, JSON.stringify(db, null, 4));

        // Return a success message
        res.sendStatus(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/verify', (req, res) => {
    try {
        const { token } = req.body;

        // Verify the provided token
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            // Token verification failed (invalid token or expired)
            if (err) { return res.status(401).json({ error: 'Invalid token' }); }

            // Token is valid, find the user associated with the token (if any)
            const user = db.X.find(user => user.id === decoded.id);

            // User not found
            if (!user) { return res.status(404).json({ error: 'User not found' }); }

            // Token is valid, and user is found
            res.json({ user });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
