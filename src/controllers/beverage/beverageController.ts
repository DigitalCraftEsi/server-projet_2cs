import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../handler/apiError";
import { SuccessResponse } from "../../handler/apiResponse";
import asyncHandler from "../../handler/asyncHandler";
import { prismaClientSingleton } from "../../utils/prismaClient";
import schema from "./schema";


/**
 * Get all beverage of vendingMachine 
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getBeveragesOfMachin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const beverages = await prismaClientSingleton.boisson.findMany({
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
    const beverages = await prismaClientSingleton.boisson.findFirst({
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
    const beverages = await prismaClientSingleton.boisson.findMany();
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

    const { error } = schema.beverageSchema.validate(req.body) 
    if (error) {
         next(new BadRequestError(error.details[0].message))
    }
    const { nomBoisson, tarif, idDistributeur } = req.body;
    const beverage = await prismaClientSingleton.boisson.create({
      data: {
        nomBoisson,
        tarif ,
        idDistributeur
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
    await prismaClientSingleton.boisson.updateMany({
      where: { idBoisson: id },
      data: {
        nomBoisson: nom,
        tarif: price,
        idDistributeur: idMachine,
      },
    });
    const beverage = await prismaClientSingleton.boisson.findMany({
        where: { idBoisson : id},
      });
      if (beverage === null || beverage.length == 0) {
        next(new BadRequestError());
      }else{
        new SuccessResponse("success",beverage[0]).send(res);
      }
  }
);
