import { commande } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

export const onGetAllOrderHandler = async () : Promise<commande[] | null>  => {

        console.log("first")
        const data = await prismaClientSingleton.commande.findMany();
        console.log(data)
        return data;
    }

export const onGetOrderHandler = async ( id : number ) : Promise<commande | null> => {
    const order = await prismaClientSingleton.commande.findFirst({where : {
        idCommande : id
    },
    include : {
        commandes : true
    }
    })
    return order;
}

export const onGetOrdersOfConsumerHandler = async ( id : number ) : Promise<commande[] | null>  => {
    const orders = await prismaClientSingleton.commande.findMany({
        where : {
            idConsommateur : id,
        },
        include : {
            commandes : true
        }
    })
    return orders
}

export const onGetOrdersOfMacineHandler = async ( idMachine : number ) : Promise<commande[] | null>  => {
    const orders = await prismaClientSingleton.commande.findMany({
        where : {
            idDistributeur : idMachine
        },
        include : {
            commandes : true
        }
    })
    return orders
}



export const onAddOrderHandler = async ( data : any  ) : Promise<commande | null>  => {
    const {  dateCommande  , idConsommateur , idDistributeur , prix} = data;
    const order = await prismaClientSingleton.commande.create({
        data : {
                dateCommande : new Date(dateCommande) ,
                idConsommateur,
                idDistributeur,
                prix
        }
    })
    return order
}

export const onUpdateOrderHandler = async ( data : any , id : number) => {
    const {  dateCommande  , idConsommateur , idDistributeur , prix} = data;
    await prismaClientSingleton.commande.updateMany({
        where : {
           idCommande : id
        },
        data : {
            dateCommande ,
            idConsommateur , 
            idDistributeur,
            prix
        }
    })
}

export const onDeleteOrderHandler = async ( id : number ) => {
    await prismaClientSingleton.commande.delete({where : {
        idCommande : id
      }})
}