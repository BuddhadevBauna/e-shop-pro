import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true, },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    addressType: { type: String, enum: ["Home", "Work", "Other"], required: true},
    isDefault: { type: Boolean, default: false }
}, { timestamps: true } );

const Address = new mongoose.model('Address', addressSchema);
export default Address;