/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction , Request , Response } from "express";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { BadRequestError, ForbiddenError, InternalError } from "../../handler/apiError";
import { onAddTaskAnomalieHandler, onAddTaskPanneHandler, onGetAllTaskAnomalieHandler, onGetAllTaskPanneHandler, onUpdateNotifOfTaskHandler, onUpdateStateTaskHandler } from "../../services/taskAmService";
import { date, expression } from "joi";
import { onGetMachineHander } from "../../services/machinService";
import { onGetAMHandler } from "../../services/userService";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import { isADM, isAM } from "../../enums/rolesEnum";


export const addTaskPanne = asyncHandler( async (req : Request , res : Response , next : NextFunction) =>{
    
    const { error } = schema.addTaskSchema.validate(req.body);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const machine = await onGetMachineHander(req.body.machine);
    if (!machine) {
        throw new BadRequestError("machine doesnt existe")
    }

    const am = await onGetAMHandler(req.body.am);
    if (!am) {
        throw new BadRequestError("AM doesnt existe");
    }

    const task = await onAddTaskPanneHandler(req.body);
    if (task == null ){
        throw new BadRequestError();
    }

    new SuccessResponse("add Task with sucess" , task).send(res);
    
})


export const addTaskAnnomalie = asyncHandler( async (req : Request , res : Response , next : NextFunction) =>{
    
    const { error } = schema.addTaskSchema.validate(req.body);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }


    const machine = await onGetMachineHander(req.body.machine);
    if (!machine) {
        throw new BadRequestError("machine doesnt existe")
    }

    const am = await onGetAMHandler(req.body.am);
    if (!am ) {
        throw new BadRequestError("AM doesnt existe");
    }

    const task = await onAddTaskAnomalieHandler(req.body);
    if (task == null ){
        throw new BadRequestError();
    }

    new SuccessResponse("add Task with sucess" , task).send(res);
    
})

export const getAllTaskAnnomalie = asyncHandler( async (req : Request , res : Response , next : NextFunction) =>{

    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAM(req.user.role) && !isADM(req.user.role ) ) {
        throw new ForbiddenError('Permission denied');
    }
    const id= req.user.id;
    const am = await onGetAMHandler(id);
    if (!am) {
        throw new BadRequestError("AM doesnt existe");
    }
    const task = await onGetAllTaskAnomalieHandler(id);
    if (task == null ){
        throw new BadRequestError();
    }

    new SuccessResponse("sucess",task).send(res);

})

export const getAllTaskPannes = asyncHandler( async (req : Request , res : Response , next : NextFunction) =>{

    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAM(req.user.role) && !isADM(req.user.role )) {
        throw new ForbiddenError('Permission denied');
    }
    const id= req.user.id;
    const am = await onGetAMHandler(id);
    if (!am) {
        throw new BadRequestError("AM doesnt existe");
    }
    const task = await onGetAllTaskPanneHandler(id);
    if (task == null ){
        throw new BadRequestError();
    }

    new SuccessResponse("sucess",task).send(res);

})

export const getAllTasks  = asyncHandler( async (req : Request , res : Response , next : NextFunction) => {
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAM(req.user.role) && !isADM(req.user.role )) {
        throw new ForbiddenError('Permission denied');
    }
    const id= req.user.id;  
    const am = await onGetAMHandler(id);
    if (!am) {
        throw new BadRequestError("AM doesnt existe");
    }
    const pannes = await onGetAllTaskPanneHandler(id);
    const anomalies = await onGetAllTaskAnomalieHandler(id);
    const pannesWithType = pannes.map((tache) => ({
        ...tache,
        type: 'panne'
      }));
      const anomaliesWithType = anomalies.map((tache) => ({
        ...tache,
        type: 'anomalie'
      }));
    new SuccessResponse("sucess",[...pannesWithType,...anomaliesWithType]).send(res);

})


export const updateNotifOfTask = asyncHandler( async (req : Request , res : Response , next : NextFunction) => {
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAM(req.user.role)) {
        throw new ForbiddenError('Permission denied');
    }
    const { error } = schema.updateNotifTaskSchema.validate(req.body);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const id= req.user.id;  
    const am = await onGetAMHandler(id);
    if (!am) {
        throw new BadRequestError("AM doesnt existe");
    }

    await onUpdateNotifOfTaskHandler(req.body.idTask,req.body.notif);

    new SuccessMsgResponse("sucess").send(res)
})



export const updateStatusOfTask = asyncHandler( async (req : Request , res : Response , next : NextFunction) => {
    
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAM(req.user.role)) {
        throw new ForbiddenError('Permission denied');
    }
    const { error } = schema.updateStatusTaskSchema.validate(req.body);
    if (error) {
        throw new BadRequestError(error.details[0].message);
    }

    const id= req.user.id;  
    const am = await onGetAMHandler(id);
    if (!am) {
        throw new BadRequestError("AM doesnt existe");
    }

    await onUpdateStateTaskHandler(req.body.idTask,req.body.status);

    new SuccessMsgResponse("sucess").send(res)
})



