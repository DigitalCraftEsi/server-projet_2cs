import express from "express"
import { getConsumerCards, addCard, deleteCard } from "../controllers/card/cardController";
import { verifyAuth } from "../controllers/auth/authController";
const cardRouter = express.Router();


cardRouter.get("/",verifyAuth,getConsumerCards)
cardRouter.post('/',verifyAuth,addCard)
cardRouter.delete("/:id",verifyAuth , deleteCard)

export default cardRouter