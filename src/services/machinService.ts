/* eslint-disable @typescript-eslint/no-explicit-any */
import { distributeur } from "@prisma/client";
import { prismaClientSingleton } from "../utils/prismaClient";

/**
 * Get All list of All existing vending machine
 * @returns {distributeur[]} - list of vending machines
 */
export const onGetAllMachinesHandler = async () : Promise<distributeur[] | null>  => {
  const machines = await prismaClientSingleton.distributeur.findMany();
  return machines;
};

/**
 * Get existing vending machine by id
 * @param {number} id - identifier in distributeur table
 * @returns {distributeur} - information of vendingMachine identifier by id
 */
export const onGetMachineHander = async (id: number) : Promise<distributeur | null> => {
  const machine = await prismaClientSingleton.distributeur.findUnique({
    where: { idDistributeur: id },
  });
  return machine;
};

/**
 * Add vending machine to DB
 * @param {distributeur} data - vending machine information
 * @returns {distributeur} - vending machine already added
 */
export const onAddMachineHandler = async (data: any) : Promise<distributeur | null> => {
  try {
    const machine = await prismaClientSingleton.distributeur.create({
      data: data,
    });
    return machine;
  } catch (error) {
    console.log(error,"err")
  }

};

/**
 * Update info of existing vending machine
 * @param {distributeur} data - vending machine information 
 * @param {number} id - identifier in distributeur table
 */
export const onUpdateMachineHandler = async (data: any, id: number) => {
  const { longitude, latitude, adresse, codeDeDeverrouillage, idClient, idAM, statut } =
    data;
  try {
    await prismaClientSingleton.distributeur.update({
      where: { idDistributeur: id },
      data: {
        longitude,
        latitude,
        adresse,
        codeDeDeverrouillage,
        idClient,
        idAM,
        statut
      },
    });
  } catch (error) {
    console.log(error)
  }

};

/**
 * Delete existing vending machine
 * @param {number} id - identifier in distributeur table
 */
export const onDeleteMachineHandler = async (id: number) => {
  await prismaClientSingleton.distributeur.delete({
    where: {
      idDistributeur: id,
    },
  });
};
