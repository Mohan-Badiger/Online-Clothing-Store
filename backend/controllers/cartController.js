import userModel from "../models/userModel.js";

// Add product to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Update user cart quantity
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        cartData[itemId][size] = quantity;

        // Clean up empty items or sizes
        if (cartData[itemId][size] <= 0) {
            delete cartData[itemId][size];
        }
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Cart Updated" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        return res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Sync local storage cart to database
const syncCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;

        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Merge local storage cartItems into database cartData
        for (const itemId in cartItems) {
            if (!cartData[itemId]) {
                cartData[itemId] = {};
            }
            for (const size in cartItems[itemId]) {
                const quantity = cartItems[itemId][size];
                if (quantity > 0) {
                    cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;
                }
            }
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, cartData, message: "Cart synchronized successfully" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

export { addToCart, updateCart, getUserCart, syncCart };
