const {Plan} = require("../models");
const paymentService = require("./payment.service");
const userService = require("./user.services")
const planService = require("./plan.service")
const crypto = require("crypto")
const secret = process.env.PAYSTACK_SECRET_KEY
class SubscriptionService {
    constructor(){
        this.paymentService = new paymentService();
        this.userService = new userService();
        this.planService = new planService();
    }
    async createSubscriptionPlan(data) {
        try {
            const {name, amount, interval} = data
            const subscriptionPlan = await this.paymentService.createPaymentPlan({name, amount, interval});
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
            const {userId, planId} = data
            const user = await this.userService.getAuthenticatedUser(userId)
            const plan = await this.planService.getPlansByPlanCode(planId)
            const response = await this.paymentService.subscribe({
                customer: user.customer_id,
                plan: plan.plan_code
            });
            return response;

        }catch(e){
            console.error('Error subscribing user:', e);
            throw e
        }
    }

    webhook(){
        const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
        if(hash !== req.headers['x-paystack-signature']) {
            return res.status(401).json({error: 'Invalid signature'})
        }
        const event = req.body;
    }


}

module.exports = new SubscriptionService();