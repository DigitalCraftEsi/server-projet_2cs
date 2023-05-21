
import { reponse } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";
import { number } from "joi";

/**
 * Get existing Reponse
 * @returns {reponse} - information of vendingMachine identifier by id
 */
export const onGetAllResponseHandler = async () : Promise<reponse[] | null> => {
    const res = await prismaClientSingleton.reponse.findMany({ 
    });
    return res;
  };

  /**
 * Get existing Reponse of AC
 * @param {number} - id of AC
 * @returns {reponse} - information of vendingMachine identifier by id
 */
export const onGetResponseByIDHandler = async (id : number) : Promise<reponse | null> => {
    const res = await prismaClientSingleton.reponse.findFirst({ 
       where : {
        idReponse : id
       }
    });
    return res;
};

/**
 * Get existing Reponse of AC
 * @param {number} - id of AC
 * @returns {reponse} - information of vendingMachine identifier by id
 */
export const onGetAllResponseOfACHandler = async (ac : number) : Promise<reponse[] | null> => {
    const res = await prismaClientSingleton.reponse.findMany({ 
       where : {
        idAC : ac
       }
    });
    return res;
};

export const onAddResponeOfReclamation = async (data : any) : Promise<reponse> =>{
    const res = await prismaClientSingleton.reponse.create({
        data : {
            titre : data.title , 
            description : data.descr , 
            idReclamation : data.reclamation,
            idAC : data.ac , 
            dateReponse : new Date(),
            notif : true
        }

    })
    return res ;
}

  /**
 * Update info of existing Reclamation
 * @param {reclamation} data - Reclamation information 
 * @param {number} id - identifier in Reclamation table
 */
  export const onUpdateResponseHandler = async (data: any, id: number) => {
    const { title , descr, notif} = data;
    try {
      const _rec = await prismaClientSingleton.reponse.update({
        where: { idReponse: id },
        data: {
            titre : title,
            description : descr,
            notif 
        },
      });
      return _rec
    } catch (error) {
      console.log(error)
    }
  
  };

  /**
 * Delete existing Response
 * @param {number} id - identifier in Response table
 */
export const onDeleteResponseHandler = async (id: number) => {
    await prismaClientSingleton.reponse.delete({
      where: {
        idReponse: id,
      },
    });
  };
  