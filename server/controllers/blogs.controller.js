import Blog from "../models/Blog";

/* GET /blogs */
export const index = async (req, res) => {
  const userId = req.authUser.userId;
  
  try {
    const blogs = await Blog.find().populate("author", "name avatar").sort("-createdAt");
    const blogWithIsAuthor = blogs.map(blog => {
      const isAuthor = blog.author._id.toString() == userId
      return {
        ...blog.toObject(),
        isAuthor
      }
    })

    return res.status(200).json({
      blogs: blogWithIsAuthor,
      message: "Get blogs successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get blogs failed",
    });
  }
};

/* POST /blogs/create */
export const create = async (req, res) => {
  // console.log(req.authUser);
  // console.log(req.body.content);
  // console.log(req.files.images);

  try {
    const content = req.body.content;
    const images = req.files.images?.map((image) =>({url:  image.filename}));
    const author = req.authUser.userId;

    const blog = await Blog.create({
      content,
      images,
      author,
    });

    return res.status(200).json({
      message: "Create blog successfully",
      blog,
    });
  } catch (error) {
    console.log(error)
    
    return res.status(500).json({
      message: "Create blog failed",
    });
  }
};
