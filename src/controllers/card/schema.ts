import Joi from 'joi'

const card = {
    cardNumber : Joi.string().required(),
    expiryMonth : Joi.string().required().length(2),
    expiryYear : Joi.string().required().length(4),
    holderName : Joi.string().required(),
}

export default {
   cardSchema: Joi.object(card),
}