const express = require('express');
const authV1Router =  require('./auth/auth.router.js');

const router = express.Router();

router.use('/v1/auth', authV1Router);

module.exports = router;