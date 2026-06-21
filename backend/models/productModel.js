import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], required: true },
    date: { type: Number, required: true },
    bestseller: { type: Boolean, default: false }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
