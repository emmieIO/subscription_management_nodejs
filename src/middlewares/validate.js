const { validationResult } = require("express-validator");


const validate = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = validationErrors.array()
        errors = errors.map(error=>{
            return {
                field: error.path,
                message: error.msg
            };
        })
        return res.status(422).json({errors});
    }
    next();
}

module.exports = validate;