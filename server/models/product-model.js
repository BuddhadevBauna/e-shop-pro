import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    mrp: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    brand: { type: String },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    returnPolicy: { type: String, required: true },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
}, {timestamps: true});

productSchema.virtual("availabilityStatus").get(function() {
    return this.stock > 0 ? "In Stock" : "Out of stock";
});

productSchema.virtual("salePrice").get(function () {
    return (this.mrp * (1 - this.discountPercentage / 100)).toFixed(2);
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = new mongoose.model("Product", productSchema);
export default Product;