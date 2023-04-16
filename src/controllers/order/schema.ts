import Joi from 'joi'

const order = {
    idDistributeur : Joi.number().positive().required(),
    boissons  : Joi.array().items(Joi.object({
        idBoisson : Joi.number().positive().required(),
        Quantite : Joi.number().positive().required()
    })).required(),
}


export default {
   orderSchema: Joi.object(order)
}