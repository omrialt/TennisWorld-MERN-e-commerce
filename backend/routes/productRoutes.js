import express from "express";
const productRouter = express.Router();
import {
  getProductsAll,
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getSimilarProducts,
  getProductsBrandCategory,
  getProductsBrandOrCategory,
} from "../controllers/productControllers.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

productRouter.route("/").get(getProducts).post(protect, admin, createProduct);
productRouter.route("/:id/reviews").post(protect, createProductReview);
productRouter.get("/all", getProductsAll);
productRouter.get("/top", getTopProducts);
productRouter.get("/similar", getSimilarProducts);
productRouter.get("/choose", getProductsBrandCategory);
productRouter.get("/select", getProductsBrandOrCategory);

productRouter
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default productRouter;
