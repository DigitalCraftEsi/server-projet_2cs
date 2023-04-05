import Joi from 'joi'

const vendingMachine = {
    longitude: Joi.number(),
    latitude: Joi.number(),
    adresse: Joi.string(),
    codeDeDeverrouillage : Joi.string(),
    idClient : Joi.number().positive(),
    idAM : Joi.number().positive(),
}

export default {
    vendingMachineSchema: Joi.object(vendingMachine),
}