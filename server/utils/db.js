import mongoose from "mongoose";

const URI = process.env.MoONGODB_URI;

const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Connection to db successful.");
    } catch (error) {
        console.log("Connection to db unsuccessful.", error);
    }
}

export default connectDB;