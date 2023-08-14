import { Router } from "express";
import protect from "../middleware/authMiddleware";
import { getMe } from "../controllers/userController";

const userRouter = Router()

userRouter.get("/profile", protect, getMe);
export default userRouter
