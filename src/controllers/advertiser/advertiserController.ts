/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { NextFunction , Request , Response } from "express";
import { isAC } from "../../enums/rolesEnum";
import { BadRequestError, ForbiddenError, InternalError } from "../../handler/apiError";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { onAddAvertiserHandler, onDeleteAdvertiserHandler, onGetAdvertiserByEmailHandler, onGetAdvertiserByIdHandler, onGetAllAdvertiserHandler } from "../../services/advertiserService";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";

export const addAdvertiser = asyncHandler( async  (req : Request , res : Response , next : NextFunction) => {
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }

    const { error } = schema.advertiserSchema.validate(req.body) 
    if (error) {
         throw new BadRequestError(error.details[0].message)
    }
    const _isAdvertiser = await onGetAdvertiserByEmailHandler(req.body.email)
    if (_isAdvertiser != null ) {
        throw new BadRequestError("Advertiser already existe")
    }
    const _advertiser = await onAddAvertiserHandler(req.body)
    if (_advertiser === null ) {
        throw new BadRequestError()
    }
    new SuccessMsgResponse("success").send(res);

})

export const getAllAdvertiser = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
  
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const _advertisers  = await onGetAllAdvertiserHandler();
    if (_advertisers === null ) {
        throw new BadRequestError()
    }
    new SuccessResponse("success",_advertisers).send(res);
})

export const getAdvertiser = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {
    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    const _advertiser  = await onGetAdvertiserByIdHandler(id);
    if (_advertiser === null ) {
        throw new BadRequestError("adveriser doesn't existe")
    }
    new SuccessResponse("success",_advertiser).send(res);
})


export const deleteAdvertiser = asyncHandler( async ( req : Request , res  :Response , next : NextFunction ) => {

    if (!req.user) {
        throw new InternalError('User not found');
    }
    if (!isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    const _advertiser  = await onGetAdvertiserByIdHandler(id);
    if (_advertiser === null ) {
        throw new BadRequestError("adveriser doesn't existe")
    }
    await onDeleteAdvertiserHandler(id);

    new SuccessMsgResponse("success").send(res);
})