const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  cart: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
