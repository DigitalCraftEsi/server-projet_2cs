/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma, distributeur } from "@prisma/client";
import { AuthFailureError, BadRequestError } from "../../handler/apiError";
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../handler/apiResponse";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { prismaClientSingleton } from "../../utils/prismaClient";

interface distr {
    positionX? : number,
    positionY? : number,
    adresse? : string,
    etat? : string,
    codeDeDeverrouillage_? : string,
    actif? : boolean,
    idClient? : number,
    idAC ? : number,
  }

export const getAllCoffeeMachines = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const allMachines = await prismaClientSingleton.distributeur.findMany();
    
    new SuccessResponse("", allMachines).send(res);
});

export const getCoffeeMachine = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const id:number = parseInt(req.params.id);
    const machine = await prismaClientSingleton.distributeur.findUnique({
      where: { idDistributeur: id },
    });
    if (machine != null) {
      new SuccessResponse("", machine).send(res);
    } else {
      throw new BadRequestError();
    }
});

export const addCoffeeMachine = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { error } = schema.vendingMachineSchema.validate(req.body);

    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    const data = req.body;
    const machin = await prismaClientSingleton.distributeur.create({
      data: data,
    });
    new SuccessResponse("", machin).send(res);
});



export const updateCoffeeMachine = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const data: distr = req.body; 
    const id = parseInt(req.params.id);
    await prismaClientSingleton.distributeur.update({
        where: { idDistributeur: id },
      data: data

    });
    const machine = await prismaClientSingleton.distributeur.findUnique({
      where: { idDistributeur: id },
    });
    new SuccessResponse("",machine).send(res);
});
