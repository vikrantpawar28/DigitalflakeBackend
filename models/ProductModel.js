const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  categoryName: { type: String, required: true },
  packSize: { type: String, required: true },
  mrp: { type: Number, required: true },
  productImage: { type: String }, 
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
