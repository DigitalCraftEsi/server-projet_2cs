import Joi from 'joi';
import { ROLES } from '../../enums/rolesEnum';
import _ from 'lodash';


const updateProfileSchema = {
    fName : Joi.string().required(),
    lName : Joi.string().required(),
    phone : Joi.string().pattern(new RegExp(/^(0|\+[0-9]{2,3})[0-9]{9}$/)).allow(null, '').required(),
    email: Joi.string().email().required(),
    picture : Joi.string().allow('').required()
}

const updatePasswordSchema = {
    oldPassword: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).allow(null, '').required(),
    newPassword: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).allow(null, '').required()
}

export default {
    updatePasswordSchema: Joi.object(updatePasswordSchema),
    updateProfileSchema : Joi.object(updateProfileSchema),
}