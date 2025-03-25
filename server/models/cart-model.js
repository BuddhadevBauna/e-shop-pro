import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: { type: Number, required: true, min: 1 },
            totalMRP: { type: Number, default: 0 },
            totalDiscount: { type: Number, default: 0 },
            totalSalePrice: { type: Number, default: 0 }
        }
    ],
    cartFinalMRP: { type: Number, default: 0 },
    cartFinalDiscount: { type: Number, default: 0 },
    cartFinalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const calculateCartPrice = async (cartData) => {
    const existingCart = await mongoose.model("Cart").findOne({ user: cartData.user });
    // console.log(existingCart);

    let cartFinalMRP = existingCart ? existingCart.cartFinalMRP : 0;
    let cartFinalDiscount = existingCart ? existingCart.cartFinalDiscount : 0;
    let cartFinalPrice = existingCart ? existingCart.cartFinalPrice : 0

    for (let item of cartData.items) {
        const product = await mongoose.model("Product").findById(item.product);
        if (!product) continue; // Skip if product not found

        if (cartData.isItemToBeDelete) {
            cartData.skipOldValuesSubtraction = product.isDeleted;
        } else if(cartData.isProductPriceUpdate) {
            cartData.skipOldValuesSubtraction = product.isDeleted;
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
            if (!product.isDeleted) {
                cartFinalMRP += item.totalMRP;
                cartFinalDiscount += item.totalDiscount;
                cartFinalPrice += item.totalSalePrice;
            }
        }
    }

    return { cartFinalMRP, cartFinalDiscount, cartFinalPrice, items: cartData.items };
}

cartSchema.pre('save', async function (next) {
    // console.log(this);
    const result = await calculateCartPrice(this);
    // console.log(result);
    this.items = result.items;
    this.cartFinalMRP = result.cartFinalMRP;
    this.cartFinalDiscount = result.cartFinalDiscount;
    this.cartFinalPrice = result.cartFinalPrice;
    next();
});

cartSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const filter = this.getFilter();
    // console.log(update);
    // console.log(filter);
    if (filter['user']) {
        const items = { user: filter['user'] };
        if (update?.$push?.['items']) {
            const newItem = update.$push['items'];
            items.items = [newItem];
            // console.log(newItem, items);
            const result = await calculateCartPrice(items);
            // console.log(result);
            update.$push['items'] = result.items;
            this.set({
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        } else if (filter?.['items.product'] && update?.$set?.['items.$.quantity']) {
            items.items = [
                {
                    product: filter['items.product'],
                    quantity: update.$set['items.$.quantity']
                }
            ]
            // console.log(items);
            const result = await calculateCartPrice(items);
            // console.log(result);
            this.set({
                'items.$.totalMRP': result.items[0].totalMRP,
                'items.$.totalDiscount': result.items[0].totalDiscount,
                'items.$.totalSalePrice': result.items[0].totalSalePrice,
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        }
    }
    next();
});

cartSchema.pre('updateOne', async function (next) {
    const update = this.getUpdate();
    const filter = this.getFilter();
    if (filter['user']) {
        const items = { user: filter['user'] };
        if (update?.$pull?.['items']) {
            const itemToBedeleted = update.$pull['items'];
            items.items = [itemToBedeleted];
            items.isItemToBeDelete = true;
            const result = await calculateCartPrice(items);
            this.set({
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        } else if (update?.$push?.['items']?.$each) {
            items.items = update.$push['items'].$each;
            const result = await calculateCartPrice(items);
            // console.log(result);
            update.$push['items'].$each = result.items;
            this.set({
                cartFinalMRP: result.cartFinalMRP,
                cartFinalDiscount: result.cartFinalDiscount,
                cartFinalPrice: result.cartFinalPrice
            });
        }
    }
});

const Product = mongoose.model("Product");
Product.watch().on('change', async (change) => {
    // console.log(change);
    if (change.operationType === 'update') {
        const updateTerms = change.updateDescription?.updatedFields;
        if ('discountPercentage' in updateTerms || 'mrp' in updateTerms) {
            const productId = change.documentKey?._id;
            // console.log(productId);
            if (!productId) return;
            const carts = await mongoose.model('Cart').find({ "items.product": productId });
            for (let cart of carts) {
                // console.log(cart);
                const cartData = {
                    user: cart.user,
                    isProductPriceUpdate: true,
                    items: cart.items
                        .filter(item => item.product.toString() === productId.toString())
                        .map(item => ({ product: item.product, quantity: item.quantity }))
                };
                // console.log(cartData);
                const result = await calculateCartPrice(cartData);
                // console.loforg(result);
                await Cart.updateOne(
                    { _id: cart._id },
                    {
                        $set: {
                            'items.$[elem].totalMRP': result.items[0].totalMRP,
                            'items.$[elem].totalDiscount': result.items[0].totalDiscount,
                            'items.$[elem].totalSalePrice': result.items[0].totalSalePrice,
                            cartFinalMRP: result.cartFinalMRP,
                            cartFinalDiscount: result.cartFinalDiscount,
                            cartFinalPrice: result.cartFinalPrice
                        }
                    },
                    { arrayFilters: [{ "elem.product": productId }] }
                )
            }
        }
        if ('isDeleted' in updateTerms) {
            const productId = change.documentKey?._id;
            // console.log(productId);
            if (!productId) return;
            const carts = await mongoose.model('Cart').find({ "items.product": productId });
            if (updateTerms.isDeleted) {
                for (let cart of carts) {
                    // console.log(cart);
                    const cartData = {
                        user: cart.user,
                        items: cart.items
                            .filter(item => item.product.toString() === productId.toString())
                            .map(item => ({ product: item.product }))
                    }
                    const result = await calculateCartPrice(cartData);
                    // console.log(result);
                    await Cart.updateOne(
                        { _id: cart._id },
                        {
                            $set: {
                                cartFinalMRP: result.cartFinalMRP,
                                cartFinalDiscount: result.cartFinalDiscount,
                                cartFinalPrice: result.cartFinalPrice
                            }
                        }
                    );
                }
            } else {
                for (let cart of carts) {
                    // console.log(cart);
                    const cartData = {
                        user: cart.user,
                        skipOldValuesSubtraction: true,
                        items: cart.items
                            .filter(item => item.product.toString() === productId.toString())
                            .map(item => ({ product: item.product, quantity: item.quantity }))
                    }

                    const result = await calculateCartPrice(cartData);

                    await Cart.updateOne(
                        { _id: cart._id },
                        {
                            $set: {
                                cartFinalMRP: result.cartFinalMRP,
                                cartFinalDiscount: result.cartFinalDiscount,
                                cartFinalPrice: result.cartFinalPrice
                            }
                        }
                    )
                }
            }
        }
    }
});

const Cart = new mongoose.model("Cart", cartSchema);

export default Cart;