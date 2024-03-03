# AuthX REST API Documentation

Welcome to the AuthX REST API documentation! AuthX is a versatile API for authentication, managing user contacts, and handling various services. This guide will walk you through integrating and using the AuthX API in your application.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Authentication](#authentication)
   - [User Registration](#user-registration)
   - [User Login](#user-login)
   - [Token Verification](#token-verification)
4. [Services](#services)
   - [Service Status](#service-status)
   - [Update Service Status](#update-service-status)
5. [Middleware](#middleware)
   - [Username Validity Middleware](#username-validity-middleware)
   - [Authentication Middleware](#authentication-middleware)

## Introduction

The AuthX REST API provides endpoints for user authentication, contact management, and various services. It is designed to be flexible, allowing you to integrate authentication and other features into your application with ease.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following prerequisites:

- Node.js and npm installed on your system.
- Basic understanding of REST APIs and HTTP requests.

### Installation

1. Clone the AuthX repository from GitHub:

>git clone https://github.com/CybryX/CybryX &&
>cd Projects/AuthX


2. Install the project dependencies:

>npm install


3. Start the AuthX server:

>npm start


## Authentication

The AuthX API offers endpoints for user registration, login, and token verification.

### User Registration

Register a new user account.

- **Endpoint:** `POST /auth/register`
- **Request Body:**
   - `username`: Desired username.
   - `password`: User's password.
- **Response:**
   - Status Code: 201 if successful.
   - JSON object with a success message.
- **Errors:**
   - Status Code: 409 if the username is already taken.
   - Status Code: 400 if the username contains illegal characters.

### User Login

Log in a user and receive a JWT token.

- **Endpoint:** `POST /auth/login`
- **Request Body:**
   - `username`: User's username.
   - `password`: User's password.
- **Response:**
   - Status Code: 200 if successful.
   - JSON object containing the JWT token.
- **Errors:**
   - Status Code: 404 if the user is not found.
   - Status Code: 401 if the credentials are invalid.

### Token Verification

Verify a JWT token and retrieve user details.

- **Endpoint:** `POST /auth/verify`
- **Request Body:**
   - `token`: JWT token for verification.
- **Response:**
   - Status Code: 200 if successful.
   - JSON object containing user details associated with the token.
- **Errors:**
   - Status Code: 401 for invalid tokens.
   - Status Code: 404 if the user associated with the token is not found.

## Services

The AuthX API offers endpoints to manage various services' statuses.

### Service Status

Get the enabled status of a specific service for an authenticated user.

- **Endpoint:** `GET /services/status/:service`
- **Request Parameter:**
   - `service`: Name of the service (e.g., 'TODO', 'CDN').
- **Response:**
   - Status Code: 200 if successful.
   - JSON object containing the service status and associated data.
- **Errors:**
   - Status Code: 404 if the user or service is not found.

### Update Service Status

Update the enabled status of a specific service for an authenticated user.

- **Endpoint:** `PATCH /services/status/:service/:update`
- **Request Parameters:**
   - `service`: Name of the service (e.g., 'TODO', 'CDN').
   - `update`: New status value ('true', 'false', or 'null').
- **Response:**
   - Status Code: 200 if successful.
   - JSON object with a success message.
- **Errors:**
   - Status Code: 404 if the user or service is not found.
   - Status Code: 400 for invalid update values.

## Middleware

Custom middleware enhances the AuthX API's functionality and security.

### Username Validity Middleware

Check the validity of a username.

- **Middleware Function:** `UsernameValidity(username)`
- **Parameters:**
   - `username`: The username to be validated.
- **Returns:**
   - `true` if the username is valid (no illegal characters).
   - `false` if the username contains illegal characters.

### Authentication Middleware

Check if a user is authenticated using JWT tokens.

- **Middleware Function:** `isAuthenticated(req, res, next)`
- **Parameters:**
   - `req`: The Express request object.
   - `res`: The Express response object.
   - `next`: The next middleware function in the chain.
- **Functionality:**
   - Extracts and verifies the token.
   - Attaches the decoded user data to `req.user`.
- **Response:**
   - If successful, continues to the next middleware.
   - If the token is missing or invalid, sends an error response.

---
