import Joi from 'joi';
import _ from 'lodash';


const addReponse = {
    title : Joi.string().required(),
    descr  : Joi.string().required(),
    reclamation : Joi.number().required()
}

const updateReponse = {
    title : Joi.string().required(),
    descr  : Joi.string().required(),
    notif : Joi.boolean().required()
}



export default {
    addResponseSchema: Joi.object(addReponse),
    updateResponseSchema : Joi.object(updateReponse)
}