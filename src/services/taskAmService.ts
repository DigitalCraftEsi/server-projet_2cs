
import { anomalie, panne, tache } from "@prisma/client";
import { STATUS_TASK_AM } from "../enums/rolesEnum";
import { prismaClientSingleton } from "../utils/prismaClient";

  /**
 * add task - panne -  to am 
 * @param {any} data - information about task
 */
export const onAddTaskPanneHandler = async (data: any) : Promise<unknown> => {
    try {
        const tache = await prismaClientSingleton.tache.create({
            data: {
              dateDebut: new Date(), // Replace with your desired date value
              dateFin: data.dateEnd, // Replace with your desired date value
              etat: STATUS_TASK_AM.PENDING,
              //type : data.type,
              notif: true,
              idDistributeur: data.machine, // Replace with the actual distributor ID
              idAM: data.am // Replace with the actual AM ID or remove this field if not applicable
            }
          });
      
          const panne = await prismaClientSingleton.panne.create({
            data: {
              titre: data.title,
              description: data.descr,
              //qte : data.qty ? data.qty : null,
              idTache: tache.idTache
            }
          });
        return {...tache , panne :panne}
    } catch (error) {
        console.log(error)
     return null
    }
  
};

/**
 * add task - anomalie -  to am 
 * @param {any} data - information about task
 */
    export const onAddTaskAnomalieHandler = async (data: any) : Promise<unknown> => {
        try {
            console.log(data,"data")
            const tache = await prismaClientSingleton.tache.create({
                data: {
                  dateDebut: new Date(), // Replace with your desired date value
                  dateFin: data.dateEnd, // Replace with your desired date value
                  etat: STATUS_TASK_AM.PENDING,
                  notif: true,
                  //type : data.type,
                  idDistributeur: data.machine, // Replace with the actual distributor ID
                  idAM: data.am // Replace with the actual AM ID or remove this field if not applicable
                }
              });
          
              const anomalie = await prismaClientSingleton.anomalie.create({
                data: {
                  titre: data.title,
                  description: data.descr,
                  idTache: tache.idTache
                }
              });
            return {...tache , anomalie :anomalie}
        } catch (error) {
            console.log(error)
         return null
        }
      
};


  /**
 * getAll panne of Am
 */
  export const onGetAllTaskPanneHandler = async (am : number) : Promise<any[]> => {
    try {
        const tasks = await prismaClientSingleton.tache.findMany({
            where : {
                idAM : am
            },
        
        })
        const pannes = await prismaClientSingleton.panne.findMany({})
        const tasksPannes = tasks.map((ts) => ({
            ...ts,
            panne: pannes.filter(it => it.idTache == ts.idTache)
        }));
        return tasksPannes.filter(ts => ts.panne.length > 0)
    } catch (error) {
        console.log(error)
        return null
    }
  
};

/**
 * getAll anomalie of Am
 */
  export const onGetAllTaskAnomalieHandler = async (am : number) : Promise<any[]> => {
    try {
        const tasks = await prismaClientSingleton.tache.findMany({
            where : {
                idAM : am
            },
        
        })
        const anomalie = await prismaClientSingleton.anomalie.findMany({})
        const tasksPannes = tasks.map((ts) => ({
            ...ts,
            anomalie: anomalie.filter(it => it.idTache == ts.idTache)
        }));
        return tasksPannes.filter(ts => ts.anomalie.length > 0)
    } catch (error) {
        console.log(error)
        return null
    }
};

/**
 * update notification of task
 */
export const onUpdateNotifOfTaskHandler = async (id : number , notif : boolean )  => {
    try {
        const task = await prismaClientSingleton.tache.updateMany({
            where : {
                idTache : id
            },
            data : {
                notif : notif,     
            }
        })
    } catch (error) {
        console.log(error)
    }
};

/**
 * update notification of task
 */
export const onUpdateStateTaskHandler = async (id : number , status : string )  => {
    try {
        await prismaClientSingleton.tache.updateMany({
            where : {
                idTache : id
            },
            data : {
                etat : status 
            }
        })
    } catch (error) {
        console.log(error)
    }
};



