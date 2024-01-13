import { Router } from "express";
import multer from "multer";
import { index, create } from "../controllers/blogs.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const blogsRouter = Router();

const DIR = "./public/uploads";

/* Setup multer */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "audio/mpegP" ||
      file.mimetype == "video/mp4"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("File format not allowed"));
    }
  },
});

blogsRouter.get("/", verifyToken, index);
blogsRouter.post(
  "/create",
  [
    upload.fields([
      { name: "images", maxCount: 4 },
      { name: "audios", maxCount: 4 },
    ]),
    verifyToken,
  ],
  create
);

export default blogsRouter;
