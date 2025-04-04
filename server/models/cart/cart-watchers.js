import Product from "../product-model.js";
import { updateCartOnDiscountPercentageOrMrpChange, updateCartOnProductDeletion, updateCartOnStockChange } from "./cart-helpers.js";

Product.watch().on('change', async (change) => {
    const { operationType, documentKey, updateDescription } = change;
    if (operationType !== "update") return;

    const productId = documentKey?._id;
    if (!productId) return;

    const updatedFields = updateDescription?.updatedFields;

    if ("discountPercentage" in updatedFields || "mrp" in updatedFields) {
        await updateCartOnDiscountPercentageOrMrpChange(productId);
    }

    if ("isDeleted" in updatedFields) {
        await updateCartOnProductDeletion(productId, updatedFields.isDeleted);
    }

    if ("stock" in updatedFields) {
        await updateCartOnStockChange(productId, updatedFields.stock);
    }
});