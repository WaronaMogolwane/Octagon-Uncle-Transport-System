import { AccountInformation } from "../Classes/AccountInformation";
import { BankingDetail } from "../Classes/Bankingdetail";
import { DbPool } from "../Services/DatabaseService";

export const InsertBankingDetail = async (
  bankingDetail: BankingDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call InsertNewBankingDetail(?,?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        bankingDetail.bankName,
        bankingDetail.branchNumber,
        bankingDetail.accountName,
        bankingDetail.accountNumber,
        bankingDetail.businessId,
        bankingDetail.paystackBankId,
        bankingDetail.paystackBankCode,
        bankingDetail.recipientCode,
      ],
    },
    function (error, results, fields) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results);
      }
    }
  );
};

export const UpdateBankingDetail = async (
  bankingDetail: BankingDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL UpdateBankingDetail(?,?,?,?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        bankingDetail.bankingDetailId,
        bankingDetail.bankName,
        bankingDetail.branchNumber,
        bankingDetail.accountName,
        bankingDetail.accountNumber,
        bankingDetail.businessId,
        bankingDetail.paystackBankId,
        bankingDetail.paystackBankCode,
        bankingDetail.recipientCode,
      ],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const GetBankingDetailByBankingId = async (
  businessId: string,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "CALL GetBankingDetail(?)",
      timeout: 40000,
      values: [businessId],
    },
    (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    }
  );
};

export const VerifyAccountNumberInPaystack = async (
  accountInformation: AccountInformation,
  callback: (error, result) => void
) => {
  const https = require("https");

  const params = JSON.stringify({
    bank_code: accountInformation.bankCode,
    country_code: accountInformation.countryCode,
    account_number: accountInformation.accountNumber,
    account_name: accountInformation.accountName,
    account_type: accountInformation.accountType,
    document_type: accountInformation.documentType,
    document_number: accountInformation.documentNumber,
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/bank/validate",
    method: "POST",
    headers: {
      Authorization: "Bearer sk_test_0a80bea8d2e15741d6fd001d8b956fa0b4b45ab2",
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          callback(null, parsedData);
        } catch (error) {
          callback(error, null);
        }
      });
    })
    .on("error", (error) => {
      callback(error, null);
    });

  req.write(params);
  req.end();
};
