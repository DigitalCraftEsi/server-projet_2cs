/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma, distributeur } from "@prisma/client";
import { AuthFailureError, BadRequestError } from "../handler/apiError";
import {
  BadRequestResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../handler/ApiResponse";
const prisma = new PrismaClient();

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

export const getAllMaachin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allMachin = await prisma.distributeur.findMany();
    new SuccessResponse("", allMachin).send(res);
  } catch (err) {
    next(new BadRequestError());
  }
};

export const getMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const machine = await prisma.distributeur.findUnique({
      where: { idDistributeur: id },
    });
    if (machine != null) {
      new SuccessResponse("", machine).send(res);
    } else {
      next(new BadRequestError());
    }
  } catch (err: unknown) {
    next(new BadRequestError());
  }
};

export const addMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const machin = await prisma.distributeur.create({
      data: data,
    });
    new SuccessResponse("", machin).send(res);
  } catch (err: unknown) {
    next(new BadRequestResponse());
  }
};



export const modifyMachine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: distr = req.body; 
    const id = parseInt(req.params.id);
    await prisma.distributeur.update({
        where: { idDistributeur: id },
      data: data ,

    });
    const machine = await prisma.distributeur.findUnique({
      where: { idDistributeur: id },
    });
    new SuccessResponse("",machine).send(res);
  } catch (err: unknown) {
    next(new BadRequestError());
  }
};
