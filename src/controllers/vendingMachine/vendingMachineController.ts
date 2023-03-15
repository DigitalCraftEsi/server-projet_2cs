/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../handler/apiError";
import {
  SuccessMsgResponse,
  SuccessResponse,
} from "../../handler/apiResponse";
import asyncHandler from "../../handler/asyncHandler";
import { prismaClientSingleton } from "../../utils/prismaClient";
import schema from "./schema";


/**
 * Get All existing vendingMachines in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getAllMaachin = asyncHandler( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const machines = await prismaClientSingleton.distributeur.findMany();
    if (machines === null) {
      next(new BadRequestError());
    }else{
      new SuccessResponse("success",machines).send(res);
    }
})

/**
 * Get vendingMachine by id 
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getMachine = asyncHandler( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const id = parseInt(req.params.id);
    const machine = await prismaClientSingleton.distributeur.findUnique({
      where: { idDistributeur: id },
    });
    if (machine != null) {
      new SuccessResponse("", machine).send(res);
    } else {
      next(new BadRequestError());
    }
});

/**
 * Add vendingMachine in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const addMachine = asyncHandler( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = schema.vendingMachineSchema.validate(req.body);

  if (error) {
       next(new BadRequestError(error.details[0].message))
  }
    const data = req.body;
    const machine = await prismaClientSingleton.distributeur.create({
      data: data,
    });
    if (machine === null) {
      next(new BadRequestError());
    }else{
      new SuccessResponse("success",machine).send(res);
    }
});


/**
 * Update existing vendingMachine .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const updateMachine = asyncHandler( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {
      longitude ,
      latitude,
      adresse,
      codeDeDeverrouillage,
      idClient,
      idAM 
    } = req.body; 
    const id = parseInt(req.params.id);
    await prismaClientSingleton.distributeur.update({
        where: { idDistributeur: id },
      data: {
        longitude,
        latitude,
        adresse,
        codeDeDeverrouillage,
        idClient,
        idAM
      }
    });
    const machine = await prismaClientSingleton.distributeur.findUnique({
      where: { idDistributeur:id },
    });
    if (machine === null) {
      next(new BadRequestError());
    }else{
      new SuccessResponse("success",machine).send(res);
    }

});


/**
 * Delete existing vendingMachine .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const deleteMachine = asyncHandler( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  let machineDelete = await prismaClientSingleton.distributeur.findUnique({
    where : {
      idDistributeur : id
    }
  })
  if (machineDelete == null) {
    next(new BadRequestError("Machine doesn't existe"))
  }
  await prismaClientSingleton.distributeur.delete({where : {
    idDistributeur : id
  }})

  new SuccessMsgResponse("deleting successfull").send(res)

})