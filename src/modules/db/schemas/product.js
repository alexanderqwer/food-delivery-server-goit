const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");

const productSchema = new Schema({
  sku: Number,
  name: {
    type: String,
    unique: true,
  },
  description: String,
  price: String,
  currency: String,
  creatorId: Number,
  created: String,
  modified: String,
  categories: Array,
  likes: Number,
});

productSchema.plugin(timestamp);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
