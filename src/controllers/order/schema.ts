import Joi from 'joi'

const order = {
    idDistributeur : Joi.number().positive().required(),
    boissons  : Joi.array().items(Joi.object({
        idBoisson : Joi.number().positive().required(),
        Quantite : Joi.number().positive().required()
    })).required(),
    card : Joi.object({
        cardNumber : Joi.string().required(),
        expiryMonth : Joi.string().required(),
        expiryYear : Joi.string().required(),
        cvc : Joi.string().required(),
        holderName: Joi.string().required(),
    }).required()
}


export default {
   orderSchema: Joi.object(order)
}