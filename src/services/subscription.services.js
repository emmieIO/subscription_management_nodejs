const {Plan, Subscription} = require("../models");
const paymentService = require("./payment.service");
const userService = require("./user.services")
const planService = require("./plan.service");




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
                plan:plan.plan_code
            });
            await Subscription.create({
                user_id: user.customer_id,
                plan_id: plan.plan_code,
                paystack_id: response.data.subscription_code,
                status: response.data.status,
                start_date: response.data.createdAt,
                next_billing_date: response.data.next_payment_date
            })
            return response;
        }catch(e){
            throw e
        }
    }
}

module.exports = new SubscriptionService();