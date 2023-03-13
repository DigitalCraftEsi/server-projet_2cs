import Joi from 'joi'

const vendingMachine = {
    positionX: Joi.number().required(),
    positionY: Joi.number().required(),
    adresse: Joi.string().required(),
    etat: Joi.string().required(),
    codeDeDeverrouillage_: Joi.string().required(),
    idDistributeur :  Joi.number().positive().required(),
}

export default {
    vendingMachineSchema: Joi.object(vendingMachine),
}