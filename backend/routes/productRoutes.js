import express from "express";
const productRouter = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter.route("/:id/reviews").post(protect, createProductReview);
productRouter.get("/top", getTopProducts);
productRouter
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default productRouter;
