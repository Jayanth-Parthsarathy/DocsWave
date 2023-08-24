import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
dotenv.config();

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).send({ message: "Specify all the fields" });
    }
    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists) {
      return res.status(400).send({ message: "Error user already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).send({ message: "User created" });
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({ message: "Specify all the fields" });
    }
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "User does not exist" });
    }
    const passwordMatches = await bcrypt.compare(password, user?.password);
    if (!passwordMatches) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "60d" },
    );
    return res.status(200).send({ token, userId: user.id });
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

export { register, login };
