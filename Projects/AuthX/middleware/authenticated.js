const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'CybryX'; // Replace this with your actual secret key

// Middleware to check if the user is authenticated (using the JWT token)
function isAuthenticated(req, res, next) {
  // Get the token from the request header or body
  const token = req.cookies || req.header('Authorization') || req.body.token || '';

  // Check if the token is present
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // Verify the provided token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      // Token verification failed (invalid token or expired)
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'Token expired' });
        }
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Token is valid, find the user associated with the token (if any)
      const user = db.X.find(user => user.id === decoded.id);

      // User not found
      if (!user) { return res.status(404).json({ error: 'User not found' }); }

      // Token is valid, and user is found
      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { isAuthenticated };