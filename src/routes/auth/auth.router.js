const express = require('express');
const validate = require('../../middlewares/validate.js');
const registerValidator = require('../../utils/validators/register.validator.js');
const Authentication = require('../../controllers/auth.controller.js');
const loginValidator = require('../../utils/validators/login.validator.js');


const router = express.Router();


router.post('/login', loginValidator, validate, Authentication.login);
router.post('/register', registerValidator, validate, Authentication.register);

module.exports = router;