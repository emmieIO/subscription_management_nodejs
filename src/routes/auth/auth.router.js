const express = require('express');
const validate = require('../../middlewares/validate.js');
// import loginValidator from '../../utils/validators/login.validator.js';
const registerValidator = require('../../utils/validators/register.validator.js');
const Authenthication = require('../../controllers/auth.controller.js');
const loginValidator = require('../../utils/validators/login.validator.js');


const router = express.Router();


router.post('/login', loginValidator, validate, Authenthication.login);
router.post('/register', registerValidator, validate, Authenthication.register);

module.exports = router;