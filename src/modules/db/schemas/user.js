const mongoose = require("mongoose");
const { Schema } = mongoose;
const timestamp = require("../middleware/timestamp");

const userSchema = new Schema({
  username: String,
  telephone: {
    type: String,
    unique: true,
  },
  password: String,
  email: {
    type: String,
    unique: true,
  },
  favoriteProducts: Array,
  viewedProducts: Array,
  orders: Array,
});

userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);

module.exports = User;
