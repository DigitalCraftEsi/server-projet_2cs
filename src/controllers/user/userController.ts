import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { BadRequestError, ForbiddenError, InternalError, NotFoundError } from "../../handler/apiError";
import { isSADM, isADM, isAC, isAM, isDecideur, isClient, ROLES } from "../../enums/rolesEnum";
import { SuccessCreationResponse, SuccessMsgResponse, SuccessResponse } from "../../handler/apiResponse";
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


        const { error } = schema.addUserSchema.validate(req.body);

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

        const { error } = schema.RUDUserSchema.validate(req.body);

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

export const getUsers = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new InternalError('User not found');
        }
        const { error } = schema.RUDUserSchema.validate(req.body);

        if (error) {
            throw new BadRequestError(error.details[0].message);
        }

        const user = req.user

        let role: string = ''
        let id: number | null = null;

        if (isADM(user.role)) {
            if ((req.body.role && !req.body.id) ||
                (!req.body.role && req.body.id) ||
                (req.body.role && req.body.id)
                && !isAC(req.body.role)
                && !isAM(req.body.role)
                && !isDecideur(req.body.role))
                throw new BadRequestError();
            // if both id and role are present
            if (req.body.role) {
                role = req.body.role
                id = req.body.id
            }

        } else if (isSADM(user.role)) {
            if (req.body.id) {
                id = req.body.id
            }

        } else {
            throw new ForbiddenError('Permission denied');
        }

        if (!id) {
            if (isADM(user.role)) {
                const decideurs = await prismaClientSingleton.decideur.findMany({
                    where: {
                        idClient: user.clientId
                    },
                    select : {
                        idDecideur : true,
                        emailDecideur : true,
                        nomDecideur : true,
                        prenomDecideur : true,
                        telephoneDecideur : true,
                        idClient : true,
                    }
                })
                const acs = await prismaClientSingleton.ac.findMany({
                    where: {
                        idClient: user.clientId
                    },
                    select : {
                        idAC : true,
                        emailAC : true,
                        nomAc : true,
                        prenomAC : true,
                        telephoneAC : true,
                        idClient : true,
                    }
                })
                const ams = await prismaClientSingleton.am.findMany({
                    where: {
                        idClient: user.clientId
                    },select : {
                        idAM : true,
                        emailAM : true,
                        nomAM : true,
                        prenomAM : true,
                        telephoneAM : true,
                        idClient : true,
                    }
                })

                const usersList = [...decideurs, ...acs, ...ams];

                new SuccessResponse('Users list', usersList).send(res)
            } else {
                //SADM
                const clients = await prismaClientSingleton.client.findMany()

                let clientsList = [...clients];

                new SuccessResponse('Clients list', clientsList).send(res)
            }
        }
        else {
            if (isADM(user.role)) {
                switch (role) {
                    case ROLES.DECIDEUR: {
                        const decideur = await prismaClientSingleton.decideur.findUnique({
                            where: {
                                idDecideur: id
                            },select : {
                                idDecideur : true,
                                emailDecideur : true,
                                nomDecideur : true,
                                prenomDecideur : true,
                                telephoneDecideur : true,
                                idClient : true,
                            }
                        })

                        if (!decideur || decideur.idClient !== user.clientId) {
                            throw new NotFoundError('Decideur not found');
                        }

                        new SuccessResponse(`Decider ${id}`, decideur).send(res)
                        break;
                    }
                    case ROLES.AC: {

                        const ac = await prismaClientSingleton.ac.findUnique({
                            where: {
                                idAC: id
                            }, select : {
                                idAC : true,
                                emailAC : true,
                                nomAc : true,
                                prenomAC : true,
                                telephoneAC : true,
                                idClient : true,
                            }
                        })

                        if (!ac || ac.idClient !== user.clientId) {
                            throw new NotFoundError('AC not found');
                        }

                        new SuccessResponse(`AC ${id}`, ac).send(res)

                        break;
                    }
                    case ROLES.AM:
                        {
                            //TODO INCLUDE NOMBRE DE PANNEES REPAREES
                            const am = await prismaClientSingleton.am.findUnique({
                                where: {
                                    idAM: id
                                }, select : {
                                    idAM : true,
                                    emailAM : true,
                                    nomAM : true,
                                    prenomAM : true,
                                    telephoneAM : true,
                                    idClient : true,
                                }
                            })

                            if (!am || am.idClient !== user.clientId) {
                                throw new NotFoundError('AM not found');
                            }

                            new SuccessResponse(`AM ${id}`, am).send(res)

                            break;
                        }
                    default:
                        throw new InternalError('Role unknown')
                }
            }else{
                //SADM
                const client = await prismaClientSingleton.client.findUnique({
                    where: {
                        idClient: id
                    },
                })

                if (!client) {
                    throw new NotFoundError('Client not found');
                }

                const adm = await prismaClientSingleton.adm.findUnique({
                    where:{
                        idClient: client.idClient
                    }, select : {
                        idADM : true,
                        emailADM : true,
                        nomADM : true,
                        prenomADM : true,
                        telephoneADM : true,
                        idClient : true,
                    }
                })

                new SuccessResponse(`Client ${id}`, {client, adm}).send(res)
            }
        }
    })