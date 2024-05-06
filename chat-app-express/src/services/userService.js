const jwt = require('jsonwebtoken');

var decodeToken = (userDetails) =>{
   return jwt.decode(token);
}

module.exports = decodeToken