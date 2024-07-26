export class CardAuthorization {
    cardAuthorizationId: string;
    userId: string;
    authorizationCode: string;
    maskedCardNumber: string;
    cardExpiryMonth: string;
    cardExpiryYear: string;
    cardType: string;
    bank: string;
    countryCode: string;
    dateCreated: Date;
    dateModified: Date;
    constructor(
        cardAuthorizationId: string,
        userId: string,
        authorizationCode: string,
        maskedCardNumber: string,
        cardExpiryMonth: string,
        cardExpiryYear: string,
        cardType: string,
        bank: string,
        countryCode: string,
        dateCreated: Date,
        dateModified: Date
    ) {
        this.cardAuthorizationId = cardAuthorizationId;
        this.userId = userId;
        this.authorizationCode = authorizationCode;
        this.maskedCardNumber = maskedCardNumber;
        this.cardExpiryMonth = cardExpiryMonth;
        this.cardExpiryYear = cardExpiryYear;
        this.cardType = cardType;
        this.bank = bank;
        this.countryCode = countryCode;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified
    }
}