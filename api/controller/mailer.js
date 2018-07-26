'use strict';
const nodemailer = require('nodemailer');
const config = require('../config/config.js');

function mailerController() {}

module.exports.SendEMail = function (toEmail, subject, body, attachment) {

    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        service: 'Gmail',
        auth: {
            user: config.email.accountFrom,
            pass: config.email.accountPassword
        }
    });

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: config.email.accountFrom, // sender address
        to: toEmail, // list of receivers
        subject: subject, // Subject line
        //text: 'Hi Test Email Node', // plaintext body
        html: body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error');
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
}