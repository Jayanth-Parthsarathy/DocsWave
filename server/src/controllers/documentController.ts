import { Response } from "express";
import { AuthRequest } from "../types/auth.request";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { title } = req.body;
    if (!title) {
      return res.status(400).send({ message: "Specify the title" });
    }
    const document = await prisma.document.create({
      data: {
        title,
        author: { connect: { id: userId } },
      },
    });
    res.status(201).send(document);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const document = await prisma.document.findFirst({ where: { id } });
    if (!document) {
      return res.status(401).send({ message: "Document not found" });
    }
    if (document.authorId !== userId) {
      return res.status(400).send({
        message: "You do not have persmissions to delete this document",
      });
    }
    await prisma.document.delete({ where: { id } });
    res.status(201).send({ message: "Document deleted" });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const updateDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const { text } = req.body;
    const document = await prisma.document.findFirst({
      where: { id },
      include: { SharedDocument: true, author: true },
    });
    if (!document) {
      return res.status(401).send({ message: "Document not found" });
    }
    const isShared = document.SharedDocument.some((doc) => {
      return doc.userId === userId;
    });
    if (document.authorId !== userId && !isShared) {
      return res.status(400).send({
        message: "You do not have persmissions to update this document",
      });
    }
    const updatedDocument = await prisma.document.update({
      where: { id },
      data: { text },
    });
    res.status(201).send(updatedDocument);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getUserDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const documents = await prisma.document.findMany({
      where: { authorId: userId },
      orderBy: {
        updatedAt: "desc",
      },
    });
    return res.status(200).send(documents);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const getUserDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params;
    const document = await prisma.document.findFirst({
      where: { id },
      include: {
        SharedDocument: true,
      },
    });
    if (!document) {
      return res.status(400).send({ error: "Document not found" });
    }
    const isShared = document.SharedDocument.find((doc) => {
      return doc.userId === userId;
    });
    if (!document && !isShared) {
      return res.status(400).send({ message: "Document not found" });
    }
    if (document || isShared) {
      return res
        .status(200)
        .send({ document, permission: isShared?.permissions });
    }
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};
const getSharedDocuments = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const sharedDocuments = await prisma.sharedDocument.findMany({
      where: { userId },
      include: {
        document: true,
      },
      orderBy:{
        updatedAt: 'desc' 
      }
    });
    return res.status(200).send(sharedDocuments);
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
};

const shareDocument = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req;
    const { email, permissions } = req.body;
    const { id } = req.params;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).send({ error: "User does not exist" });
    }
    const permissionExists = await prisma.sharedDocument.findFirst({
      where: {
        documentId: id,
        userId: user.id,
      },
    });
    if (permissionExists) {
      const updatedPermission = await prisma.sharedDocument.update({
        where: {
          id: permissionExists.id,
        },
        data: {
          permissions: permissions,
        },
      });
      return res
        .status(201)
        .send({ message: "Updated permission", updatedPermission });
    }

    const document = await prisma.document.findFirst({
      where: {
        id,
        authorId: userId,
      },
    });
    if (!document) {
      return res.status(400).send({ error: "Document does not exist" });
    }
    const newShare = await prisma.sharedDocument.create({
      data: {
        userId: user.id,
        documentId: document.id,
        permissions,
      },
    });
    return res.status(201).send(newShare);
  } catch (error) {
    return res.status(500).send({ err: "Server error" });
  }
};
export {
  createDocument,
  deleteDocument,
  updateDocument,
  getUserDocuments,
  getUserDocument,
  shareDocument,
  getSharedDocuments,
};
