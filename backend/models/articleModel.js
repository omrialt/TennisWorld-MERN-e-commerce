import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
    },
    text: {
      type: String,
      required: true,
      minLength: 30,
    },
    image: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
      minLength: 15,
    },
    createdBy: {
      type: String,
      required: true,
      default: "Tennis World board",
    },
    reviews: [reviewsSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
