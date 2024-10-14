const Queue = require('bull');
const {Subscription} = require("../models")
const logSubscriptionQueue = new Queue('logSubscriptionQueue',{
    redis: {
        port: 6379,
        host: 'localhost',
    },
    settings:{
        retryProcessDelay: 5000,
    }
});

logSubscriptionQueue.process(async (job, done)=>{
    try {
        const {customer_code, plan_code} = job.data;

        const response = await this.paymentService.subscribe({
            customer: customer_code,
            plan: plan_code
        });
        await Subscription.create({
            user_id: customer_code,
            plan_id: plan_code,
            paystack_id: response.data.subscription_code,
            status: response.data.status,
            start_date: response.data.createdAt,
            next_billing_date: response.data.next_payment_date
        })
        done(null, "success")
    } catch (error) {
        done(error)
    }
})

module.exports = logSubscriptionQueue