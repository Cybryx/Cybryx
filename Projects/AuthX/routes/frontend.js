const express = require('express');
const path = require('path');
const fs = require('fs');
const marked = require('marked');

const router = express.Router();

router.use(express.static(path.join(__dirname, '..', "views")));

router.get('/', (req, res) => {
    const readmePath = path.join(__dirname, '..', 'ReadMe.md');

    fs.readFile(readmePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('An error occurred while reading the README file.');
        }

        const readmeHTML = marked.parse(data);

        const htmlTemplate = `
            <!DOCTYPE html>
<html>
<head>
    <title>CybryX - AuthX Documentation</title>
    <link rel="stylesheet" href="styles.css"> <!-- Your CSS file -->
    <meta name="theme-color" content="#121212" />
</head>
<body class="dark-theme">
    <div class="dark-mode-toggle">
        <div class="dark-mode">☀️</div>
    </div>
    <div class="container">
        <div class="header">
            <h1>CybryX</h1>
            <p>Under heavy construction, pages change frequently.</p>
        </div>
        <div id="content">
        <div id="content">${readmeHTML}</div>
        </div>
    </div>
    <script src="script.js"></script> <!-- Your JavaScript file -->
</body>
</html>

        `;

        res.send(htmlTemplate);
    });
});

module.exports = router;
