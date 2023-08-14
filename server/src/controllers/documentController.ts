import { Response } from "express";
import { AuthRequest } from "../types/auth.request";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const createDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { title, text } = req.body
    if (!title || !text) {
      return res.status(400).send({ message: "Specify all the fields" })
    }
    const document = await prisma.document.create({
      data: {
        title,
        text,
        author: { connect: { id: userId } },
      }
    })
    res.status(201).send(document);
  }
  catch (error: any) {
    return res.status(500).send({ message: error.message })
  }
}

const deleteDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params
    const document = await prisma.document.findFirst({ where: { id } })
    if (!document) {
      return res.status(401).send({ message: "Document not found" })
    }
    if (document.authorId !== userId) {
      return res.status(400).send({ message: "You do not have persmissions to delete this document" });
    }
    await prisma.document.delete({ where: { id } })
    res.status(201).send({ message: "Document deleted" });
  }
  catch (error: any) {
    return res.status(500).send({ message: error.message })
  }
}

const updateDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params
    const { text } = req.body
    const document = await prisma.document.findFirst({ where: { id } })
    if (!document) {
      return res.status(401).send({ message: "Document not found" })
    }
    if (document.authorId !== userId) {
      return res.status(400).send({ message: "You do not have persmissions to update this document" });
    }
    const updatedDocument = await prisma.document.update({ where: { id }, data: { text } })
    res.status(201).send(updatedDocument);
  }
  catch (error: any) {
    return res.status(500).send({ message: error.message })
  }
}


export { createDocument, deleteDocument, updateDocument }

