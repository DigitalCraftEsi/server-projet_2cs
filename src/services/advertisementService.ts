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


export const onAddAdvertisementHandler = async (data : any , file : string): Promise<annoncepublicitaire | null> => {
    const _advert = await prismaClientSingleton.annoncepublicitaire.create({
        data : {
           annonceur: {
            connect: { idAnnonceur : parseInt(data.advertiser) } // or create or connectOrCreate
           },
            sexe : data.sexe,
            ageMin : parseInt(data.ageMin),
            ageMax : parseInt(data.ageMax) , 
            region : data.area,
            dateDebut : data.dateDebut,
            dateFin : data.dateFin , 
            boisson: {
              connect: { idBoisson: parseInt(data.beverage) } // or create or connectOrCreate
            },
            distributeur: {
              connect: { idDistributeur: parseInt(data.machine) } // or create or connectOrCreate
            },
            video : 'src/uploads/' + file
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
  
  