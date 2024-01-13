import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import connect from "./config/db";
import usersRoutes from "./routes/users.routes";
import blogsRouter from "./routes/blogs.router";
import commentsRouter from "./routes/comments.router";

config();
const app = express();
const port = 3001;

/* Routers */
connect();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(bodyParser.json());
app.use("/users", usersRoutes);
app.use("/blogs", blogsRouter);
app.use("/comments", commentsRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
