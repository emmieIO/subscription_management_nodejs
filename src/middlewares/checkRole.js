const { error } = require("../utils/response")

const checkRole = (roles, options={message:"Access denied"}) =>{
    return (req, res, next) => {
        if(!req.user || !roles.includes(req.user.role)){
            return error(res,options.message, 403)
        }
        next()
    }
}

module.exports = {
    admin : checkRole(['admin']),
    free_user : checkRole(['admin', 'free_user', 'premium_user']),
    premium_user: checkRole(['admin', 'premium_user'],{message:"Access denied to premium content"})
}