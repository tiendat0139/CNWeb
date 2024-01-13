import { Router } from "express";
import { oauthController } from "../controllers/users.controllers.js";

const usersRoutes = Router()

usersRoutes.get('/oauth/google', oauthController)

export default usersRoutes