const Queue = require("bull")
const {User} = require("../models/")
const customerServices = require("../services/customer.services.js")
const { sendEmail } = require("../utils/mailer/mail.js")
const customerProcessQueue = new Queue("customerQueue",{
    redis: {
        host: 'localhost',
        port: 6379,
    },
    settings:{
        retryProcessDelay: 5000,
    }
})


customerProcessQueue.process(async (job,done) => {
    try{const { id } = job.data
    const customerService = new customerServices()
    const user = await User.findByPk(id)
    const customerResponse = await customerService.createCustomer(user)
    user.customer_id = customerResponse.data.customer_code
    await user.save()
    sendEmail(
        user.email,
        "Customer created successfully",
        "Your customer code is: " + customerResponse.data.customer_code
    )
    done(null, customerResponse.message)
    }
    catch(e){
        done(e)
    }
})

customerProcessQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result ${result}`);
});

customerProcessQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error ${err}`);
});

module.exports = customerProcessQueue