import Joi from 'joi'

const order = {
    date  : Joi.date().iso().required(),
    consumer : Joi.number().positive().required(),
    machine : Joi.number().positive().required(),
    //price : Joi.number().required().positive(),
    beverages : Joi.array().items(Joi.object({
        id : Joi.number().required(),
        qty : Joi.number().required()
    })).required(),
}


export default {
   orderSchema: Joi.object(order)
}