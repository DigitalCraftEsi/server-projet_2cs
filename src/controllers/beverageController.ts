import { PrismaClient } from "@prisma/client";
import { NextFunction , Request , Response } from "express";
import { BadRequestError } from "../handler/apiError";
import { SuccessResponse } from "../handler/ApiResponse";
const prisma = new PrismaClient();

export const getBeveragesOfMachin = async ( req : Request , res : Response , next : NextFunction ) => {
    try {
        const id = parseInt(req.params.id) ;
        const beverages = await prisma.boisson.findMany({where : {idDistributeur : id}});
        new SuccessResponse("",beverages).send(res);
    }
    catch( err : unknown ) {
        next(new BadRequestError());
    }
}

export const getBeverage = async ( req : Request , res : Response , next : NextFunction ) => {
    try {
        const id = parseInt(req.params.id) ;
        const beverages = await prisma.boisson.findFirst({where : {idBoisson : id}});
        new SuccessResponse("",beverages).send(res);
    }
    catch( err : unknown ) {
        next(new BadRequestError());
    }
}


export const getBeverages = async ( req : Request , res : Response , next : NextFunction ) => {
    try {
        const beverages = await prisma.boisson.findMany();
        new SuccessResponse("",beverages).send(res);
    }
    catch( err : unknown ) {
        next(new BadRequestError())
    }
}


export const addbeverage = async ( req : Request , res : Response , next : NextFunction ) => {
    try {
        const  { nom , price , idMachine } = req.body;
        const newBeverage = await prisma.boisson.create({
            data : {
                nomBoisson : nom,
                tarif : price,
                idDistributeur  : idMachine,
            }
        })
        new SuccessResponse("",newBeverage).send(res);
    }
    catch(err : unknown) {
        console.log(err)
        next(new BadRequestError());
    }
}

export const updateBeverage = async ( req : Request , res : Response , next : NextFunction ) => {
    try {
        const  { nom , price , idMachine } = req.body;
        const id = parseInt(req.params.id);
        const data = await prisma.boisson.updateMany({
            where: { idBoisson: id },
            data: {
                nomBoisson : nom , 
                tarif : price ,
                idDistributeur  : idMachine 
            }
        })
        new SuccessResponse("success",data ).send(res);
    }
    catch(err : unknown) {
        next(new BadRequestError());
    }
}