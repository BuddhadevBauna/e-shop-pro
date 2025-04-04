import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    phone : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    role: { type: [String], enum: ["admin", "customer"], default: ["customer"] },
    verificationCode : {type: Number, default: null},
    verificationCodeExpireAt: {type: Date, default: null},
    isVerified: {type: Boolean, default: false},
    resetPasswordToken: {type: String, default: null},
    resetPasswordExpires: {type: Date, default: null},
    addresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }]
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const user = this;
    // console.log(this);
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
    } catch (error) {
        console.log(error);
    }
});

userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.generateToken = function() {
    try {
        return jwt.sign(
            {
                id: this._id,
                email: this.email,
                phone: this.phone,
                name: this.name,
                role: this.role
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1h'
            }
        );
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model('User', userSchema);
export default User;