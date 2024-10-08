import { randomUUID } from "crypto";
import { UserDetail } from "../Classes/UserDetail";

import {
  InsertUserDetail,
  GetUserDetailByUserId,
  UpdateUserDetail,
} from "../Models/UserDetailsModel";
import { ErrorResponse } from "../Classes/ErrorResponse";

export const AddUserDetail = async (req: any, res: any, next: any) => {
  let newUserDetail = new UserDetail(
    randomUUID(),
    req.body.userDetail.FirstName,
    req.body.userDetail.LastName,
    req.body.userDetail.PhoneNumber,
    req.body.userDetail.AddressLine1,
    req.body.userDetail.AddressLine2,
    req.body.userDetail.Surburb,
    req.body.userDetail.City,
    req.body.userDetail.Province,
    req.body.userDetail.PostalCode,
    req.body.userDetail.UserId
  );
  await InsertUserDetail(newUserDetail, (error, result) => {
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
        UserCreated: true,
        result: result[0],
      });
    }
  });
};

export const GetUserDetail = async (req: any, res: any, next: any) => {
  let userId = req.body.userDetails.UserId;
  await GetUserDetailByUserId(userId, (error, result) => {
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

export const UpdateUserPersonalDetail = async (
  req: any,
  res: any,
  next: any
) => {
  let userDetail = new UserDetail(
    req.body.userDetail.UserDetailId,
    req.body.userDetail.FirstName,
    req.body.userDetail.LastName,
    req.body.userDetail.Cellphone,
    req.body.userDetail.AddressLine1,
    req.body.userDetail.AddressLine2,
    req.body.userDetail.Surburb,
    req.body.userDetail.City,
    req.body.userDetail.Province,
    req.body.userDetail.PostalCode,
    req.body.userDetail.UserId
  );
  await UpdateUserDetail(userDetail, (error, result) => {
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
