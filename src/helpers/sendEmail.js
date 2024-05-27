const nodemailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const ejs = require('ejs');

module.exports = {
    async sendMailRegister(template,payload) {
        const config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_CREDENTIAL
            }
        };

        const transporter = nodemailer.createTransport(config);
        transporter.use('compile', inlineBase64());

        ejs.renderFile(__dirname+'/template/'+template+'.ejs', payload, {}, function(err, str) {
            // str has the html content with the replaced values from ‘payload’
            if (!err) {
                const mail = {
                    to: payload.email,
                    from: process.env.EMAIL,
                    subject: payload.title,
                    html: str
                };
                transporter.sendMail(mail);
            }else{
                console.log("error sending email : ",err)
            }
        })
    }
};