const jwt = require('jsonwebtoken');

const validateJWTToken = async (token) => {
  
    if (!token) {
      return {
        status: 0,
        message: 'Token Invalid'
      };
    }
  
    const result = jwt.verify(token, 'Test#Secret@123', (err, user) => {
      if (err) {
        return {
          status: 0,
          message: 'Token Expired'
        };
      } else {
        return {
          status: 1,
          message: 'Valid Token'
        };
      }
    });

    return result;
}

module.exports = {
    validateJWTToken
}