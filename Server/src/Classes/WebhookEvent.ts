export class TransactionWebhookEvent {
    event: string;
    data: Data;
}

export class Data {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    message: null;
    gateway_response: string;
    paid_at: Date;
    created_at: Date;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: TransactionMetadata;
    fees_breakdown: null;
    log: null;
    fees: number;
    fees_split: null;
    authorization: Authorization;
    customer: Customer;
    plan: Plan;
    subaccount: Plan;
    split: Plan;
    order_id: null;
    paidAt: Date;
    requested_amount: number;
    pos_transaction_data: null;
    source: Source;
}

export class Authorization {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
    reusable: boolean;
    signature: string;
    account_name: null;
    receiver_bank_account_number: null;
    receiver_bank: null;
}

export class Customer {
    id: number;
    first_name: null;
    last_name: null;
    email: string;
    customer_code: string;
    phone: null;
    metadata: null;
    risk_action: string;
    international_format_phone: null;
}

export class TransactionMetadata {
    user_id: string;
    transporter_user_id: string;
    charge_type: string;
}

export class Plan {
}

export class Source {
    type: string;
    source: string;
    entry_point: string;
    identifier: null;
}

export class RefundWebhookEvent {
    event: string;
    data: RefundData;
}

export class RefundData {
    status: string;
    transaction_reference: string;
    refund_reference: string;
    amount: number;
    currency: string;
    customer: RefundCustomer;
    integration: number;
    domain: string;
    id: string;
    customer_note: string;
    merchant_note: string;
}

export class RefundCustomer {
    first_name: string;
    last_name: string;
    email: string;
}
