import { Router } from "express";
import protect from "../middleware/authMiddleware";
import { createDocument, deleteDocument, updateDocument, getUserDocuments, getUserDocument, shareDocument, getSharedDocuments } from "../controllers/documentController";


const documentRouter = Router()

documentRouter.post("/create", protect, createDocument)
documentRouter.put("/update/:id", protect, updateDocument)
documentRouter.delete("/delete/:id", protect, deleteDocument)
documentRouter.get("/", protect, getUserDocuments)
documentRouter.get("/:id", protect, getUserDocument)
documentRouter.get("/shared/all", protect, getSharedDocuments)
documentRouter.post("/share/:id", protect, shareDocument)

export default documentRouter
