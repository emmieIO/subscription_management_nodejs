const subscriptionService = require("../services/subscription.services");
const { success } = require("../utils/response");

class PlanController{
    async createPlan(req, res, next) {
        try {
            const { name, amount, interval } = req.body;
            const plan = await subscriptionService.createSubscriptionPlan({name, amount, interval})
            success(res, plan, `${name} ${interval} subcription Created`, 201);
        }catch(e){
            next(e)
        }
    }
}

module.exports = new PlanController();