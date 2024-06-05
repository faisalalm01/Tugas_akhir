const nodemailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const ejs = require('ejs');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     secure: false,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_CREDENTIAL,
//     },
//   });
  
//   // Fungsi untuk membuat token OTP 6 digit
//   const generateOtp = () => {
//     return crypto.randomInt(100000, 999999).toString();
//   };

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
    //   sendVerification : async (data) => {
    //     try {
    //       console.log("sending email...");
    //       const otp = generateOtp();
    //       const payload = {
    //         email: data.email,
    //         urlLink: otp,  // Ini akan menjadi kode OTP 6 digit
    //         name: data.username,
    //         title: "Email Verification"
    //       };
      
    //       const mailOptions = {
    //         from: process.env.EMAIL_USER,
    //         to: data.email,
    //         subject: 'Email Verification',
    //         text: `Hello ${data.username}, please verify your email using this OTP: ${otp}`,
    //       };
      
    //       await transporter.sendMail(mailOptions);
    //       console.log("Email sent successfully");
          
    //       // Simpan OTP ke database atau memori untuk verifikasi nanti
    //       // Contoh: simpan ke database atau Redis
      
    //       return otp;
    //     } catch (error) {
    //       console.error("error sending email", error);
    //     }
    //   }
};