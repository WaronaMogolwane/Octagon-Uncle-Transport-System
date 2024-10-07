import { CardAuthorisation } from "../Classes/CardAuthorisation";
import { Refund } from "../Classes/Refund";
import { Transaction } from "../Classes/Transaction";
import { DbPool } from "../Services/DatabaseService";

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
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewTransaction(?,?,?,?,?,?,?,?,?);",
            timeout: 40000,
            values: [
                transaction.transactionId,
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
export const InsertNewRefund = async (
    refund: Refund,
    callback: (error: any, result: any) => void
) => {
    DbPool.query(
        {
            sql: "CALL InsertNewRefund(?,?,?,?,?);",
            timeout: 40000,
            values: [
                refund.transaction,
                refund.amount,
                refund.currency,
                refund.merchant_note,
                refund.customer_note
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

