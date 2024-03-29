import { boissoncommande, commande, commandeStatus } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

export const onGetAllOrderHandler = async (): Promise<commande[] | null> => {

    const data = await prismaClientSingleton.commande.findMany();
    return data;
}

export const onGetOrderHandler = async (id: number): Promise<commande | null> => {
    const order = await prismaClientSingleton.commande.findFirst({
        where: {
            idCommande: id
        },
        include : {
            consommateur : {
                select : {
                    nomConsommateur : true , 
                    prenomConsommateur : true , 
                    emailConsommateur : true,
                    telephoneConsommateur : true 
                }
            }
        }
    })
    return order;
}

export const onGetOrderOfClientHandler = async (id: number): Promise<unknown | null> => {
    const orders = await prismaClientSingleton.commande.findMany({
        include : {
            distributeur : {
                select : {
                    idClient : true,
                    adresse : true , 
                    codeDeDeverrouillage : true , 
                    latitude : true  , 
                    longitude : true
                }
            }
        }
    })
    return orders.filter(order => order.distributeur.idClient == id);
}

export const onGetOrdersOfConsumerHandler = async (id: number): Promise<commande[] | null> => {
    const orders = await prismaClientSingleton.commande.findMany({
        where: {
            idConsommateur: id,
        },
        // include: {
        //     commandes: true
        // }
    })
    return orders
}

export const onGetOrdersOfMacineHandler = async (idMachine: number): Promise<commande[] | null> => {
    const orders = await prismaClientSingleton.commande.findMany({
        where: {
            idDistributeur: idMachine
        },
        // include: {
        //     commandes: true
        // }
    })
    return orders
}




export const onAddOrderHandler = async (
    dateCommande: Date,
    idConsommateur: number,
    idDistributeur: number,
    status: commandeStatus = commandeStatus.enAttente,
    prix = 0.0,
    boissons: Array<{
        idBoisson: number;
        Quantite: number;
    }>,
): Promise<commande | null> => {
    // const { dateCommande, idConsommateur, idDistributeur, prix } = data;
    const order = await prismaClientSingleton.commande.create({
        data: {
            dateCommande,
            idConsommateur,
            idDistributeur,
            status,
            prix,
            boissons: {
                create: boissons.map(b => ({
                    boisson: {
                        connect: { idBoisson: b.idBoisson },
                    },
                    Quantite: b.Quantite
                }))
            }
        }
    })
    return order
}

export const onAddBeverageOfOrderHandler = async (data: any): Promise<boissoncommande | null> => {
    const { idBoisson, idDistributeur, idCommande, Quantite } = data;
    const BeverageOfOrder = await prismaClientSingleton.boissoncommande.create({
        data: {
            idBoisson,
            // idDistributeur,
            idCommande,
            Quantite
        }
    })
    return BeverageOfOrder
}


export const onUpdateOrderHandler = async (data: any, id: number) => {
    const { dateCommande, idConsommateur, idDistributeur, prix } = data;
    await prismaClientSingleton.commande.updateMany({
        where: {
            idCommande: id
        },
        data: {
            dateCommande,
            idConsommateur,
            idDistributeur,
            prix
        }
    })
}

export const onUpdateOrderStatusHandler = async (id: number, status: commandeStatus) => {
    await prismaClientSingleton.commande.update({
        where: {
            idCommande: id
        }, data: {
            status
        }
    })
}

export const onDeleteOrderHandler = async (id: number) => {
    await prismaClientSingleton.commande.delete({
        where: {
            idCommande: id
        }
    })
}