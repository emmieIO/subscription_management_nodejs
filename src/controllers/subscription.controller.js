const SubscriptionServices = require("../services/subscription.services");

class SubscriptionController {

    async createSubscription(req, res, next) {
        try{
            const { userId } = req.user;
            const { planId } = req.body;
            console.log(planId);
            const subscription = await SubscriptionServices.subscribe({ userId, planId });
            return subscription;
        }catch(e){
            next(e)
        }

    }
}

module.exports = new SubscriptionController();
