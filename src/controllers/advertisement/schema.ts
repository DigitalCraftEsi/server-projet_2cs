import Joi from 'joi'

const advertisement = {
    advertiser : Joi.number().positive().required(),
   sexe : Joi.string(),
    ageMin : Joi.number().positive(),
    ageMax  : Joi.number().positive(), 
    area : Joi.string(),
    dateDebut : Joi.date().iso().required(),
    dateFin :  Joi.date().iso().required(), 
    period : Joi.number().positive(),
    beverage : Joi.number().positive(),
    machine:  Joi.number().positive(),
    video : Joi.string()
}


export default {
    advertisementScheama: Joi.object(advertisement),
}