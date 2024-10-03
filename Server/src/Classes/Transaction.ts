export class Transaction {
    transactionId: number;
    userId: string;
    amount: number;
    currency: string;
    status: string;
    reference: string;
    dateCreated: Date;
    datePaid: Date;
    transactionType: string;

    constructor(
        transactionId: number,
        userId: string,
        amount: number,
        currency: string,
        status: string,
        reference: string,
        dateCreated: Date,
        datePaid: Date,
        transactionType: string,
    ) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.reference = reference;
        this.dateCreated = dateCreated;
        this.datePaid = datePaid;
        this.transactionType = transactionType;
    }
}