/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NextFunction , Request , Response } from "express";
import { isAC } from "../../enums/rolesEnum";
import { BadRequestError, ForbiddenError, InternalError } from "../../handler/apiError";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import { onAddAdvertisementHandler, onDeleteAdvertisementHandler, onGetAdvertisementByIdHandler, onGetAllAdvertisementHandler } from "../../services/advertisementService";
import { onGetAdvertiserByIdHandler } from "../../services/advertiserService";
import { onGetBeverageHandler } from "../../services/beverageService";

export const addAdvertisement = asyncHandler( async  (req : Request , res : Response , next : NextFunction) => {
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const { error } = schema.advertisementScheama.validate(req.body) 
    if (error) {
         throw new BadRequestError(error.details[0].message)
    }
    const _advertiser = await onGetAdvertiserByIdHandler(req.body.advertiser)
    if (_advertiser === null ) {
        throw new BadRequestError("Advertiser doesn't existe")
    }
    if (req.body.beverage) {
        const _beverage = await onGetBeverageHandler(req.body.beverage)
        if (_beverage == null) {
            throw new BadRequestError("Beverage doesn't existe")
        }
    }
    const _adver = await onAddAdvertisementHandler(req.body)
    if (_adver === null ) {
        throw new BadRequestError("Creation error")
    }
    new SuccessMsgResponse("success").send(res);

})

export const getAllAdvertisement = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
  
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const _advers  = await onGetAllAdvertisementHandler();
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