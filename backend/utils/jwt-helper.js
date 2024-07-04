const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, 'NewLife', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'NewLife');
};

module.exports = {
  generateToken,
  verifyToken,
};
