import { Router } from "express";
import protect from "../middleware/authMiddleware";
import { createDocument, deleteDocument, updateDocument } from "../controllers/documentController";


const documentRouter = Router()

documentRouter.post("/create", protect, createDocument)
documentRouter.put("/update/:id", protect, updateDocument)
documentRouter.delete("/delete/:id", protect, deleteDocument)



export default documentRouter
