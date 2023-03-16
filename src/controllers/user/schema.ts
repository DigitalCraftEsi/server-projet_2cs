import Joi from 'joi';
import { ROLES } from '../../enums/rolesEnum';
import _ from 'lodash';

const alloweRoles = _.remove(Object.values(ROLES), (n)=>n!==ROLES.SADM)

const addUserSchema = {
    nom : Joi.string().required(),
    prenom : Joi.string(),
    telephone : Joi.string().pattern(new RegExp(/^(0|\+[0-9]{2,3})[0-9]{9}$/)).allow(null, '').required(),
    email: Joi.string().email().messages({
        'string.email': `Email non valide`,
    }).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)),
    role : Joi.string().valid(...alloweRoles).required(),
    client : Joi.number().positive(),
    distributeur : Joi.number().positive()
}

const RUDUserSchema = {
    role : Joi.string().valid(...alloweRoles),
    id : Joi.number().positive(),
}

export default {
    addUserSchema: Joi.object(addUserSchema),
    RUDUserSchema : Joi.object(RUDUserSchema)
}