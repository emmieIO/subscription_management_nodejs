const SubscriptionServices = require("../services/subscription.services");
const {success} = require("../utils/response")
const crypto = require("crypto")
const secret = process.env.PAYSTACK_SECRET_KEY
const webhookQueue = require("../jobs/processWebhookQueue");
class SubscriptionController {

    async createSubscription(req, res, next) {
        try{
            const { userId } = req.user;
            const { planId } = req.body;
            const subscription = await SubscriptionServices.subscribe({ userId, planId });
            res.json(subscription).status(201);
        }catch(e){
            next(e)
        }

    }

    async subscriptionWebhook(req,res,next){
        try {
            const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
            if(hash !== req.headers['x-paystack-signature']) {
                return res.status(401).json({error: 'Invalid signature'})
            }
            webhookQueue.add({reqBody})
            success(res, message="Webhook recieved")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SubscriptionController();
