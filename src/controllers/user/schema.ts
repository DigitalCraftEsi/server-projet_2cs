import Joi from 'joi';
import { ROLES } from '../../enums/rolesEnum';
import _ from 'lodash';

const alloweRoles = _.remove(Object.values(ROLES), (n)=>n!==ROLES.SADM)

const addUserSchema = {
    nom : Joi.string().required(),
    prenom : Joi.string(),
    telephone : Joi.string().pattern(new RegExp(/^(0|\+[0-9]{2,3})[0-9]{9}$/)).allow(null, '').required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)),
    role : Joi.string().valid(...alloweRoles).required(),
    client : Joi.number().positive(),
}

const getDeleteUserSchema = {
    id : Joi.number().positive(),
    role : Joi.string().valid(...alloweRoles),
}

const updateUserSchema = {
    id : Joi.number().positive().required(),
    ...addUserSchema,
    role : Joi.string().valid(...Object.values(ROLES)).required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).allow(null, '')
}

export default {
    addUserSchema: Joi.object(addUserSchema),
    getDeleteUserSchema : Joi.object(getDeleteUserSchema),
    updateUserSchema : Joi.object(updateUserSchema)
}