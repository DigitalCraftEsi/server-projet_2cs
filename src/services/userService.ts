/* eslint-disable @typescript-eslint/no-explicit-any */
import { ac, adm, am, client, consommateur, decideur, sadm } from "@prisma/client"
import { isString, uniq } from "lodash"
import { prismaClientSingleton } from "../utils/prismaClient"


// SADM ----------------------------------------------------------------------------

export const onGetSADMHandler = async ( unique : string | number  ) : Promise< sadm | null>  => {
    let sadm : sadm;
    if (isString(unique)) {
        sadm = await prismaClientSingleton.sadm.findUnique({
            where: {
                emailSADM : unique
            }
        })
    }else {
        sadm = await prismaClientSingleton.sadm.findUnique({
            where: {
                idSADM : unique
            }
        })  
    }

    return sadm
}

export const onAddSADMHandler = async ( data : any ) : Promise< sadm | null>  => {
    const {
        nomSADM,
        prenomSADM,
        emailSADM,
        motDePasseSADM,
        telephoneSADM 
      } = data
    const sadm = await prismaClientSingleton.sadm.create({
        data : {
            nomSADM,
            prenomSADM,
            emailSADM,
            motDePasseSADM,
            telephoneSADM
        }
    })
    return sadm
}


export const onDeleteSADMHandler = async (id : number) => {
    await prismaClientSingleton.sadm.delete({
        where : {
            idSADM : id
        }
    })
}

// Client ----------------------------------------------------------------------------

export const onGetClientHandler = async ( unique : string | number  ) : Promise< client | null>  => {
    let client : client;
    if (isString(unique)) {
        client = await prismaClientSingleton.client.findUnique({
            where: {
                emailClient : unique
            }
        })
    }else {
        client = await prismaClientSingleton.client.findUnique({
            where: {
                idClient : unique
            }
        })  
    }

    return client
}

export const onAddClientHandler = async ( data : any ) : Promise< client | null>  => {
    const {
        nomClient,
        emailClient,
        telephoneClient,
      } = data
    const _client = await prismaClientSingleton.client.create({
        data : {
            nomClient,
            emailClient,
            telephoneClient,
        }
    })
    return _client
}


export const onDeleteClientHandler = async (id : number) => {
    await prismaClientSingleton.client.delete({
        where : {
            idClient : id
        }
    })
}



// ADM ----------------------------------------------------------------------------

export const onGetADMHandler = async ( unique : string | number) : Promise< adm | null>  => {
    let adm : adm;
    if (isString(unique)) {
        adm = await prismaClientSingleton.adm.findUnique({
            where: {
                emailADM : unique
            }
        })
    }else{
        adm = await prismaClientSingleton.adm.findUnique({
            where: {
                idADM : unique
            }
        })
    }

    return adm
}

export const onAddADMHandler = async ( data : any ) : Promise< adm | null>  => {
    const {
        idClient,
        nomADM,
        prenomADM,
        emailADM,
        motDePasseADM,
        telephoneADM,    
      } = data
    const adm = await prismaClientSingleton.adm.create({
        data : {
            idClient,
            nomADM,
            prenomADM,
            emailADM,
            motDePasseADM,
            telephoneADM
        }
    })
    return adm
}


export const onDeleteADMHandler = async (id : number) => {
    await prismaClientSingleton.adm.delete({
        where : {
            idADM : id
        }
    })
}

// AC ----------------------------------------------------------------------------

export const onGetACHandler = async ( unique : string | number) : Promise< ac | null>  => {
    let ac : ac 
    if (isString(unique)){
        ac = await prismaClientSingleton.ac.findUnique({
            where: {
                emailAC : unique
            }
        })
    }else {
        ac = await prismaClientSingleton.ac.findUnique({
            where: {
                idAC : unique
            }
        })
    }

    return ac
}

export const onAddACHandler = async ( data : any ) : Promise< ac | null>  => {
    const {
        nomAc,
        prenomAC,
        emailAC,
        motDePasseAC,
        telephoneAC,
        idClient  
      } = data
    const ac = await prismaClientSingleton.ac.create({
        data : {
            nomAc,
            prenomAC,
            emailAC,
            motDePasseAC,
            telephoneAC,
            idClient
        }
    })
    return ac
}


export const onDeleteACHandler = async (id : number) => {
    await prismaClientSingleton.ac.delete({
        where : {
            idAC : id
        }
    })
}

// AM ----------------------------------------------------------------------------

export const onGetAMHandler = async ( unique : string | number ) : Promise< am | null>  => {
    let am : am;
    if (isString(unique)) {
        am = await prismaClientSingleton.am.findUnique({
            where: {
                emailAM : unique
            }
        })
    }else {
        am = await prismaClientSingleton.am.findUnique({
            where: {
                idAM : unique
            }
        })
    }

    return am
}

export const onAddAMHandler = async ( data : any ) : Promise< am | null>  => {
    const {
        nomAM,
        prenomAM,
        emailAM,
        motDePasseAM,
        telephoneAM,
        idClient
    } = data
    const am = await prismaClientSingleton.am.create({
        data : {
            nomAM,
            prenomAM,
            emailAM,
            motDePasseAM,
            telephoneAM,
            idClient
        }
    })
    return am
}


export const onDeleteAMHandler = async (id : number) => {
    await prismaClientSingleton.am.delete({
        where : {
            idAM : id
        }
    })
}

// DECIDEUR ----------------------------------------------------------------------------

export const onGetDECIDEURHandler = async ( unique : string ) : Promise< decideur | null>  => {
    let decideur  : decideur
    if (isString(unique)) {
        decideur = await prismaClientSingleton.decideur.findUnique({
            where: {
                emailDecideur : unique
            }
        })
    }else {
        decideur = await prismaClientSingleton.decideur.findUnique({
            where: {
                idDecideur : unique
            }
        })
    }

    return decideur
}

export const onAddDECIDEURHandler = async ( data : any ) : Promise< decideur | null>  => {
    const {
        nomDecideur,
        prenomDecideur,
        emailDecideur,
        motDePasseDecideur,
        telephoneDecideur,
        idClient
    } = data
    const decideur = await prismaClientSingleton.decideur.create({
        data : {
            nomDecideur,
            prenomDecideur,
            emailDecideur,
            motDePasseDecideur,
            telephoneDecideur,
            idClient
        }
    })
    return decideur
}


export const onDeleteDECIDEURHandler = async (id : number) => {
    await prismaClientSingleton.decideur.delete({
        where : {
            idDecideur : id
        }
    })
}

// Consumer ----------------------------------------------------------------------------

export const onGetConsumerHandler = async ( unique : string | number ) : Promise< consommateur | null>  => {
    let consumer : consommateur;
    if (isString(unique)) {
        consumer = await prismaClientSingleton.consommateur.findUnique({
            where: {
                emailConsommateur : unique
            }
        })
    }else {
        consumer = await prismaClientSingleton.consommateur.findUnique({
            where: {
                idConsommateur : unique
            }
        })
    }

    return consumer
}

export const onAddConsumerHandler = async ( data : any ) : Promise< consommateur | null>  => {
    const {
        nomConsommateur,
        prenomConsommateur,
        emailConsommateur,
        motDePasseConsommateur,
        telephoneConsommateur 
      } = data
    const consumer = await prismaClientSingleton.consommateur.create({
        data : {
            nomConsommateur,
            prenomConsommateur,
            emailConsommateur,
            motDePasseConsommateur,
            telephoneConsommateur
        }
    })
    return consumer
}


export const onDeleteConsumerHandler = async (id : number) => {
    await prismaClientSingleton.consommateur.delete({
        where : {
            idConsommateur : id
        }
    })
}