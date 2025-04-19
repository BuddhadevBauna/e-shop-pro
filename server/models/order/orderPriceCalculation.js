import Order from "./order-model.js";
import Product from "../product-model.js";

const calculateOrderPrice = async (orderData) => {
    const existingorder = await Order.findOne({ userId: orderData.user });
    // console.log(existingorder);

    let orderFinalMRP = existingorder ? existingorder.orderFinalMRP : 0;
    let orderFinalDiscount = existingorder ? existingorder.orderFinalDiscount : 0;
    let orderFinalPrice = existingorder ? existingorder.orderFinalPrice : 0

    let validProducts = [];

    for (let item of orderData.products) {
        const product = await Product.findById(item.productId);
        if (!product) continue; // Skip if product not found

        if (
            (product.isDeleted) ||
            (product.stock === 0) ||
            (item.quantity && (item.quantity > (product.stock - product.reservedStock) || item.quantity > product.maxOrderQuantity))
        ) continue;

        if (
            (orderData.isItemToBeDelete && (product.isDeleted || product.stock === 0)) ||
            ((orderData.isProductPriceUpdate || orderData.isStockUpdate) && product.isDeleted) ||
            (orderData.isProductToBeDelete && product.stock === 0)
        ) orderData.skipOldValuesSubtraction = true;

        // Subtract old values if product exists in the order and 
        // if skipOldValuesSubtraction not present in orderdata or skipOldValuesSubtraction is true in orderdata
        if (existingorder?.products?.length && !orderData.skipOldValuesSubtraction) {
            for (let orderItem of existingorder.products) {
                if (orderItem.productId.toString() === item.productId.toString()) {
                    orderFinalMRP -= orderItem.totalMRP;
                    orderFinalDiscount -= orderItem.totalDiscount;
                    orderFinalPrice -= orderItem.totalSalePrice;
                    break;
                }
            };
        }

        if (item.quantity) {
            // Recalculate new values
            item.totalMRP = item.productSnapshot.mrp * item.quantity;
            item.totalDiscount = Math.round(item.totalMRP * (item.productSnapshot.discountPercentage / 100));
            item.totalSalePrice = item.totalMRP - item.totalDiscount;

            // Add new values
            orderFinalMRP += item.totalMRP;
            orderFinalDiscount += item.totalDiscount;
            orderFinalPrice += item.totalSalePrice;
        }
        validProducts.push(item);
    }

    return { ...orderData, orderFinalMRP, orderFinalDiscount, orderFinalPrice, products: validProducts };
}

export default calculateOrderPrice;