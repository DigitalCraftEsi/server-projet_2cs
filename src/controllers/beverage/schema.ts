import Joi from 'joi'

const beverage = {
    nomBoisson : Joi.string().required(),
    description : Joi.string().required(),
    tarif : Joi.number().required() ,
    idDistributeur : Joi.number().positive().required()
}

const getBeveragesSchema = {
    distUID : Joi.string()
}


export default {
   beverageSchema: Joi.object(beverage),
   getBeveragesSchema: Joi.object(getBeveragesSchema)
}