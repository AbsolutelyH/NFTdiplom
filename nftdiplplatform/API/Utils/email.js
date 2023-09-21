const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: processenv.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD,
    //     },
    // });

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zoila.cartwright@ethereal.email',
            pass: '5k7Fmnwxv9mPj4nMKa'
        },
    });

    const mailOptions = {
        from: "Ilya Lvutin <lvutin2001@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;