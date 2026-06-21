import productModel from "../models/productModel.js";

// List all products
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        return res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Add product (optional utility)
const addProduct = async (req, res) => {
    try {
        const { _id, name, description, price, image, category, subCategory, sizes, bestseller } = req.body;
        
        const productData = new productModel({
            _id,
            name,
            description,
            price: Number(price),
            image,
            category,
            subCategory,
            sizes,
            bestseller: bestseller === true || bestseller === "true",
            date: Date.now()
        });

        await productData.save();
        return res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

// Remove product (optional utility)
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        return res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
};

export { listProducts, addProduct, removeProduct };
