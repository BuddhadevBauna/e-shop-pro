import Category from "../../models/category-model.js";
import Product from "../../models/product-model.js";

const models = { Product, Category };

const deleteFeildFromCollection = async (req, res) => {
    try {
        const { modelName, fieldName } = req.body;

        const model = models[modelName];
        if (!model) {
            return res.status(400).json({ message: "Invalid model name provided." });
        }

        const result = await Product.updateMany(
            {},
            { $unset: { [fieldName]: "" } }
        );

        return res.status(200).json({
            message: `Deleted ${fieldName} field from ${result.modifiedCount} product(s).`
        });
    } catch (error) {
        return res.status(500).json({ message: "document Update unsuccessful." })
    }
}

export default deleteFeildFromCollection;