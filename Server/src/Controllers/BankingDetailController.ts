import { randomUUID } from "crypto";
import { BankingDetail } from "../Classes/Bankingdetail";
import {
  GetBankingDetailByBankingId,
  InsertBankingDetail,
  UpdateBankingDetail,
} from "../Models/BankingDetailModel";
import { ErrorResponse } from "../Classes/ErrorResponse";

export const AddBankingDetail = async (req: any, res: any, next: any) => {
  let bankingDetail = new BankingDetail(
    randomUUID(),
    req.body.bankingDetail.BankName,
    Number(req.body.bankingDetail.BranchNumber),
    req.body.bankingDetail.AccountName,
    Number(req.body.bankingDetail.AccountNumber),
    req.body.bankingDetail.BusinessId,
    req.body.bankingDetail.PaystackBankId,
    req.body.bankingDetail.PaystackBankCode,
    randomUUID()
  );
  await InsertBankingDetail(bankingDetail, (error, result) => {
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
        PassengerCreated: true,
        result: result.affectedRows,
      });
    }
  });
};

export const GetBankingDetail = async (req: any, res: any, next: any) => {
  const businessId = req.query.BusinessId;

  await GetBankingDetailByBankingId(businessId, async (error, result) => {
    if (error) {
      next(new ErrorResponse(501, error.message));
    } /* else if (result.rowCount == 0) {
        let err: any = {
          status: 405,
          message: "Record not found",
        };
        next(err);
      } */ else {
      res.status(200).json({
        RecordRetrieved: true,
        result: result[0],
      });
    }
  });
};

export const ModifyBankingDetail = async (req: any, res: any, next: any) => {
  let bankingDetail = new BankingDetail(
    req.body.bankingDetail.BankingDetailId,
    req.body.bankingDetail.BankName,
    Number(req.body.bankingDetail.BranchNumber),
    req.body.bankingDetail.AccountName,
    Number(req.body.bankingDetail.AccountNumber),
    req.body.bankingDetail.BusinessId,
    req.body.bankingDetail.PaystackBankId,
    req.body.bankingDetail.PaystackBankCode,
    req.body.bankingDetail.RecipientCode
  );

  await UpdateBankingDetail(bankingDetail, (error, result) => {
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
