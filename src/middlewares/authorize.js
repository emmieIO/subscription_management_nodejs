const apiError = require("../utils/apiError");
const { error } = require("../utils/response");
const { verifyToken } = require("../utils/tokens");


const authorize = (req, res, next)=>{
    // verify token
    const token = req.header('x-auth-token');
    if(!token) error(res,'Access denied. No token provided.', 401)
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (ex) {

        error(res, ex.message, 400)
    }
}

module.exports = authorize;