const express = require('express');
const authV1Router =  require('./auth/auth.router.js');
const planRouter = require('./admin/plans.js');
const premiumRouter = require('./premium_routes/premium.js');
const userRouter = require("./user/user.js");
const { premium_user } = require('../middlewares/checkRole.js');
const authorize = require("../middlewares/authorize.js");
const subscriptionController = require('../controllers/subscription.controller.js');
const router = express.Router();

router.use('/auth', authV1Router);
router.use('/premium',[authorize, premium_user], premiumRouter);
router.use('/admin/plans',planRouter );
router.use('/user', userRouter)
router.post("/webhook", subscriptionController.subscriptionWebhook)


module.exports = router;