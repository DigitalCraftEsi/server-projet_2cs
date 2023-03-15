import { PrismaClient } from "@prisma/client"
import { BadRequestError } from "../../handler/apiError";
import { SuccessResponse } from "../../handler/apiResponse";
import {Request , Response , NextFunction } from "express"
import asyncHandler from "../../handler/asyncHandler";

const prisma = new PrismaClient();

/**
 * Get All orders existe in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getAllOrders = asyncHandler( async ( req : Request , res : Response , next : NextFunction ) => {
        const data = await prisma.commande.findMany();
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
        const order = await prisma.commande.findFirst({where : {
            idCommande : id
        }})
        if (order === null ){
             next(new BadRequestError());
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
        const orders = await prisma.commande.findMany({
            where : {
                idDistributeur : idMachine
            }
        })
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
        const orders = await prisma.commande.findMany({
            where : {
                idConsommateur : idClient
            }
        })
        if (orders === null ){
            next(new BadRequestError());
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
        const {  dateCommande  , idConsommateur , idDistributeur ,} = req.body;
        const order = await prisma.commande.create({
            data : {
                dateCommande ,
                idConsommateur,
                idDistributeur
            }
        })
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
        const {  dateCommande  , idConsommateur , idDistributeur ,} = req.body;
        await prisma.commande.updateMany({
            where : {
               idCommande : id
            },
            data : {
                dateCommande ,
                idConsommateur , 
                idDistributeur
            }
        })
        const order = await prisma.commande.findUnique({
            where: { idCommande:id },
          });
        new SuccessResponse("success",order).send(res);

})