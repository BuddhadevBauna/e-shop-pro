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
    reservedStock: { type: Number, default: 0 },
    availabilityStatus: { type: String, required: true },
    maxOrderQuantity: { type: Number, default: 10 },
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
}, { timestamps: true });

productSchema.pre('save', function (next) {
    if (this.isModified('mrp') || this.isModified('discountPercentage')) {
        this.salePrice = Math.round(this.mrp * (1 - this.discountPercentage / 100));
    }
    if (this.isModified('stock')) {
        this.maxOrderQuantity = this.stock > 10 ? 10 : this.stock;
        this.availabilityStatus = this.stock > 0 ? "In Stock" : "Out Of Stock";
    }
    next();
});

productSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    // console.log(update);

    const updateFields = {};
    if ('mrp' in update || 'discountPercentage' in update) {
        // console.log(this.getQuery());
        const docToUpdate = await this.model.findOne(this.getQuery());
        // console.log(docToUpdate);
        if (docToUpdate) {
            const mrp = update.mrp ?? docToUpdate.mrp;
            const discountPercentage = update.discountPercentage ?? docToUpdate.discountPercentage;
            // console.log(mrp, discountPercentage);
            updateFields.salePrice = Math.round(mrp * (1 - discountPercentage / 100));
        }
    }
    if ('stock' in update) {
        updateFields.maxOrderQuantity = update.stock > 10 ? 10 : update.stock;
        updateFields.availabilityStatus = update.stock > 0 ? "In Stock" : "Out of stock";
    }

    if(Object.keys(updateFields).length > 0) {
        this.set(updateFields);
    }

    next();
});

const Product = new mongoose.model("Product", productSchema);
export default Product;