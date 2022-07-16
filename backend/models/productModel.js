import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
      minLength: 3,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      minLength: 3,
    },
    category: {
      type: String,
      required: true,
      minLength: 3,
    },
    description: {
      type: String,
      required: true,
      minLength: 3,
    },
    //racket schema:
    headSize: {
      type: String,
      minLength: 3,
    },
    length: {
      type: String,
      minLength: 3,
    },
    weight: {
      type: String,
      minLength: 3,
    },
    balance: {
      type: String,
      minLength: 3,
    },
    composition: {
      type: String,
      minLength: 3,
    },
    //color-for all items category
    color: {
      type: String,
      minLength: 3,
    },
    //length-for rackets and strings
    length: {
      type: String,
      minLength: 3,
    },

    //strings schema:
    gauge: {
      type: String,
      minLength: 3,
    },
    composition: {
      type: String,
      minLength: 3,
    },
    //grips schema
    thickness: {
      type: String,
      minLength: 3,
    },
    //bags schema:
    dimension: {
      type: String,
      minLength: 3,
    },
    suitableFor: {
      type: Number,
    },
    reviews: [reviewsSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    inOrders: {
      type: Array,
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
