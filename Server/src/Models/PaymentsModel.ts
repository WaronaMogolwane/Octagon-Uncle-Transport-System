import { OkPacket, QueryError, RowDataPacket } from "mysql2";
import { BulkChargeReponse } from "../Classes/BulkCharge";
import { CardAuthorisation } from "../Classes/CardAuthorisation";
import { Refund } from "../Classes/Refund";
import { Transaction } from "../Classes/Transaction";
import { DbPool } from "../Services/DatabaseService";
import { BankTransfer, Transfer } from "../Classes/Transfer";
import { PaymentSchedule } from "../Classes/PaymentSchedule";

export const InsertCardAuthorisation = async (
    cardAuthorisation: CardAuthorisation,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewCardAuthorisation(?,?,?,?,?,?,?,?,?);",
            timeout: 40000,
            values: [
                cardAuthorisation.userId,
                cardAuthorisation.authorizationCode,
                cardAuthorisation.maskedCardNumber,
                cardAuthorisation.cardExpiryMonth,
                cardAuthorisation.cardExpiryYear,
                cardAuthorisation.cardType,
                cardAuthorisation.bankName,
                cardAuthorisation.countryCode,
                cardAuthorisation.dateCreated
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
export const InsertNewTransaction = async (
    transaction: Transaction,
    callback: (error: QueryError, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewTransaction(?,?,?,?,?,?,?,?);",
            timeout: 40000,
            values: [
                transaction.userId,
                transaction.amount,
                transaction.currency,
                transaction.status,
                transaction.reference,
                transaction.dateCreated,
                transaction.datePaid,
                transaction.transactionType
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
export const InsertNewTransfer = async (
    newTransfer: Transfer,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewTransfer(?,?,?,?,?,?,?,?,?,?);",
            timeout: 40000,
            values: [
                newTransfer.transferCode,
                newTransfer.amount,
                newTransfer.currency,
                newTransfer.status,
                newTransfer.reference,
                newTransfer.reason,
                newTransfer.dateCreated,
                newTransfer.dateUpdated,
                newTransfer.transactionType,
                newTransfer.paystackId
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
export const InsertNewRefund = async (
    refund: Refund,
    callback: (error: any, result: any) => void
) => {
    console.log(refund.transactionReference)
    DbPool.query(
        {
            sql: "CALL InsertNewRefund(?,?,?,?,?,?);",
            timeout: 40000,
            values: [
                refund.transaction,
                refund.amount,
                refund.currency,
                refund.merchant_note,
                refund.customer_note,
                refund.transactionReference
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
export const GetNewBulkCharge = async (
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL CreateNewBulkCharge();",
            timeout: 40000,
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
export const GetBulkChargesForToday = async (
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetBulkChargesForToday();",
            timeout: 40000,
        },
        function (error, results: RowDataPacket[], fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0]);
            }
        }
    );
};
export const AreRecurringChargesPendingToday = async (
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL AreRecurringChargesPendingToday();",
            timeout: 40000,
        },
        function (error, results: RowDataPacket[], fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results[0][0].AreRecurringChargesPendingToday);
            }
        }
    );
};
export const InsertPendingCharges = async (
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL CreatePendingCharges();",
            timeout: 40000,
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const InsertPaymentSchedule = async (
    newPaymentSchedule: PaymentSchedule,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewPaymentSchedule(?,?,?,?);",
            timeout: 40000,
            values: [
                newPaymentSchedule.UserId,
                newPaymentSchedule.Amount,
                newPaymentSchedule.CardAuthorisationId,
                newPaymentSchedule.PaymentDay
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
export const InsertNewBulkCharge = async (
    newBulkChargeReponse: BulkChargeReponse,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewBulkCharge(?,?,?,?,?,?,?,?);",
            timeout: 40000,
            values: [
                newBulkChargeReponse.status,
                newBulkChargeReponse.message,
                newBulkChargeReponse.data.batch_code,
                newBulkChargeReponse.data.reference,
                newBulkChargeReponse.data.total_charges,
                newBulkChargeReponse.data.pending_charges,
                newBulkChargeReponse.data.createdAt,
                newBulkChargeReponse.data.updatedAt
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
export const GetAvailableBalanceByBusinessId = async (
    businessId: string,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetBalanceByBusinessId(?);",
            timeout: 40000,
            values: [
                businessId
            ],
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const GetPaymentsSummaryForThisMonthByBusinessId = async (
    businessId: string,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetPaymentsForThisMonthByBusinessId(?);",
            timeout: 40000,
            values: [
                businessId
            ],
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const GetUpcomingPaymentSummaryByBusinessId = async (
    businessId: string,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetUpcomingPaymentsSummaryByBusinessId(?);",
            timeout: 40000,
            values: [
                businessId
            ],
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const GetDeclinedPaymentSummaryByBusinessId = async (
    businessId: string,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetDeclinedPaymentsSummaryByBusinessId(?);",
            timeout: 40000,
            values: [
                businessId
            ],
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const GetPaymentsByBusinessId = async (
    businessId: string,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetPaymentsByBusinessId(?);",
            timeout: 40000,
            values: [
                businessId
            ],
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const GetCardAuthorizationsByUserId = async (
    userId: string,
    callback: (error: any, result: any) => void
) => {
    const sql: string =
        "SELECT * FROM CardAuthorisation WHERE UserId = '{0}' ORDER BY CardAuthorisationId DESC, IsActive DESC"
            .format(userId);
    DbPool.query(
        {
            sql: sql,
            timeout: 40000,
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};
export const GetMonthlyPaymentDetailsByUserId = async (
    userId: string,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL GetMonthlyPaymentDetails(?);",
            timeout: 40000,
            values: [
                userId
            ],
        },
        function (error, results: OkPacket, fields) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        }
    );
};