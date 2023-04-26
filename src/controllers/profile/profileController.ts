/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    AuthFailureError,
  BadRequestError,
  ForbiddenError,
  InternalError,
} from "../../handler/apiError";
import bcrypt from 'bcrypt';
import { SuccessMsgResponse, SuccessResponse } from "../../handler/ApiResponse";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../handler/asyncHandler";
import schema from "./schema";
import { ROLES } from "../../enums/rolesEnum";
import {
  onGetACHandler,
  onGetADMHandler,
  onGetAMHandler,
  onGetCONSUMERHandler,
  onGetConsumerHandler,
  onGetDECIDEURHandler,
  onGetSADMHandler,
  onUpdateACHandler,
  onUpdateADMHandler,
  onUpdateAMHandler,
  onUpdateConsumerHandler,
  onUpdateDECIDEURHandler,
  onUpdatePasswordACHandler,
  onUpdatePasswordADMHandler,
  onUpdatePasswordAMHandler,
  onUpdatePasswordConsumerMHandler,
  onUpdatePasswordDECIDEURMHandler,
  onUpdatePasswordSADMHandler,
  onUpdateSADMHandler,
} from "../../services/userService";
import { userJwtPayload , createTokens , createCookie } from "../../utils/token";


interface RequestWithFile extends Request {
  file: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    filename: string;
    path: string;
    buffer: Buffer;
  };
}

/**
 * Get Profile of user connected
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const getprofile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new InternalError("User not found");
    }
    const _user = req.user;
    let _profile: any;
    switch (_user.role) {
      case ROLES.SADM: {
        _profile = await onGetSADMHandler(_user.id);
        break;
      }
      case ROLES.ADM: {
        _profile = await onGetADMHandler(_user.id);
        break;
      }
      case ROLES.AM: {
        _profile = await onGetAMHandler(_user.id);
        break;
      }
      case ROLES.AC: {
        _profile = await onGetACHandler(_user.id);
        break;
      }
      case ROLES.CONSUMER: {
        _profile = await onGetCONSUMERHandler(_user.id);
        break;
      }
      case ROLES.DECIDEUR: {
        _profile = await onGetDECIDEURHandler(_user.id);
        break;
      }
      default:
        throw new InternalError("Unknown role");
    }
    new SuccessResponse("profile allowed with success", _profile).send(res);
  }
);

/**
 * Update Profile of user connected
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const updateProfile = asyncHandler(
  async (req: RequestWithFile, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new InternalError("User not found");
    }
    const _user = req.user;
    const _picture = req.file ? "src/uploads/" + req.file.filename : _user.picture ? _user.picture : '';
    const { error } = schema.updateProfileSchema.validate({...req.body , picture : _picture});
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }
    let userPayload: userJwtPayload;

    switch (_user.role) {
      case ROLES.SADM: {
        const _profile = await onUpdateSADMHandler({
          ...req.body,
          id: _user.id,
          picture: _picture
        });
        userPayload = {
            id: _profile.idSADM,
            nom: _profile.nomSADM,
            prenom: _profile.prenomSADM,
            email: _profile.emailSADM,
            role: ROLES.SADM,
            telephone: _profile.telephoneSADM,
            picture : _profile.picture ? _profile.picture : ''
        };
        break;
      }
      case ROLES.ADM: {
        const _profile = await onUpdateADMHandler({
          ...req.body,
          id: _user.id,
          picture: _picture
        });
        userPayload = {
            id: _profile.idADM,
            nom: _profile.nomADM,
            prenom: _profile.prenomADM,
            email: _profile.emailADM,
            role: ROLES.ADM,
            telephone: _profile.telephoneADM,
            clientId: _profile.idClient,
            picture : _profile.picture ? _profile.picture : ''
        };
        break;
      }
      case ROLES.AM: {
        const _profile = await onUpdateAMHandler({
          ...req.body,
          id: _user.id,
          picture: _picture
        });
        userPayload = {
            id: _profile.idAM,
            nom: _profile.nomAM,
            prenom: _profile.prenomAM,
            email: _profile.emailAM,
            role: ROLES.AM,
            telephone: _profile.telephoneAM,
            clientId: _profile.idClient,
            picture : _profile.picture ? _profile.picture : ''
        };
        break;
      }
      case ROLES.AC: {
        const _profile = await onUpdateACHandler({
          ...req.body,
          id: _user.id,
          picture: _picture
        });
        userPayload = {
            id: _profile.idAC,
            nom: _profile.nomAC,
            prenom: _profile.prenomAC,
            email: _profile.emailAC,
            role: ROLES.AC,
            telephone: _profile.telephoneAC,
            clientId: _profile.idClient,
            picture : _profile.picture ? _profile.picture : ''
        };
        break;
      }
      case ROLES.CONSUMER: {
        const _profile = await onUpdateConsumerHandler({
          ...req.body,
          id: _user.id,
          picture: _picture
        });
        userPayload = {
            id: _profile.idConsommateur,
            nom: _profile.nomConsommateur,
            prenom: _profile.prenomConsommateur,
            email: _profile.emailConsommateur,
            role: ROLES.CONSUMER,
            telephone: _profile.telephoneConsommateur,
            picture : _profile.picture ? _profile.picture : ''
        };
        break;
      }
      case ROLES.DECIDEUR: {
        const _profile = await onUpdateDECIDEURHandler({
          ...req.body,
          id: _user.id,
          picture: _picture
        });
        userPayload = {
            id: _profile.idDecideur,
            nom: _profile.nomDecideur,
            prenom: _profile.prenomDecideur,
            email: _profile.emailDecideur,
            role: ROLES.AM,
            telephone: _profile.telephoneDecideur,
            clientId: _profile.idClient,
            picture : _profile.picture ? _profile.picture : ''
        };
        break;
      }
      default:
        throw new InternalError("Unknown role");
    }
    const [token, refreshToken] = createTokens(userPayload)
    createCookie(res, token, 'accessToken', Number(process.env.ACCESS_TOKEN_COOKIE_EXPIRES));
    createCookie(res, refreshToken, 'refreshToken', Number(process.env.REFRESH_TOKEN_COOKIE_EXPIRES));
    new SuccessResponse("profile updated with success", userPayload).send(res);
  }
);

/**
 * Update Profile of user connected
 * @param {Request} req - object represents an incoming HTTP request
 * @param {Response} res - object represents the server's response to an HTTP request
 * @param {NextFunction} next - callback function that is used to pass control to the next middleware function in the stack
 */
export const updatePassword = asyncHandler(
    async (req: RequestWithFile, res: Response, next: NextFunction) => {
      if (!req.user) {
        throw new InternalError("User not found");
      }
      const { error } = schema.updatePasswordSchema.validate(req.body);
      console.log(error ,"jj")
      if (error) {
        throw new BadRequestError(error.details[0].message);
      }
      switch (req.user.role) {
        case ROLES.SADM: {
          const _user = onGetSADMHandler(req.user.id)
          const match: boolean = await bcrypt.compare(req.body.oldPassword, (await _user).motDePasseSADM);
          if (!match){
            throw new BadRequestError('Incorrect password');
          }
          const passHashed = await bcrypt.hash(req.body.newPassword, 10);
          await onUpdatePasswordSADMHandler(req.user.id,passHashed)
          break;
        }
        case ROLES.ADM: {
          const _user = onGetADMHandler(req.user.id)
          const match: boolean = await bcrypt.compare(req.body.oldPassword, (await _user).motDePasseADM);
          if (!match){
            throw new BadRequestError('Incorrect password');
          }
          const passHashed = await bcrypt.hash(req.body.newPassword, 10);
          await onUpdatePasswordADMHandler(req.user.id,passHashed)
          break;
        }
        case ROLES.AM: {
          const _user = onGetAMHandler(req.user.id)
          const match: boolean = await bcrypt.compare(req.body.oldPassword, (await _user).motDePasseAM);
          if (!match){
            throw new BadRequestError('Incorrect password');
          }
          const passHashed = await bcrypt.hash(req.body.newPassword, 10);
          await onUpdatePasswordAMHandler(req.user.id,passHashed)
          break;
        }
        case ROLES.AC: {
          const _user = onGetACHandler(req.user.id)
          const match: boolean = await bcrypt.compare(req.body.oldPassword, (await _user).motDePasseAC);
          if (!match){
            throw new BadRequestError('Incorrect old password');
          }
          const passHashed = await bcrypt.hash(req.body.newPassword, 10);
          await onUpdatePasswordACHandler(req.user.id,passHashed)
          break;
        }
        case ROLES.CONSUMER: {
          const _user = onGetConsumerHandler(req.user.id)
          const match: boolean = await bcrypt.compare(req.body.oldPassword, (await _user).motDePasseConsommateur);
          if (!match){
            throw new BadRequestError('Incorrect password');
          }
          const passHashed = await bcrypt.hash(req.body.newPassword, 10);
          await onUpdatePasswordConsumerMHandler(req.user.id,passHashed)
          break;
        }
        case ROLES.DECIDEUR: {
          const _user = onGetDECIDEURHandler(req.user.id)
          const match: boolean = await bcrypt.compare(req.body.oldPassword, (await _user).motDePasseDecideur);
          if (!match){
            throw new BadRequestError('Incorrect password');
          }
          const passHashed = await bcrypt.hash(req.body.newPassword, 10);
          await onUpdatePasswordDECIDEURMHandler(req.user.id,passHashed)
          break;
        }
        default:
          throw new InternalError("Unknown role");
      }

    new SuccessMsgResponse("password updated with success").send(res);

    })