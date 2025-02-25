import User from "../../models/user-model.js";
import crypto from "crypto";
import { generateMailOptions, getExpiritationTime, sendEmail } from "../../utils/mail.js";

const generateResetToken = () => {
    return crypto.randomBytes(32).toString('hex');
}

const generateResetTokenHash = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}

const generateResetURL = (resetToken) => {
    return `http://localhost:5173/account/password/reset/${resetToken}`;
}

const generateMailBody = (resetUrl) => {
    return `<p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link is valid for 10 minutes.</p>`;
}

const sendResetPasswordLink = async (req, res) => {
    try {
        let {email} = req.body;

        if(!email) return res.status(404).json({message: "Email required."});

        email = email.trim();

        const user = await User.findOne({email});
        if(!user) res.status(404).json({message: "User not found."});

        const resetToken = generateResetToken();
        const resetTokenHash = generateResetTokenHash(resetToken);
        // console.log(resetToken, resetTokenHash);
        const linkExpireAt = getExpiritationTime();
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpires = linkExpireAt;
        await user.save();
        
        const link = generateResetURL(resetToken);
        const senderEmail = 'baunabuddhadevnew2021@gmail.com';
        const subject = 'Password Reset Request';
        const body = generateMailBody(link);
        const mailOptions = generateMailOptions(senderEmail, email, subject, body);
        await sendEmail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent, please check your inbox.' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending password reset email.' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const {resetToken} = req.params;
        // console.log(resetToken);

        const {password} = req.body;
        if(!password) return res.status(404).json({message: "Password required."});

        const resetTokenHash = generateResetTokenHash(resetToken);
        
        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) return res.status(400).json({ message: 'Invalid or expired token.' });

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
        res.status(200).json({ message: 'Password reset successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password.' });
    }
}

export {sendResetPasswordLink, resetPassword};