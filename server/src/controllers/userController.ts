import { Response } from "express";
import { AuthRequest } from "../types/auth.request";
import { PrismaClient } from "@prisma/client";
const primsa = new PrismaClient()
const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const user = await primsa.user.findFirst({ where: { id: userId }, select: { name: true, email: true, documents: true } })
    if (!user) {
      return res.status(400).send({ message: "User not found" })
    }
    return res.status(200).send({ user })
  }
  catch (error: any) {
    return res.status(500).send({ message: error.message })
  }
}

export { getMe }

