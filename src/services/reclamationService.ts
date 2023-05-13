import { reclamation } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

/**
 * Get existing Reclamation
 * @returns {reclamation} - information of vendingMachine identifier by id
 */
export const onGetAllReclamationsHandler = async () : Promise<reclamation[] | null> => {
    const recs = await prismaClientSingleton.reclamation.findMany({ 
       
    });
    return recs;
  };


  export const onGetReclamationsByIdHandler = async (id : number) : Promise<reclamation | null> => {
    const recs = await prismaClientSingleton.reclamation.findFirst({
        where : {
            idReclamation : id
        }
     });
    return recs;
  };

  /**
 * Add Reclamatio to DB
 * @param {distributeur} data - vending machine information
 * @returns {distributeur} - vending machine already added
 */
export const onAddReclamationHandler = async (data: any) : Promise<reclamation | null> => {
    try {
      const rec = await prismaClientSingleton.reclamation.create({
        data: data,
      });
      return rec;
    } catch (error) {
        console.log(error,"err")
       return null
    }
  
  };

  /**
 * Update info of existing Reclamation
 * @param {reclamation} data - Reclamation information 
 * @param {number} id - identifier in Reclamation table
 */
export const onUpdateReclamationHandler = async (data: any, id: number) => {
    const { title , descr, notif} = data;
    try {
      const _rec = await prismaClientSingleton.reclamation.update({
        where: { idReclamation: id },
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
 * Delete existing Reclamation
 * @param {number} id - identifier in Reclamation table
 */
export const onDeleteReclamationHandler = async (id: number) => {
    await prismaClientSingleton.reclamation.delete({
      where: {
        idReclamation: id,
      },
    });
  };
  
  