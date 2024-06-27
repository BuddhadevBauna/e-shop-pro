import mongoose from "mongoose";

const URI = process.env.MoONGODB_URI;
let isDBConnected = false;
const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        isDBConnected = true;
        console.log("Connection to db successful.");
    } catch (error) {
        console.log("Connection to db unsuccessful.", error);
        isDBConnected = false;
    }
}

export {isDBConnected};
export default connectDB;