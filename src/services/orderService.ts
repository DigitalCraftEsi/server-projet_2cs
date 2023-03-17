import { commande } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

export const onGetAllOrderHandler = async () : Promise<commande[] | null>  => {
    const data = await prismaClientSingleton.commande.findMany();
    return data;
}

export const onGetOrderHandler = async ( id : number ) : Promise<commande | null> => {
    const order = await prismaClientSingleton.commande.findFirst({where : {
        idCommande : id
    }})
    return order;
}

export const onGetOrdersOfClientHandler = async ( idClient : number ) : Promise<commande[] | null>  => {
    const orders = await prismaClientSingleton.commande.findMany({
        where : {
            idConsommateur : idClient
        }
    })
    return orders
}

export const onGetOrdersOfMacineHandler = async ( idMachine : number ) : Promise<commande[] | null>  => {
    const orders = await prismaClientSingleton.commande.findMany({
        where : {
            idDistributeur : idMachine
        }
    })
    return orders
}

export const onAddOrderHandler = async ( data : any  ) : Promise<commande | null>  => {
    const {  dateCommande  , idConsommateur , idDistributeur ,} = data;
    const order = await prismaClientSingleton.commande.create({
        data : {
                dateCommande : new Date(dateCommande) ,
                idConsommateur,
                idDistributeur
        }
    })
    return order
}

export const onUpdateOrderHandler = async ( data : any , id : number) => {
    const {  dateCommande  , idConsommateur , idDistributeur ,} = data;
    await prismaClientSingleton.commande.updateMany({
        where : {
           idCommande : id
        },
        data : {
            dateCommande ,
            idConsommateur , 
            idDistributeur
        }
    })
}

export const onDeleteOrderHandler = async ( id : number ) => {
    await prismaClientSingleton.commande.delete({where : {
        idCommande : id
      }})
}