const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");

const orderSchema = new Schema({
  creator: {
    type: String,
    require: true,
  },
  productsList: [
    {
      product: {
        type: String,
        require: true,
      },
      type: {
        type: String,
        require: true,
      },
      itemsCount: {
        type: Number,
        require: true,
      },
    },
  ],
  deliveryType: {
    type: String,
    require: true,
  },
  deliveryAdress: {
    type: String,
    require: true,
  },
  sumToPay: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
});

orderSchema.plugin(timestamp);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
