/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction , Response , Request} from "express";
import asyncHandler from "../../handler/asyncHandler";
import { isDecideur } from "../../enums/rolesEnum";
import { ForbiddenError, InternalError } from "../../handler/apiError";
import { onGetMachineByClient } from "../../services/machinService";
import { SuccessResponse } from "../../handler/ApiResponse";
import { onGetOrderHandler, onGetOrderOfClientHandler } from "../../services/orderService";
import { commandeStatus } from "@prisma/client";


export const getStatictic = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new InternalError('User not found');
        }
        // eslint-disable-next-line prefer-const
        let user = req.user

        if (!isDecideur(user.role)) {
            throw new ForbiddenError('Permission denied');
        }


        const orders = await onGetOrderOfClientHandler(user.clientId)

        // Group items by address
        const groupedData1 = (orders as any[]).reduce((acc, item) => {
            const address = item.distributeur.adresse;
            if (!acc[address]) {
            acc[address] = 0;
            }
            acc[address] ++;
            return acc;
        }, {});
        // Create a new table with grouped items
        const data1 = Object.entries(groupedData1).map(([address, items]) => ({
            address,
            taux : items ,
        }));

        const address = data1.map(it =>it.address);
        const taux = data1.map(it=>it.taux);


        let orderSucessMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
        let orderFailedMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
          // Set count to 0 for months with no elements
          for (let month = 0; month < 12; month++) {
                orderSucessMonth[month] = 0;
        }
        (orders as any[]).filter(it =>it.status == commandeStatus.terminee).forEach(item => {
            const date = new Date(item.dateCommande);
            const month = date.getMonth();
            orderSucessMonth[month] ++;
        })
        for (let month = 0; month < 12; month++) {
            orderFailedMonth[month] = 0;
        }
        (orders as any[]).filter(it =>it.status == commandeStatus.echouee).forEach(item => {
            const date = new Date(item.dateCommande);
            const month = date.getMonth();
            orderFailedMonth[month] ++;
        })


        new SuccessResponse("sucess",{statistic1 : {address , taux} , statistic2_Month : {success : orderSucessMonth , failed : orderFailedMonth} }).send(res);
                
    })