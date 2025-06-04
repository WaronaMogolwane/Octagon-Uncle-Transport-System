import { randomUUID } from "crypto";
import { BankingDetail } from "../Classes/Bankingdetail";
import {
  GetBankingDetailByBankingId,
  InsertBankingDetail,
  UpdateBankingDetail,
  VerifyAccountNumberInPaystack,
} from "../Models/BankingDetailModel";
import { ErrorResponse } from "../Classes/ErrorResponse";
import { AccountInformation } from "../Classes/AccountInformation";

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
    req.body.bankingDetail.AccountType,
    req.body.bankingDetail.DocumentType,
    req.body.bankingDetail.DocumentNumber,
    randomUUID()
  );

  console.log(bankingDetail);

  await InsertBankingDetail(bankingDetail, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
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
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
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
    req.body.bankingDetail.AccountType,
    req.body.bankingDetail.DocumentType,
    req.body.bankingDetail.DocumentNumber,
    req.body.bankingDetail.RecipientCode
  );

  await UpdateBankingDetail(bankingDetail, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
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

export const VerifyAccountNumber = async (req: any, res: any, next: any) => {
  let accountInfomation = new AccountInformation(
    req.query.BankCode,
    req.query.CountryCode,
    req.query.AccountNumber,
    req.query.AccountName,
    req.query.AccountType,
    req.query.DocumentType,
    req.query.DocumentNumber
  );

  console.log(accountInfomation);

  await VerifyAccountNumberInPaystack(accountInfomation, (error, result) => {
    if (error) {
      const err: Error = new Error(error.message);
      next(new ErrorResponse(400, err.message, err.stack));
      // } else if (result.affectedRows == 0) {
      //   let err: any = {
      //     status: 499,
      //     message: "Something went wrong",
      //   };
      //   next(err);
    } else {
      res.status(200).json({
        AccountVerified: true,
        result: result,
      });
    }
  });
};
