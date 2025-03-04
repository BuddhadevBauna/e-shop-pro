import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    categoryType: {type: String, required: true, unique: true},
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
});

const Category = new mongoose.model("Category", categorySchema);

export default Category;