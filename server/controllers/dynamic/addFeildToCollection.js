import Category from "../../models/category-model.js";
import Product from "../../models/product-model.js";

const models = {Product, Category};

const addFeildToCollection = async (req, res) => {
    try {
        const {modelName, fieldName, defaultValue} = req.body;

        const model = models[modelName];
        if (!model) {
            return res.status(400).json({ message: "Invalid model name provided." });
        }

        const updateObject = {$set: {[fieldName]: defaultValue}};
        const result = await model.updateMany({}, updateObject);
        
        return res.status(200).json({message: `Updated ${result.modifiedCount} documents by adding ${fieldName}: ${defaultValue}.`})
    } catch (error) {
        return res.status(500).json({message: "document Update unsuccessful."})
    }
}

export default addFeildToCollection;