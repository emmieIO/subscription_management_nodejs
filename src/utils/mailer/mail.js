const nodemailer = require("nodemailer");
const dotenv = require("dotenv");


dotenv.config();

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILER_USERNAME,
      pass: process.env.MAILER_PASSWORD,
    }
  });


module.exports ={
    sendEmail: function (email, subject, message) {
        transport.sendMail({
            from: "Nodeflix <nodeflix@subcription.com>",
            to: email,
            subject: subject,
            text:message
        },(err,info)=>{
            if(err){
                console.log(err);
            }
            console.log(info);
        })
    }
}
