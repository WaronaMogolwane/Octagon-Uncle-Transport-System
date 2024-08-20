export class CardAuthorisation {
    cardAuthorisationId: string;
    userId: string;
    authorizationCode: string;
    maskedCardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardType: string;
    bankName: string;
    countryCode: string;
    dateCreated: Date;

    constructor(
        cardAuthorisationId: string,
        userId: string,
        authorizationCode: string,
        maskedCardNumber: string,
        cardExpiryMonth: string,
        cardExpiryYear: string,
        cardType: string,
        bankName: string,
        countryCode: string,
        dateCreated: Date,
    ) {
        this.cardAuthorisationId = cardAuthorisationId;
        this.userId = userId;
        this.authorizationCode = authorizationCode;
        this.maskedCardNumber = maskedCardNumber;
        this.cardExpiryMonth = cardExpiryMonth;
        this.cardExpiryYear = cardExpiryYear;
        this.cardType = cardType;
        this.bankName = bankName;
        this.countryCode = countryCode;
        this.dateCreated = dateCreated;
    }
}