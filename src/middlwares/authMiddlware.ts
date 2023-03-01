import {  Prisma } from '@prisma/client'

type Error = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

export const HandlError  = (err : Prisma.PrismaClientKnownRequestError | ErrorEvent) : Error => {
    const errors : Error =  {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
    };
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if ( (<Prisma.PrismaClientKnownRequestError>err).code === "P2002") {
            errors.email = "this email is already registred"
        }
    }else {
        if (err.message == "incorrect Password") {
            errors.password = "this password is incorrect"
        }
        if (err.message == "incorrect Email") {
            errors.email = "this email is incorrect"
        }
    }


    return errors ;
  };

