import Article from "../models/articleModel.js";
import asyncHandler from "express-async-handler";

//action-get all articles
//method-GET
//route-/api/magazine
//access-any
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find();
  res.json({ articles });
});
//action-get article by id
//method-GET
//route-/api/magazine/:id
//access-any
const getArticleById = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    res.json(article);
  }
  if (!article) {
    return res.status(404).json({ message: "Article  not found" });
  }
});
//action-delete article by id
//method-DELETE
//route-/api/article/:id
//access-admin
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (article) {
    await article.remove();
    res.json({ message: "Article remove" });
  }
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
});
//action-create new article
//method-POST
//route-/api/magazine
//access-protect,admin
const createArticle = asyncHandler(async (req, res) => {
  const article = new Article({
    title: "Sample article title",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    image:
      "https://cdn.pixabay.com/photo/2016/06/20/13/44/paper-1468883_960_720.jpg",
    summary:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy",
    createdBy: "Tennis World Board",
  });
  const createdArticle = await article.save();
  res.status(201).json(createdArticle);
});

//action-update article by id
//method-PUT
//route-/api/magazine/:id
//access-protect,admin
const updateArticle = asyncHandler(async (req, res) => {
  const { title, text, image, summary, createdBy } = req.body;
  const article = await Article.findById(req.params.id);
  if (article) {
    article.title = title;
    article.text = text;
    article.image = image;
    article.summary = summary;
    article.createdBy = createdBy;

    const updatedArticle = await article.save();
    res.status(201).json(updatedArticle);
  } else {
    return res.status(404).json({ message: "Article not found" });
  }
});
//action-add new review
//method-POST
//route-/api/magazine/:id/reviews
//access-protect
const createArticleReview = asyncHandler(async (req, res) => {
  const { comment } = req.body;
  const article = await Article.findById(req.params.id);
  if (article) {
    const alreadyReview = article.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReview) {
      return res.status(400).json({ message: "Review already submitted" });
    }
    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };
    article.reviews.push(review);
    article.numReviews = article.reviews.length;
    await article.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    return res.status(400).json({ message: "Article not found" });
  }
});
export {
  getArticles,
  getArticleById,
  deleteArticle,
  createArticle,
  updateArticle,
  createArticleReview,
};
