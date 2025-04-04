import Product from "../product-model.js";
import { handleProductAvailabilityNotification, handleStockAvailabilityNotification } from "./notification-handlers.js";

Product.watch().on("change", async (change) => {
    const { operationType, documentKey, updateDescription } = change;
    if (operationType !== "update") return;

    const productId = documentKey?._id;
    if (!productId) return;

    const updatedFields = updateDescription?.updatedFields;

    if ("isDeleted" in updatedFields && !updatedFields["isDeleted"]) {
        await handleProductAvailabilityNotification(productId);
    } else if ("stock" in updatedFields && updatedFields["stock"] !== 0) {
        await handleStockAvailabilityNotification(productId);
    }
});