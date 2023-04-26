/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-const */
import { NextFunction, Request, Response } from 'express'
import { BadRequestError, ForbiddenError, InternalError } from '../../handler/apiError'
import { SuccessMsgResponse, SuccessResponse } from '../../handler/ApiResponse'
import asyncHandler from '../../handler/asyncHandler'
import {
  onAddMachineHandler,
  onDeleteMachineHandler,
  onGetAllMachinesHandler,
  onGetMachineHander,
  onUpdateMachineHandler,
} from '../../services/machinService'
import schema from './schema'
import { isAC, isADM, isAM, isSADM } from '../../enums/rolesEnum'

/**
 * Get All existing vendingMachines in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getAllMaachin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const machines = await onGetAllMachinesHandler()
    if (machines === null) {
      next(new BadRequestError())
    } else {
      new SuccessResponse('success', machines).send(res)
    }
  },
)

/**
 * Get vendingMachine by id
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getMachine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    const machine = await onGetMachineHander(id)
    if (machine != null) {
      new SuccessResponse('', machine).send(res)
    } else {
      throw new BadRequestError("Machine doesn't existe")
    }
  },
)

/**
 * Add vendingMachine in DB
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const addMachine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {

    if (!req.user) {
      throw new InternalError('User not found');
    }
    if (!isSADM(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }

    const { error } = schema.vendingMachineSchema.validate(req.body)
    if (error) {
      throw new BadRequestError(error.details[0].message)
    }
    const machine = await onAddMachineHandler(req.body)
    if (machine === null) {
      throw new BadRequestError()
    } else {
      new SuccessResponse('success', machine).send(res)
    } 
  },
)

/**
 * Update existing vendingMachine .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const updateMachine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new InternalError('User not found');
    }
    if (!isADM(req.user.role) && !isAM(req.user.role) && !isAC(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    const machineUpdate = await onGetMachineHander(id)
    if (machineUpdate === null) {
      throw new BadRequestError("Machine doesn't existe")
    } 
    await onUpdateMachineHandler(req.body, id)
    const machine = await onGetMachineHander(id)
    new SuccessResponse('success', machine).send(res)
  }
)

/**
 * Delete existing vendingMachine .
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const deleteMachine = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new InternalError('User not found');
    }
    if (!isSADM(req.user.role) ) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    let machineDelete = await onGetMachineHander(id)
    if (machineDelete == null) {
      throw new BadRequestError("Machine doesn't existe")
    }
    if (machineDelete.idClient) {
      throw new ForbiddenError("Permission denied , client of this machine existe")
    }
    await onDeleteMachineHandler(id)
    new SuccessMsgResponse('deleting successfull').send(res)
  },
)


export const unlockMachine = asyncHandler(
  async (req : Request , res : Response , Next : NextFunction) => {
    if (!req.user) {
      throw new InternalError('User not found');
    }
    if (!isAM(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    const id = parseInt(req.params.id)
    const machineUpdate = await onGetMachineHander(id)
    if (machineUpdate === null) {
      throw new BadRequestError("Machine doesn't existe")
    }
    await onUpdateMachineHandler({codeDeDeverrouillage : req.body.code}, id)
    const machine = await onGetMachineHander(id)
    new SuccessResponse('success', machine).send(res)

  },
)

export const changeStatusOfMachine = asyncHandler(
  async (req : Request , res : Response , next : NextFunction) => {
    if (!req.user) {
      throw new InternalError('User not found');
    }

    const id = parseInt(req.params.id)
    const machineUpdate = await onGetMachineHander(id)
    if (machineUpdate === null) {
      throw new BadRequestError("Machine doesn't existe")
    }
    if (!req.body.status) {
      throw new BadRequestError("status is required !")
    }
    if (req.body.status != "Actif" && req.body.status != "Inactif") {
      throw new BadRequestError("status should be 'Actif' or 'Inactif' ")
    }
    if (req.body.status == machineUpdate.statut) {
      throw new BadRequestError("machine is already " + machineUpdate.statut)
    }
    await onUpdateMachineHandler({statut : req.body.status}, id)
    const machine = await onGetMachineHander(id)
    new SuccessResponse('success', machine).send(res)
  },
)


export const assignMachinesToClient = asyncHandler(
  async (req  : Request , res : Response , next : NextFunction) => {

    if (!req.user) {
      throw new InternalError('User not found');
    }
    if (!isSADM(req.user.role)) {
      throw new ForbiddenError('Permission denied');
    }
    for (let i = 0 ; i < req.body.machines.length ; i++) {
      const id = req.body.machines[i]
      const machine = await onGetMachineHander(id);
      if (machine == null) {
        throw new BadRequestError("Machine with id = " + id + " doesn't existe")
      }
      await onUpdateMachineHandler({idClient : req.body.client},id)
    }

    new SuccessMsgResponse("Assignation with success").send(res)
  },
)