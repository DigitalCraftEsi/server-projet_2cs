import  {NextFunction, Request,Response} from "express"
import { HandlError } from "../middlwares/authMiddlware"
import bcrypt from "bcrypt";
import { PrismaClient ,Prisma} from '@prisma/client'
import { AuthFailureError } from "../handler/apiError";
import {  SuccessResponse } from "../handler/ApiResponse";
const prisma = new PrismaClient()




type userInfo = {
    email : string,
    password : string,
    name : string
}


// login user
export const loginController = async(req:Request , res:Response,next : NextFunction) => {
 
        const user : userInfo = req.body; 
        const userAuth = await prisma.user.findUnique({
            where : {
            email :user.email
                
            }
        }) 
        if (userAuth) {
            const auth = await bcrypt.compare(user.password , userAuth.password);
            if (auth) {

                new SuccessResponse("",userAuth).send(res);
            }
            else next(new AuthFailureError("incorrect password"));
            
        }else  next(new AuthFailureError("incorrect email"));
        return next();
}

// register user
export const registerController = async(req:Request , res:Response) => {
    try {
        
        const user : userInfo = req.body;
        const salt:string = await bcrypt.genSalt();
        const passwordHash:string = await bcrypt.hash(user.password , salt);
        user.password = passwordHash;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userAuth = await prisma.user.create({
            data  : user
        })
        new SuccessResponse("",userAuth).send(res);
    }
    catch(err: Prisma.PrismaClientKnownRequestError | unknown ) {
          if (err !== undefined) {
            const error = HandlError(<Prisma.PrismaClientKnownRequestError>err);
            res.status(400).send({error: error});
          }
        
    }


    

}