export class Refund {
    transaction: number;
    amount: number;
    currency: string;
    merchant_note?: string;
    customer_note?: string;
}
