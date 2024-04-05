import Product from "../models/productModel.js";

const getProducts = async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const category = req.query.category
    ? {
        category: `${req.query.category}`,
      }
    : {};
  const pageSize = req.query.limit;
  const keyword = req.query.keyword
    ? {
        name: new RegExp(req.query.keyword, "i"),
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({
    ...keyword,
    ...category,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product deleted" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    numReviews,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;
    product.image = image;
    product.brand = brand;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const reviewProduct = async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      res.status(400);
      throw new Error("You have already reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({
      message: "Added Review",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

const getTopProduct = async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(5);
  res.json(products);
};

const getTopCategoryProduct = async (req, res) => {
  const products = await Product.aggregate([
    {
      $facet: {
        first: [
          {
            $match: {
              category: "shirt",
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          { $limit: 10 },
        ],
        second: [
          {
            $match: {
              category: "short",
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          { $limit: 10 },
        ],
        third: [
          {
            $match: {
              category: "outwear",
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          { $limit: 10 },
        ],
        fourth: [
          {
            $match: {
              category: "trouser",
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          { $limit: 10 },
        ],
        fifth: [
          {
            $match: {
              category: "skirt",
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          { $limit: 10 },
        ],
        sixth: [
          {
            $match: {
              category: "dress",
            },
          },
          {
            $sort: {
              rating: -1,
            },
          },
          { $limit: 10 },
        ],
      },
    },
    {
      $project: {
        all: {
          $concatArrays: [
            "$first",
            "$second",
            "$third",
            "$fourth",
            "$fifth",
            "$sixth",
          ],
        },
      },
    },
    {
      $unwind: "$all",
    },
    {
      $group: {
        _id: "$all._id",
        info: {
          $push: {
            name: "$all.name",
            imageLink: "$all.imageLink",
            category: "$all.category",
            rating: "$all.rating",
            numReviews: "$all.numReviews",
            price_org: "$all.price_org",
            price_sale: "$all.price_sale"
          },
        },
      },
    },
  ]);
  res.json(products);
};

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
  getTopProduct,
  getTopCategoryProduct,
};
