/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { AuthFailureError } from '../../handler/apiError';
import { SuccessMsgResponse, SuccessResponse } from '../../handler/ApiResponse';
import asyncHandler from '../../handler/asyncHandler';
import schema from './schema'
import { BadRequestError, BadTokenError, InternalError } from '../../handler/apiError';
import { createTokens, removeTokens, createCookie } from '../../utils/token';
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ROLES } from '../../enums/rolesEnum';
import { userJwtPayload } from '../../utils/token';
import { onGetACHandler, onGetADMHandler, onGetAMHandler, onGetCONSUMERHandler, onGetDECIDEURHandler, onGetSADMHandler } from "../../services/userService";
import { consommateur } from '@prisma/client';
import { prismaClientSingleton } from '../../utils/prismaClient';

type userInfo = {
    email: string,
    password: string,
}

// login user
export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { error } = schema.loginSchema.validate(req.body);

    if (error) {
        throw new BadRequestError(error.details[0].message)
    }


    let userFetched, passwordFetched: string;
    let userPayload: userJwtPayload;
    const user: userInfo = req.body;

    userFetched = await onGetSADMHandler(user.email)

    if (userFetched) {
        passwordFetched = userFetched.motDePasseSADM;
        userPayload = {
            id: userFetched.idSADM,
            nom: userFetched.nomSADM,
            prenom: userFetched.prenomSADM,
            email: userFetched.emailSADM,
            role: ROLES.SADM,
            telephone: userFetched.telephoneSADM,
            picture: userFetched.picture ? userFetched.picture : ''
        };
    }
    else {
        userFetched = await onGetADMHandler(user.email)

        if (userFetched) {
            passwordFetched = userFetched.motDePasseADM;
            userPayload = {
                id: userFetched.idADM,
                nom: userFetched.nomADM,
                prenom: userFetched.prenomADM,
                email: userFetched.emailADM,
                role: ROLES.ADM,
                telephone: userFetched.telephoneADM,
                clientId: userFetched.idClient,
                picture: userFetched.picture ? userFetched.picture : ''
            };
        }
        else {
            userFetched = await onGetACHandler(user.email)

            if (userFetched) {
                passwordFetched = userFetched.motDePasseAC;
                userPayload = {
                    id: userFetched.idAC,
                    nom: userFetched.nomAC,
                    prenom: userFetched.prenomAC,
                    email: userFetched.emailAC,
                    role: ROLES.AC,
                    telephone: userFetched.telephoneAC,
                    clientId: userFetched.idClient,
                    picture: userFetched.picture ? userFetched.picture : ''
                };
            }
            else {
                userFetched = await onGetAMHandler(user.email)

                if (userFetched) {
                    passwordFetched = userFetched.motDePasseAM;
                    userPayload = {
                        id: userFetched.idAM,
                        nom: userFetched.nomAM,
                        prenom: userFetched.prenomAM,
                        email: userFetched.emailAM,
                        role: ROLES.AM,
                        telephone: userFetched.telephoneAM,
                        clientId: userFetched.idClient,
                        picture: userFetched.picture ? userFetched.picture : ''
                    };
                } else {
                    userFetched = await onGetDECIDEURHandler(user.email)

                    if (userFetched) {
                        passwordFetched = userFetched.motDePasseDecideur;
                        userPayload = {
                            id: userFetched.idDecideur,
                            nom: userFetched.nomDecideur,
                            prenom: userFetched.prenomDecideur,
                            email: userFetched.emailDecideur,
                            role: ROLES.DECIDEUR,
                            telephone: userFetched.telephoneDecideur,
                            clientId: userFetched.idClient,
                            picture: userFetched.picture ? userFetched.picture : ''
                        };
                    } else {
                        throw new AuthFailureError('Incorrect email');
                    }
                }
            }
        }
    }

    const match: boolean = await bcrypt.compare(user.password, passwordFetched);
    if (!match)
        throw new AuthFailureError('Incorrect password');

    const [token, refreshToken] = createTokens(userPayload)
    const expiresInRegex = new RegExp(/[0-9]+/)
    const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES.match(expiresInRegex)[0]

    new SuccessResponse('Login succesful', { ...userPayload, token, refreshToken, expiresIn }).send(res);

    return next();
});

export const refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.refreshToken){
        throw new BadRequestError("Refresh token required");
    }

    let decoded;

    try {
        decoded = jwt.verify(req.body.refreshToken, `${process.env.JWT_REFRESH_SECRET}`);
    } catch (err) {
        throw new BadTokenError('Cannot verify refresh token, please login');
    }

    let userFetched: any;

    switch (decoded?.user.role) {
        case ROLES.SADM:
            userFetched = await onGetSADMHandler(decoded.user.id)
            break;
        case ROLES.ADM:
            userFetched = await onGetADMHandler(decoded.user.id)
            break;
        case ROLES.AC:
            userFetched = await onGetACHandler(decoded.user.id)
            break;
        case ROLES.AM:
            userFetched = await onGetAMHandler(decoded.user.id)
            break;
        case ROLES.DECIDEUR:
            userFetched = await onGetDECIDEURHandler(decoded.user.id)
            break;
        case ROLES.CONSUMER : 
            userFetched = await onGetCONSUMERHandler(decoded.user.id);
            break;
        default:
            throw new InternalError('Unknown role')
    }

    if (!userFetched) {
        removeTokens(res)
        throw new InternalError('User not found')
    }

    const [token, refreshToken] = createTokens(decoded.user)
    const expiresInRegex = new RegExp(/[0-9]+/)
    const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES.match(expiresInRegex)[0]

    new SuccessResponse('Token refreshed', { ...decoded.user, token, refreshToken, expiresIn }).send(res);

})

export const loginConsumer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { error } = schema.loginSchema.validate(req.body);

    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    let userFetched: consommateur, passwordFetched: string;
    let userPayload: userJwtPayload;
    const user: userInfo = req.body;

    userFetched = await onGetCONSUMERHandler(user.email)

    if (userFetched) {
        passwordFetched = userFetched.motDePasseConsommateur;
        userPayload = {
            id: userFetched.idConsommateur,
            nom: userFetched.nomConsommateur,
            prenom: userFetched.prenomConsommateur,
            email: userFetched.emailConsommateur,
            role: ROLES.CONSUMER,
            telephone: userFetched.telephoneConsommateur,
        };

    } else {
        throw new AuthFailureError('Incorrect email');
    }

    const match: boolean = await bcrypt.compare(user.password, passwordFetched);
    if (!match)
        throw new AuthFailureError('Incorrect password');

    const [token, refreshToken] = createTokens(userPayload)
    createCookie(res, token, 'accessToken', Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRES));
    createCookie(res, refreshToken, 'refreshToken', Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES));

    new SuccessResponse('Login succesful', userPayload).send(res);

    return next();
});

export const signUpConsumer = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {


        const { error } = schema.signUpSchema.validate(req.body);

        if (error) {
            throw new BadRequestError(error.details[0].message)
        }

        const userFetched = await onGetCONSUMERHandler(req.body.email)

        if (userFetched) {
            throw new BadRequestError('Email already taken')
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const userObject = {
            nomConsommateur: req.body.nom,
            prenomConsommateur: req.body.prenom,
            emailConsommateur: req.body.email,
            telephoneConsommateur: req.body.telephone,
            motDePasseConsommateur: hashedPassword,
        }

        const { motDePasseConsommateur, ..._consumer } = await prismaClientSingleton.consommateur.create({
            data: userObject
        })
        new SuccessResponse("sucess", _consumer).send(res);
    })

export const verifyAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    let decoded:any;
    
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
    
        decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as {
            user: userJwtPayload,
        }
    } catch (err: unknown) {
        throw new BadTokenError('Please login');
    }

    let userFetched: any;

    switch (decoded?.user.role) {
        case ROLES.SADM:
            userFetched = await onGetSADMHandler(decoded.user.id)
            break;
        case ROLES.ADM:
            userFetched = await onGetADMHandler(decoded.user.id)
            break;
        case ROLES.AC:
            userFetched = await onGetACHandler(decoded.user.id)
            break;
        case ROLES.AM:
            userFetched = await onGetAMHandler(decoded.user.id)
            break;
        case ROLES.DECIDEUR:
            userFetched = await onGetDECIDEURHandler(decoded.user.id)
            break;
        case ROLES.CONSUMER:
            userFetched = await onGetCONSUMERHandler(decoded.user.id);
            break;
        default:
            throw new InternalError('Unknown role')
    }

    if (!userFetched) {
        removeTokens(res)
        throw new InternalError('User not found')
    }

    req.user = decoded?.user;
    next();
})

export const signUp = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        //
    })