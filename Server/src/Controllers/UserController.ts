import { ErrorResponse } from "../Classes/ErrorResponse";
import {
  GetUserByUserId,
  UpdateUserEmailByUserId,
  UpdateUserPasswordByUserId,
} from "../Models/UserModel";

export const GetUser = async (req: any, res: any, next: any) => {
  let userId = req.query.UserId;

  await GetUserByUserId(userId, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const UpdateUserEmail = async (req: any, res: any, next: any) => {
  let user = {
    userId: req.body.user.UserId,
    email: req.body.user.Email,
  };
  await UpdateUserEmailByUserId(user, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Something went wrong",
      };
      next(err);
    } else {
      res.status(200).json({
        UserDetailUpdated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const UpdateUserPassword = async (req: any, res: any, next: any) => {
  let user = {
    userId: req.body.user.UserId,
    password: req.body.user.Password,
    oldPassword: req.body.user.OldPassword,
  };
  await UpdateUserPasswordByUserId(user, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result.affectedRows == 0) {
      let err: any = {
        status: 499,
        message: "Old password is incorrect",
      };
      next(err);
    } else {
      res.status(200).json({
        UserDetailUpdated: true,
        result: result.affectedRows,
      });
    }
  });
};
