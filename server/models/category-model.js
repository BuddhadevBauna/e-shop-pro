import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryType: {
        type: String,
        required: true
    },
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categoryType: {
        type: String,
        required: true,
        unique: true
    },
    subCategory: {
        type: [subCategorySchema],
        default: []
    }
});

const Category = new mongoose.model("Category", categorySchema);

export default Category;