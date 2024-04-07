const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: String,
  image: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Product", productSchema);

module.exports = Post;
