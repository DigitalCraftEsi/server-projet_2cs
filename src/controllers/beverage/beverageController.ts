import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../handler/apiError";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/apiResponse";
import asyncHandler from "../../handler/asyncHandler";
import { onAddBeverageHandler, onDeleteBeverageHandler, onGetAllBeverageHandler, onGetBeverageHandler, onGetBeveragesOfMachineHandler, onUpdateBeverageHandler } from "../../services/beverageService";
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
    const beverages = await onGetBeveragesOfMachineHandler(id)
    if (beverages === null ){
        throw new BadRequestError();
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
    const beverage = await onGetBeverageHandler(id);
    if (beverage === null ){
        throw new BadRequestError("Beverage Doesn't existe");
    }else{
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
    const beverages = await onGetAllBeverageHandler();
    if (beverages === null ){
        throw new BadRequestError();
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
         throw new BadRequestError(error.details[0].message)
    }
    const beverage = await onAddBeverageHandler(req.body)
    if (beverage === null ){
        throw new BadRequestError();
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
    const id = parseInt(req.params.id);
    const beverageUpdate = await onGetBeverageHandler(id)
    if (beverageUpdate === null) {
      throw new BadRequestError("Beverage Doesn't existe");
    }
    await onUpdateBeverageHandler(req.body,id);
    const beverage = await onGetBeverageHandler(id)
    new SuccessResponse("success",beverage).send(res);
  }
);

/**
 * Delete existing veberage .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const deleteBeverage = asyncHandler( async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  const beverageDelete = await onGetBeverageHandler(id)
  if (beverageDelete == null ) {
    throw new BadRequestError("Beverage doesn't existe")
  }
  await onDeleteBeverageHandler(id);
  new SuccessMsgResponse("deleting successfull").send(res)

})