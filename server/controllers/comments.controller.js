import Blog from "../models/Blog";
import Comment from "../models/Comment";

/* GET /comments/:blogId */
export const index = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);

    const comments = await Comment.find({
      blog: blog._id,
    })
      .populate({
        path: "author",
        select: "name avatar",
      })
      .sort("-createdAt");

    return res.status(200).json({
      comments,
      messages: "Get comments successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Get comments failed",
    });
  }
};

/* POST /comments/create */
export const create = async (req, res) => {
  try {
    const userId = req.authUser.userId;
    const { blogId, content } = req.body;

    const blog = await Blog.findById(blogId);
    const comment = await Comment.create({
      content,
      author: userId,
      blog: blog._id,
    });

    blog.comments.push(comment);
    await blog.save();

    const newComment = await Comment.findById(comment._id).populate({
      path: "author",
      select: "name avatar",
    });

    return res.status(200).json({
      comment: newComment,
      message: "Add comment successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Add comment failed",
    });
  }
};

/* DELETE /comment/:blogId/:commentId */
export const destroy = async (req, res) => {
  try {
    const { blogId, commentId } = req.params;

    const comment = await Comment.findByIdAndDelete(commentId);

    await Blog.findOneAndUpdate(
      { _id: blogId },
      { $pull: { comments: commentId } },
      { new: true }
    );
    return res.status(200).json({
      message: "Delete comment successfully",
      comment,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Add comment failed",
    });
  }
};
