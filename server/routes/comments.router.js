import { Router } from "express";
import { index, create, destroy } from "../controllers/comments.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const commentsRouter = Router();

commentsRouter.get("/:blogId", index);
commentsRouter.post("/create", verifyToken, create);
commentsRouter.delete("/:blogId/:commentId", verifyToken, destroy);

export default commentsRouter;
