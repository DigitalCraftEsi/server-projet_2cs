import { prismaClientSingleton } from "../utils/prismaClient";
import { BadRequestError, NotFoundError } from "./apiError";

interface User {
    add(nom: string,
        prenom: string,
        email: string,
        telephone: string,
        motDePasse: string,
        idClient: number): Promise<any>;
    remove(id: number, role: string): Promise<any>
}

export class ADM implements User{
    async add(nom: string, prenom: string, email: string, telephone: string, motDePasse: string, idClient: number) {
        throw new Error("Method not implemented.");
    }
    async remove(id: number, role: string) {
        throw new Error("Method not implemented.");
    }
    
}

export class Client {
    static async add(nom: string, email: string, telephone: string) {
        let userExists: any = await prismaClientSingleton.client.findUnique({
            where: {
                emailClient: email
            }
        })

        if (userExists) {
            throw new BadRequestError('Client already exists')
        }

        const newClientObject = {
            nomClient: nom,
            telephoneClient: telephone,
            emailClient: email,
        }

        await prismaClientSingleton.client.create({
            data : newClientObject
        })
    }
    static async remove(id: number){
        const client: any = await prismaClientSingleton.client.findUnique({
            where: {
                idClient: id
            }
        })

        if (!client) {
            throw new NotFoundError('Client doesn\'t exists')
        }

        await prismaClientSingleton.client.delete({
            where :{
                idClient: id
            }
        });

    }

}