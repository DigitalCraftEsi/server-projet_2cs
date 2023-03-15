import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { BadRequestError, ForbiddenError, InternalError, NotFoundError } from "../../handler/apiError";
import { isSADM, isADM, isAC, isAM, isDecideur, isClient, ROLES } from "../../enums/rolesEnum";
import { SuccessCreationResponse, SuccessMsgResponse } from "../../handler/apiResponse";
import { prismaClientSingleton } from "../../utils/prismaClient";
import bcrypt from 'bcrypt';

//TODO Update user And ensure EMAIL is unique across tables

export const addUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new InternalError('User not found');
        }

        let user = req.user

        if (isADM(user.role)) {
            if (!isAC(req.body.role)
                && !isAM(req.body.role)
                && !isDecideur(req.body.role))
                throw new ForbiddenError('Permission denied');

        } else if (isSADM(user.role)) {
            if (!isADM(req.body.role)
                && !isClient(req.body.role)) {
                throw new ForbiddenError('Permission denied');
            }
        } else {
            throw new ForbiddenError('Permission denied');
        }


        const { error } = schema.userSchema.validate(req.body);

        if (error) {
            throw new BadRequestError(error.details[0].message);
        }

        if (!isClient(req.body.role) && (!req.body.prenom || !req.body.password)) {
            throw new BadRequestError('First name/password required')
        }

        if (isADM(req.body.role) && !req.body.client) {
            throw new BadRequestError('Client ID required')
        }

        const emailExists: any[] = await prismaClientSingleton.$queryRaw`
        select email from (
            select emailSADM as email from sadm
            union 
            select emailClient as email from client
            union 
            select emailADM as email from adm
            union 
            select emailAM as email from am
            union 
            select emailAC as email from ac
        ) t WHERE email = ${req.body.email} ;`

        if (emailExists.length > 0) {
            throw new BadRequestError('Email already taken')
        }

        const hashedPassword = req.body.password ? await bcrypt.hash(req.body.password, 10) : ''

        switch (req.body.role) {
            case ROLES.CLIENT: {

                const newClientObject = {
                    nomClient: req.body.nom,
                    telephoneClient: req.body.telephone,
                    emailClient: req.body.email,
                }

                await prismaClientSingleton.client.create({
                    data: newClientObject
                })

                break;
            }
            case ROLES.ADM: {
                let clientExists = await prismaClientSingleton.client.findUnique({
                    where: {
                        idClient: req.body.client
                    }
                })

                if (!clientExists) {
                    throw new NotFoundError('Client doesn\'t exist')
                }

                let userExists = await prismaClientSingleton.adm.findUnique({
                    where: {
                        idClient: req.body.client
                    }
                })

                if (userExists) {
                    throw new BadRequestError('Client already has an admin')
                }

                const newADMObject = {
                    nomADM: req.body.nom,
                    prenomADM: req.body.prenom,
                    emailADM: req.body.email,
                    telephoneADM: req.body.telephone,
                    motDePasseADM: hashedPassword,
                    idClient: req.body.client
                }

                console.log("added user ADM");

                await prismaClientSingleton.adm.create({
                    data: newADMObject
                })

                break;
            }
            case ROLES.DECIDEUR: {

                let userExists = await prismaClientSingleton.decideur.findUnique({
                    where: {
                        idClient: req.body.client
                    }
                })

                if (userExists) {
                    throw new BadRequestError('Client already has a decider')
                }

                const newDeciderObject = {
                    nomDecideur: req.body.nom,
                    prenomDecideur: req.body.prenom,
                    emailDecideur: req.body.email,
                    telephoneDecideur: req.body.telephone,
                    motDePasseDecideur: hashedPassword,
                    idClient: user.clientId as number
                }

                console.log("added user DECIDER");

                await prismaClientSingleton.decideur.create({
                    data: newDeciderObject
                })

                break;
            }
            case ROLES.AC: {

                let userExists = await prismaClientSingleton.ac.findUnique({
                    where: {
                        idClient: user.clientId
                    }
                })

                if (userExists) {
                    throw new BadRequestError('client already has an AC')
                }

                const newACObject = {
                    nomAc: req.body.nom,
                    prenomAC: req.body.prenom,
                    emailAC: req.body.email,
                    telephoneAC: req.body.telephone,
                    motDePasseAC: hashedPassword,
                    idClient: user.clientId as number
                }

                console.log("added user AC");

                await prismaClientSingleton.ac.create({
                    data: newACObject
                })

                break;
            }
            case ROLES.AM: {

                const newAMObject = {
                    nomAM: req.body.nom,
                    prenomAM: req.body.prenom,
                    emailAM: req.body.email,
                    telephoneAM: req.body.telephone,
                    motDePasseAM: hashedPassword,
                    idClient: user.clientId as number
                }

                console.log("added user AM");

                await prismaClientSingleton.am.create({
                    data: newAMObject
                })

                break;
            }
            default:
                throw new InternalError('Unknown role')
        }

        new SuccessCreationResponse('User created succesfully', null).send(res)
    })

export const deleteUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {

        if (!req.user) {
            throw new InternalError('User not found');
        }

        const { error } = schema.removeUserSchema.validate(req.body);

        if (error) {
            throw new BadRequestError(error.details[0].message);
        }

        const user = req.user

        if (isADM(user.role)) {
            if (!isAC(req.body.role)
                && !isAM(req.body.role)
                && !isDecideur(req.body.role))
                throw new ForbiddenError('Permission denied');

        } else if (isSADM(user.role)) {
            if (!isADM(req.body.role)
                && !isClient(req.body.role))
                throw new ForbiddenError('Permission denied');

        } else {
            throw new ForbiddenError('Permission denied');
        }

        switch (req.body.role) {
            case ROLES.CLIENT: {
                const client: any = await prismaClientSingleton.client.findUnique({
                    where: {
                        idClient: req.body.id
                    }
                })

                if (!client) {
                    throw new NotFoundError('Client doesn\'t exists')
                }

                await prismaClientSingleton.client.delete({
                    where: {
                        idClient: req.body.id
                    }
                });


                break;
            }
            case ROLES.ADM: {
                const adm = await prismaClientSingleton.adm.findUnique({
                    where: {
                        idADM: req.body.id
                    }
                })

                if (!adm) {
                    throw new NotFoundError('ADM doesn\'t exist')
                }

                console.log("removed user ADM");

                await prismaClientSingleton.adm.delete({
                    where: {
                        idADM: req.body.id
                    }
                });

                break;
            }
            case ROLES.DECIDEUR: {

                const decideur = await prismaClientSingleton.decideur.findUnique({
                    where: {
                        //if client can have many decideurs, add: or idClient: user.clientId
                        idDecideur: req.body.id,
                    }
                })

                if (!decideur) {
                    throw new NotFoundError('Decider doesn\'t exists')
                }

                if (decideur.idClient !== user.clientId) {
                    throw new ForbiddenError('Permission denied')
                }

                console.log("removed user DECIDER");

                await prismaClientSingleton.decideur.delete({
                    where: {
                        idDecideur: req.body.id
                    }
                });

                break;
            }
            case ROLES.AC: {

                const ac = await prismaClientSingleton.ac.findUnique({
                    where: {
                        idAC: req.body.id
                    }
                })

                if (!ac) {
                    throw new NotFoundError('AC doesn\'t exist')
                }

                if (ac.idClient !== user.clientId) {
                    throw new ForbiddenError('Permission denied')
                }

                console.log("removed user AC");

                await prismaClientSingleton.ac.delete({
                    where: {
                        idAC: req.body.id
                    }
                });

                break;
            }
            case ROLES.AM: {

                const am = await prismaClientSingleton.am.findUnique({
                    where: {
                        idAM: req.body.id
                    }
                })

                if (!am) {
                    throw new BadRequestError('AM already exists')
                }

                console.log("removed user AM");
                await prismaClientSingleton.am.delete({
                    where: {
                        idAM: req.body.id
                    }
                });

                break;
            }
            default:
                throw new InternalError('Unknown role')
        }

        new SuccessMsgResponse('User deleted succesfully').send(res)

    })