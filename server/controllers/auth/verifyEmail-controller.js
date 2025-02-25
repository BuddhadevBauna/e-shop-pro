import User from "../../models/user-model.js";
import { generateMailOptions, getExpiritationTime, sendEmail } from "../../utils/mail.js";

const generateVerifyCode = () => {
    return Math.floor(Math.random() * 900000) + 100000; //6-digit number
}

const generateMailBody = (verificationCode) => {
    return `<p>Thank you for registering!</p>
    <p>Your verification code is: <strong>${verificationCode}</strong></p>
    <p>Please enter this code to complete your verification.</p>
    <p>This code is valid for 10 minutes.</p>`;
}

const sendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({email});        
        if (!user) return res.status(404).json({ message: "User not found" });

        //save the code in database 
        const verificationCode = generateVerifyCode();
        const codeExpireAt = getExpiritationTime();
        user.verificationCode = verificationCode;
        user.verificationCodeExpireAt = codeExpireAt;
        await user.save();

        const senderEmail = 'baunabuddhadevnew2021@gmail.com';
        const subject = 'Verify Your Email Address';
        const body = generateMailBody(verificationCode);
        const mailOptions = generateMailOptions(senderEmail, email, subject, body);
        await sendEmail(mailOptions);
        res.status(200).json({ message: "Verification code send successful" });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: "Verification code send unsuccessful" });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if(!verificationCode) return res.status(400).json({message: "Verification code reuired"})

        const user = await User.findOne({
            email: email,
            verificationCode: verificationCode,
            verificationCodeExpireAt: {$gt: Date.now()}
        });
        if(!user) return res.status(400).json({ message: 'Invalid or expired code.' });
        
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpireAt = null;
        await user.save();
        return res.status(200).json({ 
            message: 'Verification successful.',
            jwtToken: user.generateToken(),
        });
    } catch (error) {
        res.status(500).json({ message: 'Verification failed.' });
    }
}

export { sendVerificationEmail, verifyEmail };