import { prismaClientSingleton } from "../utils/prismaClient";
import { card } from "@prisma/client"


export const onAddCardHandler = async (
    cardNumber: string,
    expiryMonth: string,
    expiryYear: string,
    holderName: string,
    idConsommateur: number): Promise<card | null> => {

    const card = await prismaClientSingleton.card.create({
        data: {
            cardNumber,
            expiryMonth,
            expiryYear,
            holderName,
            idConsommateur
        },
    });
    return card;

};

export const onGetCardByIdHandler = async (
    cardNumber: string
  ): Promise<card | null> => {
    const card = await prismaClientSingleton.card.findUnique({
      where: {
        cardNumber
      },
    });
    return card;
  };

export const onGetConsumerCardsHandler = async (
    idConsommateur: number
  ): Promise<card[] | null> => {
    const cards = await prismaClientSingleton.card.findMany({
      where: {
        idConsommateur
      },
    });
    return cards;
  };

  export const onDeleteCardHandler = async (
    cardNumber: string
  ): Promise<card | null> => {
    const card = await prismaClientSingleton.card.delete({
      where: {
        cardNumber
      },
    });
    return card;
  };