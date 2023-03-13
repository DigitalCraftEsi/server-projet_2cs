import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../handler/apiError";
import { SuccessResponse } from "../../handler/apiResponse";
import asyncHandler from "../../handler/asyncHandler";
const prisma = new PrismaClient();

/**
 * Get all beverage of vendingMachine 
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getBeveragesOfMachin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const beverages = await prisma.boisson.findMany({
      where: { idDistributeur: id },
    });
    if (beverages === null ){
        next(new BadRequestError());
    }else{
        new SuccessResponse("success", beverages).send(res);
    }

  }
);

/**
 * Add existing beverage by id 
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getBeverage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const beverages = await prisma.boisson.findFirst({
      where: { idBoisson: id },
    });
    if (beverages === null ){
        next(new BadRequestError());
    }else{
        new SuccessResponse("success", beverages).send(res);
    }
  }
);

/**
 * Get all existing beverages .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getBeverages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const beverages = await prisma.boisson.findMany();
    if (beverages === null ){
        next(new BadRequestError());
    }else{
        new SuccessResponse("success", beverages).send(res);
    }
  }
);

/**
 * Add beverage in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const addbeverage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nom, price, idMachine } = req.body;
    const beverage = await prisma.boisson.create({
      data: {
        nomBoisson: nom,
        tarif: price,
        idDistributeur: idMachine,
      },
    });
    if (beverage === null ){
        next(new BadRequestError());
    }else{
        new SuccessResponse("success", beverage).send(res);
    }
  }
);

/**
 * Update beverage in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const updateBeverage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { nom, price, idMachine } = req.body;
    const id = parseInt(req.params.id);
    await prisma.boisson.updateMany({
      where: { idBoisson: id },
      data: {
        nomBoisson: nom,
        tarif: price,
        idDistributeur: idMachine,
      },
    });
    const beverage = await prisma.boisson.findMany({
        where: { idBoisson : id},
      });
      if (beverage === null || beverage.length == 0) {
        next(new BadRequestError());
      }else{
        new SuccessResponse("success",beverage[0]).send(res);
      }
  }
);
