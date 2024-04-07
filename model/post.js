const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  image: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  like: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      like: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
