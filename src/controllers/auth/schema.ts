import Joi from 'joi';

const login = {
    email: Joi.string().email().messages({
        'string.email': `Email non valide`,
    }),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).required()
    ,
}

export default {
    loginSchema: Joi.object(login),
}