const {Plan, Subscription} = require("../models");
const paymentService = require("./payment.service");
const userService = require("./user.services")
const planService = require("./plan.service");
const logSubscriptionQueue = require("../jobs/logSubcriptionQueue");



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
            logSubscriptionQueue.add({
                customer_code:user.customer_id,
                plan_code:plan.id
            })
            return true;
        }catch(e){
            console.error('Error subscribing user:', e);
            throw e
        }
    }
}

module.exports = new SubscriptionService();