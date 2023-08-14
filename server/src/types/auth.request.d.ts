import { Request } from "express";
export interface AuthRequest extends Request {
  userId?: string;
  email?: string;
}
