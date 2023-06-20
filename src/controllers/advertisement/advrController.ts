/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NextFunction , Request , Response } from "express";
import { isAC } from "../../enums/rolesEnum";
import { BadRequestError, ForbiddenError, InternalError } from "../../handler/apiError";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import { onAddAdvertisementHandler, onDeleteAdvertisementHandler, onGetAdvertisemenOfAdvertisertHandler, onGetAdvertisementByIdHandler, onGetAllAdvertisementHandler } from "../../services/advertisementService";
import { onGetAdvertiserByIdHandler } from "../../services/advertiserService";
import { onGetBeverageHandler } from "../../services/beverageService";
import { onGetMachineHander } from "../../services/machinService";

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

  

  
export const addAdvertisement = asyncHandler( async  (req : RequestWithFile , res : Response , next : NextFunction) => {
    
    console.log(req.file)
    if (!req.user) {
        throw new InternalError('User not found');
    }

    const { error } = schema.advertisementScheama.validate(req.body) 
    if (error) {
         throw new BadRequestError(error.details[0].message)
    }
    const _advertiser = await onGetAdvertiserByIdHandler(parseInt(req.body.advertiser))
    if (_advertiser === null ) {
        throw new BadRequestError("Advertiser doesn't existe")
    }
    const _machine = await onGetMachineHander(parseInt(req.body.advertiser))
    if (_machine === null ) {
        throw new BadRequestError("Machine doesn't existe")
    }
    if (req.body.beverage) {
        const _beverage = await onGetBeverageHandler(parseInt(req.body.beverage))
        if (_beverage == null) {
            throw new BadRequestError("Beverage doesn't existe")
        }
    }
    if (!req.file == null) {
        throw new BadRequestError("Video is required")
    }

    const _adver = await onAddAdvertisementHandler(req.body,req.file.filename)
    if (_adver === null ) {
        throw new BadRequestError("Creation error")
    }
    new SuccessMsgResponse("success").send(res);

})

export const getAllAdvertisement = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
  
    if (!req.user) {
        throw new InternalError('User not found');
    }


    if (req.query.search) {
        const _advers  = await onGetAdvertisemenOfAdvertisertHandler(parseInt(req.query.search.toString()));
        if (_advers === null ) {
            throw new BadRequestError()
        }
        new SuccessResponse("success",_advers).send(res);
    }else {
        const _advers  = await onGetAllAdvertisementHandler();
        if (_advers === null ) {
            throw new BadRequestError()
        }
        new SuccessResponse("success",_advers).send(res);
    }

})

export const getAllAdvertisementOfAdvertiser = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
  
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    if (!req.params.id) {
        throw new BadRequestError("id of advertiser is obligated")
    }
    const _advers  = await onGetAdvertisemenOfAdvertisertHandler(parseInt(req.params.id));
    if (_advers === null ) {
        throw new BadRequestError()
    }
    new SuccessResponse("success",_advers).send(res);
})

export const getAdvertisement = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    const _advertiser  = await onGetAdvertisementByIdHandler(id);
    if (_advertiser === null ) {
        throw new BadRequestError("advertisement doesn't existe")
    }
    new SuccessResponse("success",_advertiser).send(res);
})


export const deleteAdvertisement = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {

    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    const _advertiser  = await onGetAdvertisementByIdHandler(id);
    if (_advertiser === null ) {
        throw new BadRequestError("advertisement doesn't existe")
    }
    await onDeleteAdvertisementHandler(id);

    new SuccessMsgResponse("success").send(res);
})