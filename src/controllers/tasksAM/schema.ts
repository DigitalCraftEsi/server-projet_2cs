import Joi from 'joi';
import _ from 'lodash';
import { STATUS_TASK_AM } from '../../enums/rolesEnum';

const addTask = {
    title : Joi.string().required(),
    descr  : Joi.string().required(),
    dateEnd : Joi.date().iso().required(),
    machine : Joi.number().required(),
    qty : Joi.number(),
    type : Joi.string().required(),
    am : Joi.number().required()
}

const updateNotifTask = {
    idTask : Joi.number().required(),
    notif : Joi.boolean().required()
}

const updateStatusTask = {
    idTask : Joi.number().required(),
    status : Joi.boolean().valid(...Object.values(STATUS_TASK_AM)).required()
}

export default {
    addTaskSchema: Joi.object(addTask),
    updateNotifTaskSchema : Joi.object(updateNotifTask),
    updateStatusTaskSchema : Joi.object(updateStatusTask)
}