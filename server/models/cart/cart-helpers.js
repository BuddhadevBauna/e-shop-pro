import calculateCartPrice from "./cart-calculation.js";
import Cart from "./cart-model.js";

const prepareCartDataForStock = (cart, productId, stockValue) => {
    const cartData = { user: cart.user };
    if (stockValue === 0) {
        cartData.isStockUpdate = true;
        cartData.items = cart.items
            .filter(item => item.product.toString() === productId.toString())
            .map(item => ({ product: item.product }));
    } else {
        cartData.skipOldValuesSubtraction = true;
        cartData.items = cart.items
            .filter(item => item.product.toString() === productId.toString())
            .map(item => ({ product: item.product, quantity: item.quantity }));
    }
    return cartData;
};

const prepareCartDataForDeletion = (cart, productId, isDeletion) => {
    const cartData = { user: cart.user };
    if (isDeletion) {
        cartData.isProductToBeDelete = true;
        cartData.items = cart.items
            .filter(item => item.product.toString() === productId.toString())
            .map(item => ({ product: item.product }));
    } else {
        cartData.skipOldValuesSubtraction = true;
        cartData.items = cart.items
            .filter(item => item.product.toString() === productId.toString())
            .map(item => ({ product: item.product, quantity: item.quantity }))
    }
    return cartData;
};

const generateBulkOptions = async (carts, productId, prepareDataFn, conditionValue) => {
    return await Promise.all(carts.map(async (cart) => {
        const cartData = prepareDataFn(cart, productId, conditionValue);
        const result = await calculateCartPrice(cartData);
        return {
            updateOne: {
                filter: { _id: cart._id },
                update: {
                    $set: {
                        cartFinalMRP: result.cartFinalMRP,
                        cartFinalDiscount: result.cartFinalDiscount,
                        cartFinalPrice: result.cartFinalPrice
                    }
                }
            }
        };
    }));
};

export const updateCartOnStockChange = async (productId, stock) => {
    const carts = await Cart.find({ "items.product": productId });
    if (carts && carts.length > 0) {
        const bulkOperations = await generateBulkOptions(carts, productId, prepareCartDataForStock, stock);
        if (bulkOperations && bulkOperations.length > 0) {
            await Cart.bulkWrite(bulkOperations);
        }
    }
}
export const updateCartOnProductDeletion = async (productId, isDeleted) => {
    const carts = await Cart.find({ "items.product": productId });
    if (carts && carts.length > 0) {
        const bulkOperations = await generateBulkOptions(carts, productId, prepareCartDataForDeletion, isDeleted);
        if (bulkOperations && bulkOperations.length > 0) {
            await Cart.bulkWrite(bulkOperations);
        }
    }
}
export const updateCartOnDiscountPercentageOrMrpChange = async (productId) => {
    const carts = await Cart.find({ "items.product": productId });
    const bulkOperations = await Promise.all(carts.map(async (cart) => {
        const cartData = {
            user: cart.user,
            isProductPriceUpdate: true,
            items: cart.items
                .filter(item => item.product.toString() === productId.toString())
                .map(item => ({ product: item.product, quantity: item.quantity }))
        };
        const result = await calculateCartPrice(cartData);
        // console.loforg(result);
        return ({
            updateOne: {
                filter: { _id: cart._id },
                update: {
                    $set: {
                        'items.$[elem].totalMRP': result.items[0].totalMRP,
                        'items.$[elem].totalDiscount': result.items[0].totalDiscount,
                        'items.$[elem].totalSalePrice': result.items[0].totalSalePrice,
                        cartFinalMRP: result.cartFinalMRP,
                        cartFinalDiscount: result.cartFinalDiscount,
                        cartFinalPrice: result.cartFinalPrice
                    }
                },
                arrayFilters: [{ "elem.product": productId }]
            }
        });
    }));
    if (bulkOperations && bulkOperations.length > 0) {
        await Cart.bulkWrite(bulkOperations);
    }
}