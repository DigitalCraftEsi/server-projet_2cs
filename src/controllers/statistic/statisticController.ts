import { NextFunction , Response , Request} from "express";
import asyncHandler from "../../handler/asyncHandler";
import { isDecideur } from "../../enums/rolesEnum";
import { ForbiddenError, InternalError } from "../../handler/apiError";
import { onGetMachineByClient } from "../../services/machinService";
import { SuccessResponse } from "../../handler/ApiResponse";


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

        const machines = await  onGetMachineByClient(user.clientId);
        new SuccessResponse("sucess",machines).send(res);
                
    })