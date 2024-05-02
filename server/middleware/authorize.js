const jwt = require('jsonwebtoken');

const authorize = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    const tokenParts = token.split(' ');
    const tokenValue = tokenParts[1];

    try {
      const decodedToken = jwt.verify(tokenValue, 'secretkey');
      req.user = decodedToken; 

      if (req.user.role !== role) {
        return res.status(403).json({ message: 'Unauthorized - Insufficient role' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
  };
};

module.exports = authorize;
