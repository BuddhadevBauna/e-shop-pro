import dotenv from 'dotenv';
dotenv.config();
import nodemailer from "nodemailer";

const getExpiritationTime = () => {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Set expiration to 10 minutes from now
    return expiresAt;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
// console.log(process.env.EMAIL);
// console.log(process.env.PASSWORD);

const generateMailOptions = (senderEmail, recieverEmail, subject, body) => {
    return {
        from: senderEmail,
        to: recieverEmail,
        subject: subject,
        html: body
    };
}

const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        // console.log(error);
        throw new Error("Email send unsuccessful.");
    }
}

export {getExpiritationTime, generateMailOptions, sendEmail};