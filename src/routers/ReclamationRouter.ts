import express from "express"
import { verifyAuth } from "../controllers/auth/authController";
import { AddReclamations, deleteReclamations, getAllReclamations, getReclamation, updateReclamations } from "../controllers/reclamation/reclamationController";

const reclamationRouter = express.Router();

reclamationRouter.get("/",verifyAuth,getAllReclamations)
reclamationRouter.get("/:id",verifyAuth,getReclamation)
reclamationRouter.post("/:id",verifyAuth , updateReclamations)
reclamationRouter.post("/",verifyAuth , AddReclamations)
reclamationRouter.delete('/:id',verifyAuth , deleteReclamations)

export default reclamationRouter