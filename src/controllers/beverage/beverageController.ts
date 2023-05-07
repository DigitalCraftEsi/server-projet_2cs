import { NextFunction, Request, Response } from "express";
import { BadRequestError, InternalError } from "../../handler/apiError";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import asyncHandler from "../../handler/asyncHandler";
import { onAddBeverageHandler, onDeleteBeverageHandler, onGetAllBeverageHandler, onGetBeverageHandler, onGetBeveragesOfMachineHandler, onUpdateBeverageHandler } from "../../services/beverageService";
import { onGetMachineBydistUIDHandler } from "../../services/machinService";
import schema from "./schema";

interface RequestWithFile extends Request {
  file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      filename: string;
      path: string;
      buffer: Buffer;
  };
}

/**
 * Get all beverage of vendingMachine 
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getBeveragesOfMachin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const beverages = await onGetBeveragesOfMachineHandler(id)
    if (beverages === null) {
      throw new BadRequestError();
    } else {
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
    const beverage = await onGetBeverageHandler(id);
    if (beverage === null) {
      throw new BadRequestError("Beverage Doesn't existe");
    } else {
      new SuccessResponse("success", beverage).send(res);
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

    if (!req.body.idDistributeur && !req.body.distUID) {
      throw new BadRequestError()
    }

    const { error } = schema.getBeveragesSchema.validate(req.body);

    if (error) {
      throw new BadRequestError(error.details[0].message)
    }

    let idDistributeur: number;

    const distributeur = await onGetMachineBydistUIDHandler(req.body.UID)
    if (!distributeur) {
      throw new BadRequestError("Vending machine not found")
    }
    idDistributeur = distributeur.idDistributeur

    const beverages = await onGetAllBeverageHandler(Number(idDistributeur));
    if (beverages === null) {
      throw new InternalError();
    } else {
      new SuccessResponse("success", { idDistributeur, boissons: beverages }).send(res);
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
  async (req: RequestWithFile, res: Response, next: NextFunction) => {

    const { error } = schema.beverageSchema.validate(req.body)
    if (error) {
      throw new BadRequestError(error.details[0].message)
    }
    const beverage = await onAddBeverageHandler(req.body,req.file.filename)
    if (beverage === null) {
      throw new BadRequestError();
    } else {
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
    const id = parseInt(req.params.id);
    const beverageUpdate = await onGetBeverageHandler(id)
    if (beverageUpdate === null) {
      throw new BadRequestError("Beverage Doesn't existe");
    }
    await onUpdateBeverageHandler(req.body, id);
    const beverage = await onGetBeverageHandler(id)
    new SuccessResponse("success", beverage).send(res);
  }
);

/**
 * Delete existing veberage .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const deleteBeverage = asyncHandler(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const beverageDelete = await onGetBeverageHandler(id)
  if (beverageDelete == null) {
    throw new BadRequestError("Beverage doesn't existe")
  }
  await onDeleteBeverageHandler(id);
  new SuccessMsgResponse("deleting successfull").send(res)

})