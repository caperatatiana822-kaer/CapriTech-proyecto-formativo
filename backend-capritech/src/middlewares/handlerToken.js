const jwt = require('jsonwebtoken');
require('dotenv').config();
const Response  = require('../functions/response');

const validateToken = (req, res, next) => {
    const headers = req.headers['authorization'];
    const token = headers && headers.split(' ')[1];
    console.log("Token received:", token);
    if (!token || token === null || token === undefined) {
        let responseData = new Response(false, 'Token not provided', null);
        return res.status(401).json(responseData.json);
      
    }
    jwt.verify(token, process.env.JWT_KEY_SECRET, (err, user) => {
        if (err) {
            let responseData = new Response(false, 'Invalid token', null);
            return res.status(403).json(responseData.json);
        }
        req.user = user;
        next();
  });
};

module.exports = {
    validateToken
}