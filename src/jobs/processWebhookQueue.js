const Queue = require('bull');
const webhookQueue = new Queue("webhookQueue");
const {User} = require('../models/');
const { sendEmail } = require('../utils/mailer/mail');
webhookQueue.process(async(job)=>{
    try{
        const res = job.data
        customer_code = res.data.customer.customer_code
        const customer = await User.findOne({where:{customer_code}})
        if(!customer){
            throw new Error("Customer not found");
        }
            // do something with event
        switch(res.event){
            case "charge.success":
                await customer.assignRole('premium_user');
                sendEmail(
                    customer.email,
                    "Account Upgrade",
                    "Your account has been upgraded to premium",
                );
                break;

            case 'subscription.create':
                // assign premium role to user
                await customer.assignRole('premium_user');
                sendEmail(
                    customer.email,
                    "Account Upgrade",
                    "Your Subscription to premuim was successful",
                )
                break;

            case "subscription.disable":
                // remove premium role from user
                await customer.assignRole('free_user')
                sendEmail(
                    customer.email,
                    "Account Downgrade",
                    "Your Subscription to premuim was cancelled",
                )

            case 'invoice.created':
                 // Handle invoice created event (e.g., send renewal reminder)
                // This could be handled with additional functionality
                break;
            case "invoice.payment_failed":
                // send a reminder of payment failed / revert user role
                customer.assignRole('free_user')
                break;

                default:
                    console.log(`Unhandled event: ${res.event}`);
        }
    }catch(e){
        console.error("Error processing job:", e.message);
        throw e
    }





})

module.exports = webhookQueue;