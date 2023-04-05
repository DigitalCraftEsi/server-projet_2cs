import Joi from 'joi';

const login = {
    email: Joi.string().email().messages({
        'string.email': `Email non valide`,
    }),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).required(),
}

const signUp = {
    nom : Joi.string().required(),
    prenom : Joi.string().required(),
    telephone : Joi.string().pattern(new RegExp(/^(0|\+[0-9]{2,3})[0-9]{9}$/)).allow(null, '').required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).required(),
}

export default {
    loginSchema: Joi.object(login),
    signUpSchema: Joi.object(signUp)
}