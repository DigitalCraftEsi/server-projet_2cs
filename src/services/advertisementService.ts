import { annoncepublicitaire } from ".prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

export const onGetAllAdvertisementHandler = async () => {
    const _advrs = await prismaClientSingleton.annoncepublicitaire.findMany();
    return _advrs
}

export const onGetAdvertisementByIdHandler = async (id : number) => {
    const _advrt = await prismaClientSingleton.annoncepublicitaire.findFirst({
      where : {
        idAnnonce : id
      }  
    })
    return _advrt
}

export const onGetAdvertisementByAdvertiserHandler = async (id : number) => {
  const _adverts = await prismaClientSingleton.annonceur.findMany({
    where : {
      idAnnonceur : id
    }  
  })
  return _adverts
}


export const onAddAdvertisementHandler = async (data : any): Promise<annoncepublicitaire | null> => {
    const _advert = await prismaClientSingleton.annoncepublicitaire.create({
        data : {
            idAnnonceur : data.advertiser,
            sexe : data.sexe,
            ageMin : data.ageMin,
            ageMax : data.ageMax , 
            region : data.area,
            dateDebut : data.dateDebut,
            dateFin : data.dateFin , 
            periode : data.period,
            idBoisson : data.beverage,
            idDistributeur : data.machine,
            video : data.video
        }
    })
    return _advert;
  };


export const onDeleteAdvertisementHandler = async (id : number) => {
    await prismaClientSingleton.annoncepublicitaire.deleteMany({
      where : {
      idAnnonce : id
      }
    })
}
  
  