const {body} = require("express-validator");
const {User} = require("../../models");

 const registerValidator = [
    body('firstname').isString().notEmpty().withMessage('Firstname is required'),
    body('lastname').isString().notEmpty().withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Enter a vaild email')
    .isString().notEmpty().withMessage('Email is required'),
    body('email').custom(async (val)=>{
        const existingUser = await User.findOne({where:{email:val}})
        if(existingUser !== null){
            throw new Error('Email is already in use')
        }
    }),
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    body('password_confirmation').isString().notEmpty().withMessage('password confirmation is required'),
    body('password_confirmation').custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match password');
        }
        return true
    })
];

module.exports = registerValidator;