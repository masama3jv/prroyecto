const Product = require('../models/Product');

// Obtenir tots els productes
const getAllProducts = async () => {
  return await Product.find();
};

// Obtenir producte per ID
const getProductById = async (id) => {
  return await Product.findById(id);
};

// Crear producte nou
const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

// Actualitzar producte
const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
};

// Eliminar producte
const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

// Buscar per nom o categoria
const searchProducts = async (query) => {
  const { name, category } = query;
  const filter = {};
  if (name) filter.$text = { $search: name };
  if (category) filter.category = category;
  return await Product.find(filter);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};
