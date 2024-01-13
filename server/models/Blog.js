import mongoose from "mongoose";
import User from "./User.js";

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    content: { type: String },
    images: [
      {
        url: { type: String },
      },
    ],
    audios: [{ url: { type: String } }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
