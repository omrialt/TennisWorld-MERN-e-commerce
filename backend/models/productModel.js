import mongoose from "mongoose";
import Joi from "joi";

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

    //strings schema:
    gauge: {
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

export function validateProduct(product) {
  const schema = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).required(),
    image: Joi.string().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    headSize: Joi.string().min(3).allow(null),
    length: Joi.string().min(3).allow(null),
    weight: Joi.string().min(3).allow(null),
    balance: Joi.string().min(3).allow(null),
    composition: Joi.string().min(3).allow(null),
    color: Joi.string().min(3).allow(null),
    gauge: Joi.string().min(3).allow(null),
    thickness: Joi.string().min(3).allow(null),
    dimension: Joi.string().min(3).allow(null),
    suitableFor: Joi.string().min(3).allow(null),
    headSize: Joi.string().min(3).allow(null),
    rating: Joi.number(),
    price: Joi.number().required(),
    countInStock: Joi.number().required(),
    sold: Joi.number(),
    inOrders: Joi.array(),
  });
  return schema.validate(product);
}
export function validateReview(review) {
  const schema = Joi.object({
    name: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().min(3).required(),
  });
  return schema.validate(review);
}

const Product = mongoose.model("Product", productSchema);
export default Product;

