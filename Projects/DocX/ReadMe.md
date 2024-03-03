# DocX App Documentation

DocX is a collaborative document editing application with a client-server architecture. This README provides information on setting up and running the application.

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Server API](#server-api)
- [Configuration](#configuration)
- [License](#license)

## Introduction
DocX allows users to collaboratively edit documents in real-time using Socket.IO for communication. The server is built with Node.js and Express, while the client utilizes Socket.IO for seamless data synchronization.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Cybryx/Cybryx/tree/master/Projects/DocX
   cd DocX/client
   ```
2. Install client dependencies and build:
    ```
    npm install && npm build
    ```
3. Start the server:
    ```
    cd ../server
    npm install && npm run prod
    ```

## Usage

- Access the application in your browser and start editing documents collaboratively.
- The server saves documents in a `db.json` file.
- Custom middleware adds an 'X-Powered-By' header to the responses.

> Note: Rename the `db_demo.json` file and access the `/documents/Get_Started` endpoint in browser for demo.

## Customization

The application allows for easy customization:

- **Middleware:** Check and modify the `X` middleware in `server.js` for custom headers.
- **Static Files:** Serve additional static files by updating the `express.static` middleware.
- **Document Data:** Adjust the `defaultValue` variable in `server.js` for the initial document state.

> The frontend can be fully customized inside the client folder.

## Server API

The server provides the following API:

- **GET /:** Serve the main HTML page.
- **GET /*:** Serve the main HTML page for all other routes.
- **Socket.IO Events:**
  - `get-document`: Retrieve a document.
  - `load-document`: Load a document into the editor.
  - `send-changes`: Broadcast changes made by a user.
  - `save-document`: Save document changes.

## Configuration

Server configuration is stored in `config.json`. Update the file as needed.

```json
{
  "projects": {
    "Docs": {
      "port": YOUR_PORT_NUMBER
    }
  }
}
