import Joi from 'joi';
import _ from 'lodash';


const addReclamation = {
    title : Joi.string().required(),
    descr  : Joi.string().required(),
    order : Joi.number().required()
}

const updateReclamation = {
    title : Joi.string().required(),
    descr  : Joi.string().required(),
    notif : Joi.boolean().required()
}



export default {
    addReclamationSchema: Joi.object(addReclamation),
    updateReclamationSchema : Joi.object(updateReclamation)
}