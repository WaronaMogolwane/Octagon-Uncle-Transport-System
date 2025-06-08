export interface AuthorizationCharge {
    email: string;
    amount: string;
    reference: string;
    authorization_code: string;
    metadata: AuthorizationChargeMetadata;
}

export interface AuthorizationChargeMetadata {
    user_id: string;
    transporter_user_id: string;
    charge_type: string;
}
export class CardAuthorisation {
    cardAuthorisationId: string | undefined;
    userId: string | undefined;
    authorizationCode: string | undefined;
    maskedCardNumber: string | undefined;
    cardExpiryMonth: string | undefined;
    cardExpiryYear: string | undefined;
    cardType: string | undefined;
    bankName: string | undefined;
    countryCode: string | undefined;
    dateCreated: Date | undefined;

    constructor(
        cardAuthorisationId?: string,
        userId?: string,
        authorizationCode?: string,
        maskedCardNumber?: string,
        cardExpiryMonth?: string,
        cardExpiryYear?: string,
        cardType?: string,
        bankName?: string,
        countryCode?: string,
        dateCreated?: Date,
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