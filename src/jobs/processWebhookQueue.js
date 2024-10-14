const Queue = require('bull');
const webhookQueue = new Queue("webhookQueue");
const {User} = require('../models/');
const { sendEmail } = require('../utils/mailer/mail');
webhookQueue.process(async(job,done)=>{
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
                sendEmail(
                    customer.email,
                    "Renewal Reminder",
                    "Your subscription is about to expire and your card will be charged in 3days time",
                );
                break;
            case "invoice.payment_failed":
                // send a reminder of payment failed / revert user role
                customer.assignRole('free_user')
                sendEmail(
                    
                )
                break;

                default:
                    console.log(`Unhandled event: ${res.event}`);
        }
        done()
    }catch(e){
        console.error("Error processing job:", e.message);
        done(e)
    }





})

module.exports = webhookQueue;