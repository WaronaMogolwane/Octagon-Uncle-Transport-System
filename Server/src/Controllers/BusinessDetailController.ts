import { randomUUID } from "crypto";
import { BusinessDetail } from "../Classes/BusinessDetail";
import {
  GetBusinessDetailByBusinessId,
  GetBusinessDetailForParentByBusinessId,
  InsertBusinessDetail,
  UpdateBusinessDetail,
} from "../Models/BusinessDetailModel";
import { ErrorResponse } from "../Classes/ErrorResponse";

export const AddBusinessDetail = async (req: any, res: any, next: any) => {
  let newBusinessDetail = new BusinessDetail(
    randomUUID(),
    req.body.businessDetail.BusinessName,
    req.body.businessDetail.BusinessPhoneNumber,
    req.body.businessDetail.AddressLine1,
    req.body.businessDetail.AddressLine2,
    req.body.businessDetail.Suburb,
    req.body.businessDetail.City,
    req.body.businessDetail.Province,
    req.body.businessDetail.PostalCode,
    req.body.businessDetail.BusinessId
  );

  await InsertBusinessDetail(newBusinessDetail, (error, result) => {
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
        TripCreated: true,
        result: result[0],
      });
    }
  });
};

export const ModifyBusinessDetail = async (req: any, res: any, next: any) => {
  let newBusinessDetail = new BusinessDetail(
    randomUUID(),
    req.body.businessDetail.BusinessName,
    req.body.businessDetail.BusinessPhoneNumber,
    req.body.businessDetail.AddressLine1,
    req.body.businessDetail.AddressLine2,
    req.body.businessDetail.Suburb,
    req.body.businessDetail.City,
    req.body.businessDetail.Province,
    req.body.businessDetail.PostalCode,
    req.body.businessDetail.BusinessId
  );

  await UpdateBusinessDetail(newBusinessDetail, (error, result) => {
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
        TripCreated: true,
        result: result[0],
      });
    }
  });
};

export const GetBusinessDetail = async (req: any, res: any, next: any) => {
  let businessId = req.query.BusinessId;

  await GetBusinessDetailByBusinessId(businessId, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result[0] == "") {
      let err: any = {
        status: 405,
        message: "Record not found",
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

export const GetBusinessDetailForParent = async (
  req: any,
  res: any,
  next: any
) => {
  let businessId = req.query.BusinessId;

  await GetBusinessDetailForParentByBusinessId(businessId, (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } else if (result[0] == "") {
      let err: any = {
        status: 405,
        message: "Record not found",
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
