import { BadRequestError, InternalError } from "../../handler/apiError";
import asyncHandler from "../../handler/asyncHandler";
import {Request , Response ,NextFunction} from "express"
import { onAddReclamationHandler, onDeleteReclamationHandler, onGetAllReclamationsHandler, onGetReclamationsByIdHandler, onUpdateReclamationHandler } from "../../services/reclamationService";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import schema from "./schema";
import { onGetOrderHandler } from "../../services/orderService";


export const getAllReclamations = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }
        const _recs = await onGetAllReclamationsHandler();
        if (_recs === null) {
            throw new BadRequestError()
        } else {
            const _data = [];
            for(let i  =0 ; i<_recs.length ; i++) {
                const commande = await onGetOrderHandler(_recs[i].idCommande)
                _data.push({..._recs[i],commande : commande})
            }
            new SuccessResponse('success', _data).send(res)
        } 

    })


    export const getReclamation = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                throw new InternalError('User not found');
            }
            if (!req.params.id ) {
                throw new BadRequestError("id as a params is required")
            }
            const _recs = await onGetReclamationsByIdHandler(parseInt(req.params.id));
            if (_recs === null) {
                throw new BadRequestError("Reclamation doesnt existe")
            } else {
                const commande = await onGetOrderHandler(_recs.idCommande)
                new SuccessResponse('success', {..._recs,commande}).send(res)
            } 
    
        })

export const AddReclamations = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.user) {
                throw new InternalError('User not found');
            }
            console.log(req.body);
            const { error } = schema.addReclamationSchema.validate(req.body)
            if (error) {
              throw new BadRequestError(error.details[0].message)
            }
            const _data = {
                titre : req.body.title ,
                description : req.body.descr,
                idCommande : parseInt(req.body.order),
                dateReclamation : new Date(),
                notif: true

            }         
            const _recs = await onAddReclamationHandler(_data);
            if (_recs === null) {
                throw new BadRequestError()
            } else {
                new SuccessResponse('success', _recs).send(res)
            } 
    
        })


export const updateReclamations = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }

        if (!req.params.id ) {
            throw new BadRequestError("id as a params is required")
        }
        const id = parseInt(req.params.id)
        const { error } = schema.updateReclamationSchema.validate(req.body)
        if (error) {
          throw new BadRequestError(error.details[0].message)
        }
        const reclamation = onGetReclamationsByIdHandler(id);
        if (!reclamation ){
            throw new BadRequestError("Reclamation doesnt existe")
        }

        const _recs = await onUpdateReclamationHandler(req.body,id);
        if (_recs === null) {
            throw new BadRequestError()
        } else {
            new SuccessResponse('success update', _recs).send(res)
        } 

    })

export const deleteReclamations = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }

        if (!req.params.id ) {
            throw new BadRequestError("id as a params is required")
        }
        const id = parseInt(req.params.id)
        const reclamation = await onGetReclamationsByIdHandler(id);
        if (reclamation == null ){
            throw new BadRequestError("Reclamation doesnt existe")
        }

        await onDeleteReclamationHandler(id);

        new SuccessMsgResponse('delete with sucess').send(res)


    })

 