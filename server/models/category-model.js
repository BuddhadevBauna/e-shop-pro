import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    subCategory: [subCategorySchema],
});

const Category = new mongoose.model("Category", categorySchema);

export default Category;