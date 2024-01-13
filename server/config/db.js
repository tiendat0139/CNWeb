import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog_app");
    console.log("Connnect to mongoDB successfully");
  } catch (err) {
    console.log("Connnect failed");
  }
};

export default connect;
