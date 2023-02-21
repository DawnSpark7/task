const jwt = require('jsonwebtoken');

const validateJWTToken = async (token) => {
  
    if (!token) {
      return {
        status: 0,
        message: 'Token Invalid'
      };
    }
  
    const result = await jwt.verify(token, 'Test#Secret@123', (err, user) => {
      if (err) {
        console.log("53");
        return {
            status: 0,
            message: 'Token Expired'
        };
      } else {
        console.log("59");
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