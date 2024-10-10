const {body, validationResult} = require('express-validator');

const loginValidator = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 6}).withMessage('Password is required')
];

module.exports = loginValidator;