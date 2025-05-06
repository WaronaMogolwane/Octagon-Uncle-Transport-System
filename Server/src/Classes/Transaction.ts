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
export interface PaystackTransactionData {
    id: number;
    metadata: {
        user_id?: string;
        charge_type?: string;
    };
    amount: number;
    currency: string;
    status: string;
    reference: string;
    created_at: string;
    paid_at: string | null;
    // Add other relevant fields from Paystack API as needed
}

export interface PaystackListTransactionsResponse {
    status: boolean;
    message: string;
    data: PaystackTransactionData[];
    meta: {
        total: number;
        perPage: number;
        page: number;
        pageCount: number;
        totalFiltered: number;
    };
}