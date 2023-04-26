import jwt, { JwtPayload } from 'jsonwebtoken'
import _ from 'lodash';
import { Request, Response } from 'express';
import { InternalError, BadTokenError } from '../handler/apiError';

//this one calls the one below it

export type userJwtPayload = {
    id: number,
    nom: string,
    prenom: string,
    email: string,
    role: string;
    telephone: string | null,
    clientId?:number , 
    picture? : string | null
}

const createToken = (payload:object, secretKey:string, expiresIn:string) =>
    jwt.sign(payload, secretKey, {expiresIn});

export const createTokens = (userPayload:object) => {
    const token = createToken(
        {user : userPayload},
        `${process.env.JWT_SECRET}`,
        `${process.env.JWT_ACCESS_TOKEN_EXPIRES}`
    );
    const refreshToken = createToken(
        {user : userPayload},
        `${process.env.JWT_REFRESH_SECRET}`,
        `${process.env.JWT_REFRESH_TOKEN_EXPIRES}`
    );

    return [token, refreshToken];
};

export const removeTokens = (res: Response) => {
    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false
    };
    res.clearCookie('accessToken', cookieOption);
    res.clearCookie('refreshToken', cookieOption);
}

export const createCookie = (res: Response, token:string, name:string, expiresIn:number) => {
    const cookieOption = {
        httpOnly: true,
        expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "production" ? true : false
    };
    
    return res.cookie(name, token, cookieOption);
};