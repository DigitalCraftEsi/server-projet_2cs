import Joi from 'joi'

const vendingMachine = {
    longitude: Joi.number().required(),
    latitude: Joi.number().required(),
    adresse: Joi.string().required(),
    codeDeDeverrouillage : Joi.string().required(),
    idClient : Joi.number().positive(),
    idAM : Joi.number().positive(),
}

export default {
    vendingMachineSchema: Joi.object(vendingMachine),
}