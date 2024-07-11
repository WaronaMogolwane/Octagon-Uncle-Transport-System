import { BankingDetail } from "../Classes/Bankingdetail";
import { DbPool } from "../Services/DatabaseService";

export const InsertBankingDetail = async (
  bankingDetail: BankingDetail,
  callback: (error, result) => void
) => {
  DbPool.query(
    {
      sql: "call InsertNewBankingDetail(?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        bankingDetail.bankingDetailId,
        bankingDetail.bankName,
        bankingDetail.branchNumber,
        bankingDetail.accountName,
        bankingDetail.accountNumber,
        bankingDetail.businessId,
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
      sql: "CALL UpdateBankingDetail(?,?,?,?,?,?)",
      timeout: 40000,
      values: [
        bankingDetail.bankingDetailId,
        bankingDetail.bankName,
        bankingDetail.branchNumber,
        bankingDetail.accountName,
        bankingDetail.accountNumber,
        bankingDetail.businessId,
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
