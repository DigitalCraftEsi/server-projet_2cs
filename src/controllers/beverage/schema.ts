import Joi from 'joi'

const beverage = {
    nomBoisson : Joi.string().required(),
    tarif : Joi.number().required() ,
    idDistributeur : Joi.number().positive().required()
}


export default {
   beverageSchema: Joi.object(beverage),
}