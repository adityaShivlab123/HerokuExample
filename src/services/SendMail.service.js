import nodemailer from 'nodemailer';
require('dotenv').config();

// send mail with defined transport object
const sMail = (email, subject, html) => {

    var sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
    });

    var mail = {
        from: process.env.USER,
        subject: subject,
        to: email,
        html: html
    };

    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log(" email sent !");
            console.log("Email sent successfully: "
                + info.response);
        }
    });
}
export { sMail }

