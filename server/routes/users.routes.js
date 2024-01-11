import { Router } from "express";
import { loginController } from "../controllers/users.controllers.js";

const usersRoutes = Router()

usersRoutes.post('/login', loginController)

export default usersRoutes