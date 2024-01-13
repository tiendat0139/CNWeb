import mongoose from "mongoose";
import User from "./User.js"
import Blog from "./Blog.js"; 
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    content: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
