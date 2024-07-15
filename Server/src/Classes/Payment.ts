export class Payment {
    PaymentId: string;
    Reference: string;
    Amount: string;
    DateCreated: Date;
    constructor(
        PaymentId: string,
        Reference: string,
        Amount: string,
        DateCreated: Date
    ) {
        this.PaymentId = PaymentId;
        this.Reference = Reference;
        this.Amount = Amount;
        this.DateCreated = DateCreated;
    }
}