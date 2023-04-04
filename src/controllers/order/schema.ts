import Joi from 'joi'

const order = {
    dateCommande  : Joi.date().iso().required(),
    idConsommateur : Joi.number().positive().required(),
    idDistributeur : Joi.number().positive().required(),
    prix : Joi.number().required().positive()
}


export default {
   orderSchema: Joi.object(order)
}