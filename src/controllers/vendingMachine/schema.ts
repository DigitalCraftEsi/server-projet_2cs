import Joi from 'joi'

const vendingMachine = {
    positionX: Joi.number().required(),
    positionY: Joi.number().required(),
    adresse: Joi.string().required(),
    etat: Joi.string().required(),
    codeDeDeverrouillage : Joi.string().required(),
    actif : Joi.boolean(),
    idClient : Joi.number().positive(),
    idAC : Joi.number().positive(),
}

export default {
    vendingMachineSchema: Joi.object(vendingMachine),
}