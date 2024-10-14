const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
var transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD
    }
});

module.exports ={
    sendEmail: function (email, subject, message) {
        transport.sendMail({
            from: "Nodeflix",
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
