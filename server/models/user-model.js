import mongoose from "mongoose";
import bcrypt from "bcrypt";

const useSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

//secure the password with the bcrypt
useSchema.pre('save', async function () {
    // console.log("pre method", this);
    const user = this;

    if (!user.isModified("password")) {
        next();
    }

    try {
        // hash the password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});
//compare password using bcrypt
useSchema.methods.comparePassword = async function(password) {
    try {
        // console.log(this);
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.error(error);
    }
}

//define model or collection name
const User = new mongoose.model("User", useSchema);

export default User;