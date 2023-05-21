import { onAddResponeOfReclamation, onDeleteResponseHandler, onGetAllResponseHandler, onGetAllResponseOfACHandler, onGetResponseByIDHandler, onUpdateResponseHandler } from "../../services/responseService";
import { BadRequestError, ForbiddenError, InternalError } from "../../handler/apiError";
import asyncHandler from "../../handler/asyncHandler";
import {Request , Response ,NextFunction} from "express"
import { SuccessResponse } from "../../handler/ApiResponse";
import schema from "./schema";
import { ROLES } from "../../enums/rolesEnum";

export const getAllResponse = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }
        let _res ;
        if (req.query.ac){
            _res = await onGetAllResponseOfACHandler(parseInt(req.query.ac.toString()));
        }else {
            _res =  await onGetAllResponseHandler();
        }
        if (_res === null) {
            throw new BadRequestError()
        } 
        new SuccessResponse('success', _res).send(res)

})

export const getResponse = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }
        if (!req.params.id ){
            throw new BadRequestError()
        }
        const _res = await onGetResponseByIDHandler(parseInt(req.params.id))
        if (_res === null) {
            throw new BadRequestError()
        } 
        new SuccessResponse('success', _res).send(res)

})


export const addResponse = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                throw new InternalError('User not found');
            }
            if (req.user.role !=  ROLES.AC) {
                throw new ForbiddenError('Permission denied');
            }
            const { error } = schema.addResponseSchema.validate(req.body)
            if (error) {
              throw new BadRequestError(error.details[0].message)
            }
            const _res = await onAddResponeOfReclamation({...req.body,ac : req.user.id});
            if (_res === null) {
                throw new BadRequestError()
            } 
    
           new SuccessResponse('success', _res).send(res)
    
})

export const updateResponse = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }
        const { error } = schema.updateResponseSchema.validate(req.body)
        if (error) {
          throw new BadRequestError(error.details[0].message)
        }
        const response = await onGetResponseByIDHandler(parseInt(req.params.id));
        if (!response ){
            throw new BadRequestError("Response doesnt existe")
        }
        const _res = await onUpdateResponseHandler(req.body,parseInt(req.params.id));
        if (_res === null) {
            throw new BadRequestError()
        } 

        new SuccessResponse('success', _res).send(res)

})

export const deleteResponse = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }
        const response = await onGetResponseByIDHandler(parseInt(req.params.id));
        console.log(response,req.params.id)
        if (!response ){
            throw new BadRequestError("Response doesnt existe")
        }
 
        const _res = await onDeleteResponseHandler(parseInt(req.params.id));
        if (_res === null) {
            throw new BadRequestError()
        } 
        new SuccessResponse('success', _res).send(res)
})