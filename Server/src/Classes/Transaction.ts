export class Transaction {
    customerEmail: string;
    amount: string;
    currency: string;
    status: string;
    reference: string;
    dateCreated: Date;
    datePaid: Date;
    transactionType: string;
    authorizationCode: string;

    constructor(
        customerEmail: string,
        amount: string,
        currency: string,
        status: string,
        reference: string,
        dateCreated: Date,
        datePaid: Date,
        transactionType: string,
        authorizationCode: string
    ) {
        this.customerEmail = customerEmail;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.reference = reference;
        this.dateCreated = dateCreated;
        this.datePaid = datePaid;
        this.transactionType = transactionType;
        this.authorizationCode = authorizationCode;
    }
}