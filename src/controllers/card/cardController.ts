import { NextFunction, Request, Response } from "express";
import { BadRequestError, ForbiddenError, InternalError, NotFoundError } from "../../handler/apiError";
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import asyncHandler from "../../handler/asyncHandler";
import { onAddBeverageHandler, onDeleteBeverageHandler, onGetAllBeverageHandler, onGetBeverageHandler, onGetBeveragesOfMachineHandler, onUpdateBeverageHandler } from "../../services/beverageService";
import { onGetMachineBydistUIDHandler } from "../../services/machinService";
import schema from "./schema";
import { isConsumer } from "../../enums/rolesEnum";
import { onAddCardHandler, onDeleteCardHandler, onGetCardByIdHandler, onGetConsumerCardsHandler } from "../../services/cardService";


export const getConsumerCards = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new InternalError('User not found');
        }
        if (!isConsumer(req.user.role)) {
            throw new ForbiddenError('Permission denied');
        }

        const cards = await onGetConsumerCardsHandler(req.user.id);

        return new SuccessResponse("success", cards).send(res);

    }
);

export const addCard = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new InternalError('User not found');
        }
        if (!isConsumer(req.user.role)) {
            throw new ForbiddenError('Permission denied');
        }

        const { error } = schema.cardSchema.validate(req.body)
        if (error) {
            throw new BadRequestError(error.details[0].message)
        }

        const card = await onGetCardByIdHandler(req.body.cardNumber);
        if(card){
            throw new BadRequestError('Card already registred')
        }

        const newCard = await onAddCardHandler(
            req.body.cardNumber,
            req.body.expiryMonth,
            req.body.expiryYear,
            req.body.holderName,
            req.user.id
        )

        return new SuccessResponse("success", newCard).send(res);

    }
);

export const deleteCard = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new InternalError('User not found');
        }
        if (!isConsumer(req.user.role)) {
            throw new ForbiddenError('Permission denied');
        }

        const cardNumber = req.params.id;

        const card = await onGetCardByIdHandler(cardNumber);
        if (!card || card.idConsommateur != req.user.id) {
            throw new NotFoundError();
        }

        const deletedCard = await onDeleteCardHandler(cardNumber)

        new SuccessResponse("card succesfuly deleted", deletedCard).send(res);

    }
);