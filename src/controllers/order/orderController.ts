import { BadRequestError } from "../../handler/apiError";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/apiResponse";
import {Request , Response , NextFunction } from "express"
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { onAddOrderHandler, onDeleteOrderHandler, onGetAllOrderHandler, onGetOrderHandler, onGetOrdersOfConsumerHandler, onGetOrdersOfMacineHandler, onUpdateOrderHandler } from "../../services/orderService";



/**
 * Get All orders existe in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getAllOrders = asyncHandler( async ( req : Request , res : Response , next : NextFunction ) => {
       const data = await onGetAllOrderHandler();
        if (data === null ){
            next(new BadRequestError());
        }else {
            new SuccessResponse("sucess" , data ).send(res);
        }

})

/**
 * Get order by id 
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getOrder = asyncHandler( async ( req : Request , res : Response , next : NextFunction ) => {
        const id = parseInt( req.params.id )
        const order = await onGetOrderHandler(id);
        if (order === null ){
             next(new BadRequestError("Order Doesn't existe"));
        }else {
            new SuccessResponse("sucess" , order).send(res);         
        }

})

/**
 * get Orders of vendingMachine
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getOrdersOfMachine = asyncHandler( async( req : Request , res  :Response , next : NextFunction ) => {
        const idMachine = parseInt(req.params.id)
        const orders = await onGetOrdersOfMacineHandler(idMachine)
        if (orders === null ){
            next(new BadRequestError());
       }else {
           new SuccessResponse("sucess" , orders).send(res);         
       }

})

/**
 * get Orders of client
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getOrdersOfClient = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
        const idClient = parseInt(req.params.id)
        const orders = await onGetOrdersOfConsumerHandler(idClient)
        if (orders === null ){
            next(new BadRequestError("Order Doesn't existe"));
       }else {
           new SuccessResponse("sucess" , orders).send(res);         
       }
})

/**
 * Add Order of client in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const addOrder = asyncHandler( async ( req : Request , res : Response , next : NextFunction ) => {
    
    const { error } = schema.orderSchema.validate(req.body) 
    if (error) {
         throw new BadRequestError(error.details[0].message)
    }
    const order = await onAddOrderHandler(req.body)
    new SuccessResponse("sucess" , order).send(res);
})

/**
 * Update orders in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const updateOrder = asyncHandler( async ( req : Request , res : Response , next : NextFunction ) => {
        const id = parseInt(req.params.id)
        const OrderUpdate = await onGetOrderHandler(id);
        if (OrderUpdate == null) {
         throw new BadRequestError("Order doesn't existe")
        }
        await onUpdateOrderHandler(req.body,id);
        const order = await onGetOrderHandler(id);
        new SuccessResponse("success",order).send(res);

})

/**
 * Delete existing order .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const deleteOrder = asyncHandler( async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = parseInt(req.params.id);
    const OrderDelete = await onGetOrderHandler(id);
    if (OrderDelete == null) {
     throw new BadRequestError("Order doesn't existe")
    }
    await onDeleteOrderHandler(id)
    new SuccessMsgResponse("deleting successfull").send(res)
  
  })