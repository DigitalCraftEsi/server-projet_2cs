/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client'
import { AuthFailureError } from '../../handler/apiError';
import { SuccessMsgResponse, SuccessResponse } from '../../handler/apiResponse';
import asyncHandler from '../../handler/asyncHandler';
import schema from './schema'
import { BadRequestError, BadTokenError, InternalError } from '../../handler/apiError';
import { createTokens, removeTokens, createCookie } from '../../utils/token';
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ROLES } from '../../enums/rolesEnum';

const prisma = new PrismaClient()

type userInfo = {
    email: string,
    password: string,
}

type userJwtPayload = {
    id: number,
    nom: string,
    prenom: string,
    email: string,
    role: string;
    telephone: string | null,
}

// login user
export const loginController = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const { error } = schema.loginSchema.validate(req.body);

    if (error) {
        throw new BadRequestError(error.details[0].message)
    }

    let userFetched, passwordFetched;
    let userPayload: userJwtPayload;
    const user: userInfo = req.body;
    // ['sadm', 'adm', 'agent_commerciale', 'agent_maitenance', 'decideur']

    // eslint-disable-next-line prefer-const
    let role = '';

    userFetched = await prisma.sadm.findUnique({
        where: {
            emailSADM: user.email
        }
    })



    if (userFetched) {
        passwordFetched = userFetched.motDePasseSADM;
        userPayload = {
            id: userFetched.idSADM,
            nom: userFetched.nomSADM,
            prenom: userFetched.prenomSADM,
            email: userFetched.emailSADM,
            role: ROLES.SADM,
            telephone: userFetched.telephoneSADM,
        };
    }
    else {
        userFetched = await prisma.adm.findUnique({
            where: {
                emailADM: user.email
            }
        })

        if (userFetched) {
            passwordFetched = userFetched.motDePasseADM;
            userPayload = {
                id: userFetched.idADM,
                nom: userFetched.nomADM,
                prenom: userFetched.prenomADM,
                email: userFetched.emailADM,
                role: ROLES.ADM,
                telephone: userFetched.telephoneADM,
            };
        }
        else {
            userFetched = await prisma.ac.findUnique({
                where: {
                    emailAC: user.email
                }
            })

            if (userFetched) {
                passwordFetched = userFetched.motDePasseAC;
                userPayload = {
                    id: userFetched.idAC,
                    nom: userFetched.nomAc,
                    prenom: userFetched.prenomAC,
                    email: userFetched.emailAC,
                    role: ROLES.AC,
                    telephone: userFetched.telephoneAC,
                };
            }
            else {
                userFetched = await prisma.am.findUnique({
                    where: {
                        emailAM: user.email
                    }
                })

                if (userFetched) {
                    passwordFetched = userFetched.motDePasseAM;
                    userPayload = {
                        id: userFetched.idAM,
                        nom: userFetched.nomAM,
                        prenom: userFetched.prenomAM,
                        email: userFetched.emailAM,
                        role: ROLES.AM,
                        telephone: userFetched.telephoneAM,
                    };
                } else {
                    userFetched = await prisma.decideur.findUnique({
                        where: {
                            emailDecideur: user.email
                        }
                    })

                    if (userFetched) {
                        passwordFetched = userFetched.motDePasseDecideur;
                        userPayload = {
                            id: userFetched.idDecideur,
                            nom: userFetched.nomDecideur,
                            prenom: userFetched.prenomDecideur,
                            email: userFetched.emailDecideur,
                            role: ROLES.AM,
                            telephone: userFetched.telephoneDecideur,
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

    const [token, refreshToken] = createTokens({ user: userPayload })
    createCookie(res, token, 'accessToken', Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRES));
    createCookie(res, refreshToken, 'refreshToken', Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES));

    new SuccessResponse('Login succesful',userPayload).send(res);

    return next();
});

export const verifyAuth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const token: string = req.cookies.accessToken;
    if (!token) {
        throw new BadTokenError()
    }

    let decoded;
    let tokenIsExpired = false;

    try {
        decoded = jwt.verify(token, `${process.env.JWT_SECRET}`) as {
            user: userJwtPayload,
            iat: number,
        }
    } catch (err: unknown) {
        if (err instanceof TokenExpiredError) {
            tokenIsExpired = true
        } else {
            removeTokens(res)
            throw new AuthFailureError();
        }
    }

    let userFetched;

    switch (decoded?.user.role) {
        case ROLES.SADM:
            userFetched = await prisma.sadm.findUnique({
                where: {
                    idSADM: decoded.user.id
                }
            })
            break;
        case ROLES.ADM:
            userFetched = await prisma.adm.findUnique({
                where: {
                    idADM: decoded.user.id
                }
            })
            break;
        case ROLES.AC:
            userFetched = await prisma.ac.findUnique({
                where: {
                    idAC: decoded.user.id
                }
            })
            break;
        case ROLES.AM:
            userFetched = await prisma.am.findUnique({
                where: {
                    idAM: decoded.user.id
                }
            })
            break;
        case ROLES.DECIDEUR:
            userFetched = await prisma.decideur.findUnique({
                where: {
                    idDecideur: decoded.user.id
                }
            })
            break;
        default:
            throw new InternalError('Unknown role')
    }

    if (!userFetched) {
        removeTokens(res)
        throw new InternalError('User not found')
    }

    // req.user = user.toJSON()


    // const passwordChangeAt = Math.round(
    //     new Date(`${user.toJSON().changedPassword}`).getTime() / 1000
    // );

    // if (passwordChangeAt > decoded.iat) {
    //     removeTokens(res)
    //     throw new AuthFailureError('Session expirée, Veuillez vous reconnecter.');
    // }

    if (tokenIsExpired) {
        try {
            jwt.verify(req.cookies.refreshToken, `${process.env.JWT_REFRESH_SECRET}`);
        } catch (err) {
            throw new BadTokenError('Bad refresh token');
        }

        const [newAccessToken, newRefreshToken] = createTokens(decoded.user);

        createCookie(res, newAccessToken, 'accessToken', Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRES));
        createCookie(res, newRefreshToken, 'refreshToken', Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES));

    }

    req.user = decoded?.user;

    next();
})
