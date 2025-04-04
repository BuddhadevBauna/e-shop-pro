import Cart from "./cart-model.js";
import Product from "../product-model.js";

const calculateCartPrice = async (cartData) => {
    const existingCart = await Cart.findOne({ user: cartData.user });
    // console.log(existingCart);

    let cartFinalMRP = existingCart ? existingCart.cartFinalMRP : 0;
    let cartFinalDiscount = existingCart ? existingCart.cartFinalDiscount : 0;
    let cartFinalPrice = existingCart ? existingCart.cartFinalPrice : 0

    for (let item of cartData.items) {
        const product = await Product.findById(item.product);
        if (!product) continue; // Skip if product not found

        if (cartData.isItemToBeDelete) {
            cartData.skipOldValuesSubtraction = product.isDeleted || product.stock === 0;
        } else if (cartData.isProductPriceUpdate) {
            cartData.skipOldValuesSubtraction = product.isDeleted;
        } else if (cartData.isStockUpdate) {
            cartData.skipOldValuesSubtraction = product.isDeleted;
        } else if (cartData.isProductToBeDelete) {
            cartData.skipOldValuesSubtraction = product.stock === 0;
        }

        // Subtract old values if product exists in the cart and 
        // if skipOldValuesSubtraction not present in cartdata or skipOldValuesSubtraction is true in cartdata
        if (existingCart?.items?.length && !cartData.skipOldValuesSubtraction) {
            for (let cartItem of existingCart.items) {
                if (cartItem.product.toString() === item.product.toString()) {
                    cartFinalMRP -= cartItem.totalMRP;
                    cartFinalDiscount -= cartItem.totalDiscount;
                    cartFinalPrice -= cartItem.totalSalePrice;
                    break;
                }
            };
        }

        if (item.quantity) {
            // Recalculate new values
            item.totalMRP = product.mrp * item.quantity;
            item.totalDiscount = Math.round(item.totalMRP * (product.discountPercentage / 100));
            item.totalSalePrice = item.totalMRP - item.totalDiscount;

            // Add new values
            if (!product.isDeleted && product.stock > 0) {
                cartFinalMRP += item.totalMRP;
                cartFinalDiscount += item.totalDiscount;
                cartFinalPrice += item.totalSalePrice;
            }
        }
    }

    return { cartFinalMRP, cartFinalDiscount, cartFinalPrice, items: cartData.items };
}

export default calculateCartPrice;