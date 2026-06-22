import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Order Placed" },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, default: false },
    date: { type: Number, required: true }
});

orderSchema.index({ userId: 1, date: -1 });

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
