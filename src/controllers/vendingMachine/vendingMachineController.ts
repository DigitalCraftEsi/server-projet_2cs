/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../../handler/apiError";
import {
  SuccessResponse,
} from "../../handler/apiResponse";
import asyncHandler from "../../handler/asyncHandler";
const prisma = new PrismaClient();


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
    const machines = await prisma.distributeur.findMany();
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
    const machine = await prisma.distributeur.findUnique({
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
    const data = req.body;
    const machine = await prisma.distributeur.create({
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
      positionX ,
      positionY,
      adresse,
      etat,
      codeDeDeverrouillage_,
      actif,
      idClient,
      idAC 
    } = req.body; 
    const id = parseInt(req.params.id);
    await prisma.distributeur.update({
        where: { idDistributeur: id },
      data: {
        positionX ,
        positionY,
        adresse,
        etat,
        codeDeDeverrouillage_,
        actif,
        idClient,
        idAC 
      }
    });
    const machine = await prisma.distributeur.findUnique({
      where: { idDistributeur:id },
    });
    if (machine === null) {
      next(new BadRequestError());
    }else{
      new SuccessResponse("success",machine).send(res);
    }

});