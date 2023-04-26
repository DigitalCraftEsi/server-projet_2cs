import Joi from 'joi'

const advertisement = {
    advertiser : Joi.number().positive().required(),
    sexe : Joi.string(),
    ageMin : Joi.number().positive(),
    ageMax  : Joi.number().positive(), 
    area : Joi.string(),
    dateDebut : Joi.date().iso().required(),
    dateFin :  Joi.date().iso().required(), 
    beverage : Joi.number().positive(),
    machine:  Joi.number().positive().required(),
}


export default {
    advertisementScheama: Joi.object(advertisement),
}