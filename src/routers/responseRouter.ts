import express from "express"
import { verifyAuth } from "../controllers/auth/authController";
import { addResponse, deleteResponse, getAllResponse, getResponse, updateResponse } from "../controllers/reponse/responseController";

const responseRouter = express.Router();

responseRouter.get("/",verifyAuth,getAllResponse)
responseRouter.get("/:id",verifyAuth,getResponse)
responseRouter.post("/:id",verifyAuth , updateResponse)
responseRouter.post("/",verifyAuth , addResponse)
responseRouter.delete('/:id',verifyAuth , deleteResponse)

export default responseRouter