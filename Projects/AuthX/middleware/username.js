// username.js
function UsernameValidity(username) {
  // Check if the username contains illegal characters
  if (username.includes('/') || username.includes('.') || username.includes(' ') ||
    username.includes('!') || username.includes('@') || username.includes('#') ||
    username.includes('$') || username.includes('%') || username.includes('^') ||
    username.includes('&') || username.includes('*') || username.includes('(') ||
    username.includes(')')) {
    return false;
  }

  return true;
}

module.exports = { UsernameValidity };
