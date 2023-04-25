import Joi from 'joi'

const advertiser = {
    name : Joi.string().required(),
    email : Joi.string().required() ,
    phone : Joi.string().required()
}


export default {
   advertiserSchema: Joi.object(advertiser),
}
