import { randomUUID } from "crypto";
import { UserDetail } from "../Classes/UserDetail";

import {
  AddUserDetailData,
  GetUserDetailData,
  UpdateUserDetailData,
} from "../Models/UserDetailsModel";

export const AddUserDetail = async (req: any, res: any, next: any) => {
  let newUserDetail = new UserDetail(
    randomUUID(),
    req.body.userDetail.FirstName,
    req.body.userDetail.LastName,
    req.body.userDetail.AddressLine1,
    req.body.userDetail.AddressLine2,
    req.body.userDetail.Surburb,
    req.body.userDetail.City,
    req.body.userDetail.Province,
    req.body.userDetail.PostalCode,
    req.body.userDetail.UserId
  );
  await AddUserDetailData(newUserDetail, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        UserCreated: true,
        result: result.rows[0],
      });
    }
  });
};

export const GetAllUserDetail = async (req: any, res: any, next: any) => {
  let userId = req.body.userDetails.userId;

  await GetUserDetailData(userId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result.rows[0],
      });
    }
  });
};

export const GetUserDetail = async (req: any, res: any, next: any) => {
  let userId = req.body.userDetails.UserId;
  await GetUserDetailData(userId, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result.rows[0],
      });
    }
  });
};

export const UpdateUserDetail = async (req: any, res: any, next: any) => {
  let userDetail = new UserDetail(
    req.body.userDetail.userDetailId,
    req.body.userDetail.FirstName,
    req.body.userDetail.LastName,
    req.body.userDetail.AddressLine1,
    req.body.userDetail.AddressLine2,
    req.body.userDetail.Surburb,
    req.body.userDetail.City,
    req.body.userDetail.Province,
    req.body.userDetail.PostalCode,
    req.body.userDetail.UserId
  );
  await UpdateUserDetailData(userDetail, (error, result) => {
    if (error) {
      let err: any = {
        status: 400,
        message: error.message,
      };
      next(err);
    } else {
      res.status(200).json({
        UserDetailUpdated: true,
        result: result.rows[0],
      });
    }
  });
};
