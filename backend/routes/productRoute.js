import express from "express";
import { listProducts, addProduct, removeProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/list", listProducts);
productRouter.post("/add", addProduct);
productRouter.post("/remove", removeProduct);

export default productRouter;
