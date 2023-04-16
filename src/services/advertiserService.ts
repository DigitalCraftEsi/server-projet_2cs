import { annonceur } from ".prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

export const onGetAllAdvertiserHandler = async () => {
    const _advertisers = await prismaClientSingleton.annonceur.findMany();
    return _advertisers
}

export const onGetAdvertiserByIdHandler = async (id : number) => {
    const _advertiser = await prismaClientSingleton.annonceur.findFirst({
      where : {
        idAnnonceur : id
      }  
    })
    return _advertiser
}

export const onGetAdvertiserByEmailHandler = async (email : string) => {
  const _advertiser = await prismaClientSingleton.annonceur.findFirst({
    where : {
      emailAnnonceur : email
    }  
  })
  return _advertiser
}


export const onAddAvertiserHandler = async (data : any): Promise<annonceur | null> => {
  console.log(data)
    const _advertiser = await prismaClientSingleton.annonceur.create({
        data : {
            nomAnnonceur : data.name,
            emailAnnonceur : data.email , 
            telephoneAnnonceur : data.phone
        }
    })
    return _advertiser;
  };


export const onDeleteAdvertiserHandler = async (id : number) => {
    await prismaClientSingleton.annonceur.deleteMany({
      where : {
      idAnnonceur : id
      }
    })
}
  
  