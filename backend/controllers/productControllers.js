import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//action-get all products
//method-GET
//route-/api/products/all
//access-any
const getProductsAll = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (products) {
    res.json(products);
  }
  if (!products) {
    return res.status(404).json({ message: "Products not found" });
  }
});
//action-get all products by page
//method-GET
//route-/api/products
//access-any
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 16;
  const page = +req.query.pageNumber || 1;

  const count = await Product.count();
  const products = await Product.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//action-get product by id
//method-GET
//route-/api/products/:id
//access-any
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  }
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
});

//action-delete product by id
//method-DELETE
//route-/api/products/:id
//access-admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product remove" });
  }
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
});
//action-create new product
//method-POST
//route-/api/products/
//access-protect,admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image:
      "https://cdn.pixabay.com/photo/2016/06/20/13/44/paper-1468883_960_720.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//action-update product by id
//method-PUT
//route-/api/products/:id
//access-protect,admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    brand,
    description,
    image,
    category,
    countInStock,
    headSize,
    length,
    weight,
    balance,
    composition,
    color,
    gauge,
    thickness,
    dimension,
    suitableFor,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.headSize = headSize ? headSize : null;
    product.length = length ? length : null;
    product.weight = weight ? weight : null;
    product.balance = balance ? balance : null;
    product.composition = composition ? composition : null;
    product.color = color ? color : null;
    product.gauge = gauge ? gauge : null;
    product.thickness = thickness ? thickness : null;
    product.dimension = dimension ? dimension : null;
    product.suitableFor = suitableFor ? suitableFor : null;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    return res.status(404).json({ message: "Product not found" });
  }
});
//action-add new review
//method-POST
//route-/api/products/:id/reviews
//access-protect
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReview) {
      return res.status(400).json({ message: "Review already submitted" });
    }
    const review = {
      name: req.user.name,
      rating: +rating,
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    return res.status(400).json({ message: "Product not found" });
  }
});
//action-get top rated products
//method-GET
//route-/api/products/top
//access-any
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});
//action-get similar products
//method-GET
//route-/api/products/similar
//access-any
const getSimilarProducts = asyncHandler(async (req, res) => {
  const { category, brand, id } = req.query;

  const product = await Product.findById(id);

  const productsCategory = await Product.find({
    category: category,
    name: { $nin: product.name },
    brand: { $nin: product.brand },
  });

  const productsBrand = await Product.find({
    brand: brand,
    name: { $nin: product.name },
  });

  const randomOrderCategory = await productsCategory.sort(
    (a, b) => 0.5 - Math.random()
  );
  const randomOrderBrand = await productsBrand.sort(
    (a, b) => 0.5 - Math.random()
  );
  if (!productsCategory && !productsBrand) {
    res.json({ message: "Products not found" });
  }
  res.json({
    categoryList: randomOrderCategory.slice(0, 4),
    brandList: randomOrderBrand.slice(0, 4),
  });
});
//action-get products by brand+category
//method-GET
//route-/api/products/choose
//access-any
const getProductsBrandCategory = asyncHandler(async (req, res) => {
  const { category, brand } = req.query;
  const products = await Product.find({ brand: brand, category: category });
  if (!products) {
    res.status(404).json({ message: "Products not found!" });
  } else {
    res.json(products);
  }
});
//action-get products by brand or category
//method-GET
//route-/api/products/select
//access-any
const getProductsBrandOrCategory = asyncHandler(async (req, res) => {
  const { category, brand } = req.query;
  let products;
  if (!category) {
    products = await Product.find({ brand: brand });
    res.json(products);
  }
  if (!brand) {
    products = await Product.find({ category: category });
    res.json(products);
  }
  if (!category || !brand || !products) {
    res.json({ message: "Products not found" });
  }
});

export {
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
};
