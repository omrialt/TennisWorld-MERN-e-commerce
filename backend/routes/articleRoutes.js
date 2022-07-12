import express from "express";
const articleRouter = express.Router();
import {
  createArticle,
  createArticleReview,
  deleteArticle,
  getArticleById,
  getArticles,
  updateArticle,
} from "../controllers/articleController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

articleRouter.route("/").get(getArticles).post(protect, admin, createArticle);
articleRouter.route("/:id/reviews").post(protect, createArticleReview);
articleRouter
  .route("/:id")
  .get(getArticleById)
  .delete(protect, admin, deleteArticle)
  .put(protect, admin, updateArticle);

export default articleRouter;
