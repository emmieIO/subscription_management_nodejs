const express = require("express");
const subscriptionController = require("../../controllers/subscription.controller");
const authorize = require("../../middlewares/authorize");

const router = express.Router()

router.post('/upgrade-account',[authorize], subscriptionController.createSubscription);

module.exports = router;