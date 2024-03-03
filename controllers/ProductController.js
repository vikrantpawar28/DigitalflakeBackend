
const ProductModel = require('../models/ProductModel');

exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      categoryName,
      packSize,
      mrp,
      productImage,
      status,
    } = req.body;

    const product = new ProductModel({
      productName,
      categoryName,
      packSize,
      mrp,
      productImage,
      status,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      productName,
      categoryName,
      packSize,
      mrp,
      productImage,
      status,
    } = req.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      {
        productName,
        categoryName,
        packSize,
        mrp,
        productImage,
        status,
      },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
