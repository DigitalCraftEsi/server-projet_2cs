/* eslint-disable @typescript-eslint/no-explicit-any */
import { boisson } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

export const onGetAllBeverageHandler = async (idDistributeur : number):
Promise<boisson[] | null> => {
  const beverages = await prismaClientSingleton.boisson.findMany({
    where : {
      idDistributeur
    }
  });
  return beverages;
};

export const onGetBeverageHandler = async (
  id: number
): Promise<boisson | null> => {
  const beverage = await prismaClientSingleton.boisson.findFirst({
    where: { idBoisson: id },
  });
  return beverage;
};

export const onGetBeveragesOfMachineHandler = async (
  idMachin: number
): Promise<boisson[] | null> => {
  const beverages = await prismaClientSingleton.boisson.findMany({
    where: { idDistributeur: idMachin },
  });
  return beverages;
};

export const onAddBeverageHandler = async (
  data: any,
  file : string
): Promise<boisson | null> => {
  const { nomBoisson, tarif, idDistributeur, description ,eau  , cafe , lait , the , sucre} = data;
  const beverage = await prismaClientSingleton.boisson.create({
    data: {
      nomBoisson,
      tarif : parseFloat(tarif),
      distributeur : {
        connect : {idDistributeur : parseInt(idDistributeur),}
      },
      description,
      image : "src/uploads/" + file,
      eau: parseFloat(eau),
      cafe: parseFloat(cafe),
      lait: parseFloat(lait),
      the: parseFloat(the),
      sucre: parseFloat(sucre),
    },
  });
  return beverage;
};

export const onUpdateBeverageHandler = async (data: any, id: number) => {
  const { nomBoisson, tarif, idDistributeur } = data;
  await prismaClientSingleton.boisson.updateMany({
    where: { idBoisson: id },
    data: {
      nomBoisson,
      tarif,
      idDistributeur,
    },
  });
};

export const onDeleteBeverageHandler = async (id: number) => {
  await prismaClientSingleton.boisson.deleteMany({
    where: {
      idBoisson: id,
    },
  });
};
