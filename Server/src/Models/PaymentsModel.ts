import { CardAuthorisation } from "../Classes/CardAuthorisation";
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
