const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'CybryX'; // Replace this with your actual secret key

// Middleware to check if the user is authenticated (using the JWT token)
function isAuthenticated(req, res, next) {
  // Get the token from the request header or body
  const token = req.header('Authorization') || req.body.token || '';

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // Verify the provided token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        // Token verification failed (invalid token or expired)
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Token is valid, attach the decoded user data to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { isAuthenticated };
