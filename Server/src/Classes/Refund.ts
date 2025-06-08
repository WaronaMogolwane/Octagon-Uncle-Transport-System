export class Refund {
    transaction: string;
    amount: number;
    currency: string;
    transactionReference: string;
    merchant_note?: string;
    customer_note?: string;
}
