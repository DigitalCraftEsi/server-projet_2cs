import express from "express"
import { verifyAuth } from "../controllers/auth/authController";
import { addTaskAnnomalie, addTaskPanne, getAllTaskAnnomalie, getAllTaskForAdm, getAllTaskPannes, getAllTasks, updateNotifOfTask, updateStatusOfTask } from "../controllers/tasksAM/taskController";

const taskAmRouter = express.Router();

taskAmRouter.post("/panne",addTaskPanne)
taskAmRouter.post("/anomalie",addTaskAnnomalie)
taskAmRouter.get("/panne",verifyAuth,getAllTaskPannes)
taskAmRouter.get("/:id",getAllTaskForAdm)
taskAmRouter.get("/anomalie",verifyAuth,getAllTaskAnnomalie);
taskAmRouter.post("/notif",verifyAuth,updateNotifOfTask)
taskAmRouter.post("/status",verifyAuth,updateStatusOfTask)
taskAmRouter.get("/",verifyAuth,getAllTasks);


export default taskAmRouter