const express = require('express');
const router = express.Router();
const  premiumController = require('../../controllers/premium.controller');

router.get("/", premiumController.showPremiumContent);

module.exports = router