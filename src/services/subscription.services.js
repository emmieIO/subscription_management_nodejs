const {Plan} = require("../models");
const paymentService = require("./payment.service");

class SubscriptionService {
    async createSubscriptionPlan(data) {
        try {
            const {name, amount, interval} = data
            const subscriptionPlan = await paymentService.createPaymentPlan({name, amount, interval});
            await Plan.create({
                name: subscriptionPlan.data.name,
                interval: subscriptionPlan.data.interval,
                amount: subscriptionPlan.data.amount,
                plan_code: subscriptionPlan.data.plan_code
            });
            return subscriptionPlan
        } catch (e) {
            throw e
        }
    }

    async subscribe(data){
        try{
            const response = await paymentService.intializePayment(data);
            return response;

        }catch(e){
            throw e
        }
    }
}

module.exports = new SubscriptionService();