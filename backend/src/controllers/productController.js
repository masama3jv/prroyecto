const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    req.log.info({
      requestId: req.requestId
    }, 'Getting product list');
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    req.log.error({
      requestId: req.requestId,
      error: error.message
    }, 'Error getting products');
    next(error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
