import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String, 
    unique: true,
    require: true,
  },
  password: {
    type: String,
    required: true,
  }
})