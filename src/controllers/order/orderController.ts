/* eslint-disable @typescript-eslint/no-inferrable-types */
import { BadRequestError, ForbiddenError, InternalError } from "../../handler/apiError";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/apiResponse";
import {Request , Response , NextFunction } from "express"
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { onAddBeverageOfOrderHandler, onAddOrderHandler, onDeleteOrderHandler, onGetAllOrderHandler, onGetOrderHandler, onGetOrdersOfConsumerHandler, onGetOrdersOfMacineHandler, onUpdateOrderHandler } from "../../services/orderService";
import { isConsumer } from "../../enums/rolesEnum";
import { onGetMachineHander } from "../../services/machinService";
import { onGetConsumerHandler } from "../../services/userService";
import { onGetBeverageHandler } from "../../services/beverageService";



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
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isConsumer(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const _data = {
        "dateCommande" : req.body.date,
        "idConsommateur" : req.body.consumer,
        "idDistributeur" : req.body.machine,
        "prix" : 0
    }
    const { error } = schema.orderSchema.validate(req.body) 
    if (error) {
         throw new BadRequestError(error.details[0].message)
    }

    const _beverages = req.body.beverages 
    const _machine = await onGetMachineHander(_data.idDistributeur);
    if (_machine == null) {
      throw new BadRequestError("Machine doesn't existe")
    }
    const _consumer = await onGetConsumerHandler(_data.idConsommateur);
    if (_consumer == null) {
        throw new BadRequestError("Consumer doesn't existe")
    }
    const order = await onAddOrderHandler(_data)
    let price : number = 0;
    for (let i = 0 ; i < _beverages.length ; i++) {
        const _beverage = await onGetBeverageHandler(_beverages[i].id);
        if (_beverage == null) {
            await onDeleteOrderHandler(order.idCommande);
            throw new BadRequestError("Beverage doesn't existe")
        }
        price += _beverage.tarif * _beverages[i].qty;
        await onAddBeverageOfOrderHandler({                
            idBoisson : _beverage.idBoisson,
            idCommande : order.idCommande,
            Quantite : _beverages[i].qty
        })
    }
    await onUpdateOrderHandler({prix : price},order.idCommande)

    new SuccessResponse("sucess" , {...order,prix : price}).send(res);
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