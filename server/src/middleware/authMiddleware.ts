import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/auth.request";
import jwt from "jsonwebtoken";

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.userId = (decoded as any).id;
    next();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default protect;
