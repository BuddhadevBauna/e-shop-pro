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
    salePrice: { type: Number },
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
    }],
    isDeleted: { type: Boolean, default: false }
}, {timestamps: true});

productSchema.pre('save', function(next) {
    if(this.isModified('mrp') || this.isModified('discountPercentage')) {
        this.salePrice = Math.round(this.mrp * (1 - this.discountPercentage / 100));
    }
    next();
});

productSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    // console.log(update);
    const isMRPUpdated = update.hasOwnProperty('mrp');
    const isDiscountUpdated = update.hasOwnProperty('discountPercentage');
    if(isMRPUpdated || isDiscountUpdated) {
        // console.log(this.getQuery());
        const docToUpdate = await this.model.findOne(this.getQuery());
        // console.log(docToUpdate);
        const mrp = isMRPUpdated ? update.mrp : docToUpdate.mrp;
        const discountPercentage = isDiscountUpdated ? update.discountPercentage : docToUpdate.discountPercentage;
        // console.log(mrp, discountPercentage);
        const salePrice = Math.round(mrp * (1 - discountPercentage / 100));
        this.set({salePrice: salePrice});
    }
    next();
});

productSchema.virtual("availabilityStatus").get(function() {
    return this.stock > 0 ? "In Stock" : "Out of stock";
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = new mongoose.model("Product", productSchema);
export default Product;