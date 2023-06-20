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
        const orderSucess = (orders as any[]).filter(it =>it.status == commandeStatus.terminee)
        const orderfailed = (orders as any[]).filter(it =>it.status == commandeStatus.echouee)

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


        // statistic 2 MONTH

        let orderSucessMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
        let orderFailedMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
          // Set count to 0 for months with no elements
          for (let month = 0; month < 12; month++) {
                orderSucessMonth[month] = 0;
        }
        orderSucess.forEach(item => {
            const date = new Date(item.dateCommande);
            const month = date.getMonth();
            orderSucessMonth[month] ++;
        })
        for (let month = 0; month < 12; month++) {
            orderFailedMonth[month] = 0;
        }
        orderfailed.forEach(item => {
            const date = new Date(item.dateCommande);
            const month = date.getMonth();
            orderFailedMonth[month] ++;
        })

        // statistic 2 Year 
        const yearsSucess = [];
        const countByYearSucess = [];

        for (const item of orderSucess) {
            const date = new Date(item.dateCommande);
            const year = date.getFullYear();
        
            if (!yearsSucess.includes(year)) {
                yearsSucess.push(year);
                countByYearSucess.push(1);
            } else {
            const index = yearsSucess.indexOf(year);
            countByYearSucess[index]++;
            }
        }

        const yearsFailed = [];
        const countByYearFailed = [];

        for (const item of orderfailed) {
            const date = new Date(item.dateCommande);
            const year = date.getFullYear();
        
            if (!yearsFailed.includes(year)) {
                yearsFailed.push(year);
                countByYearFailed.push(1);
            } else {
            const index = yearsFailed.indexOf(year);
            countByYearFailed[index]++;
            }
        }

        // statistic 2 WEAK

        const currentDate = new Date();
        const startDate = new Date();
        startDate.setDate(currentDate.getDate() - 28);
        const itemCountsByWeekSucess = [];
        const itemCountsByWeekfailed = [];
        
        for (let i = 0; i < 4; i++) {
          const weekStart = new Date(startDate);
          weekStart.setDate(weekStart.getDate() + i * 7);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekEnd.getDate() + 6);
          const commandsForWeek = orderSucess.filter((command) => {
            const commandDate = new Date(command.dateCommande);
            return commandDate >= weekStart && commandDate <= weekEnd;
          });
        
          const itemCount = commandsForWeek.length;
          itemCountsByWeekSucess.push(itemCount);
        }

        for (let i = 0; i < 4; i++) {
            const weekStart = new Date(startDate);
            weekStart.setDate(weekStart.getDate() + i * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            const commandsForWeek = orderSucess.filter((command) => {
              const commandDate = new Date(command.dateCommande);
              return commandDate >= weekStart && commandDate <= weekEnd;
            });
          
            const itemCount = commandsForWeek.length;
            itemCountsByWeekfailed.push(itemCount);
          }
        new SuccessResponse("sucess",{statistic1 : {address , taux} ,
         statistic2_Month : {success : orderSucessMonth , failed : orderFailedMonth} ,
         statistic2_Week : {success : itemCountsByWeekSucess , failed : itemCountsByWeekfailed} ,
          statistic2_Year : {success : { year : yearsSucess , count :  countByYearSucess} , failed : {year : yearsFailed , count : countByYearFailed}}   }).send(res);
                
    })