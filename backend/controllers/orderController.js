import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

// Place Order
const placeOrder = async (req, res) => {
    try {
        const { userId, address, method } = req.body;

        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};

        const orderItems = [];
        let totalAmount = 0;

        // Fetch all product details and construct order items
        for (const itemId in cartData) {
            const productInfo = await productModel.findById(itemId);
            if (!productInfo) continue;

            for (const size in cartData[itemId]) {
                const quantity = cartData[itemId][size];
                if (quantity > 0) {
                    orderItems.push({
                        _id: productInfo._id,
                        name: productInfo.name,
                        description: productInfo.description,
                        price: productInfo.price,
                        image: productInfo.image,
                        category: productInfo.category,
                        subCategory: productInfo.subCategory,
                        sizes: productInfo.sizes,
                        size: size,
                        quantity: quantity
                    });
                    totalAmount += productInfo.price * quantity;
                }
            }
        }

        if (orderItems.length === 0) {
            return res.json({ success: false, message: "Cart is empty" });
        }

        const delivery_fee = 49;
        const finalAmount = totalAmount + delivery_fee;

        const newOrder = new orderModel({
            userId,
            items: orderItems,
            amount: finalAmount,
            address,
            status: "Order Placed",
            paymentMethod: method,
            payment: method === 'cod' ? false : true,
            date: Date.now()
        });

        await newOrder.save();

        // Clear cart for the user
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Retrieve User Orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId }).sort({ date: -1 });
        return res.json({ success: true, orders });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

export { placeOrder, userOrders };
