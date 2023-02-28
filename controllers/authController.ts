import  {Request,Response} from "express"
import { HandlError } from "../middlwares/authMiddlware"
import bcrypt from "bcrypt";
import { PrismaClient ,Prisma} from '@prisma/client'
const prisma = new PrismaClient()




type userInfo = {
    email : string,
    password : string,
    name : string
}


// login user
export const loginController = async(req:Request , res:Response) => {
    try{
        const user : userInfo = req.body;
        
        
        
        const userAuth = await prisma.user.findUnique({
            where : {
                email :user.email
                
            }
        })
        
        if (userAuth) {
            const auth = await bcrypt.compare(user.password , userAuth.password);
            if (auth) {
                res.status(200).send({result : userAuth})
            }
            throw Error('incorrect Password');
        }
    
        throw Error('incorrect Email');
    }
    
    catch(err : Prisma.PrismaClientKnownRequestError | unknown | ErrorEvent) {
        console.log(err)
        if (err !== undefined) {
            const error = HandlError(<Prisma.PrismaClientKnownRequestError | ErrorEvent>err);
            res.status(403).send({error: error});
          }
    }

    

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
        res.status(200).send({result : userAuth});
    }
    catch(err: Prisma.PrismaClientKnownRequestError | unknown ) {
          if (err !== undefined) {
            const error = HandlError(<Prisma.PrismaClientKnownRequestError>err);
            res.status(400).send({error: error});
          }
        
    }


    

}