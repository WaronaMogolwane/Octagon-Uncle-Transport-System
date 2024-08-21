export class WebhookEvent {
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
    metadata: Metadata;
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

export class Metadata {
    custom_fields: CustomField[];
}

export class CustomField {
    user_id: string;
    deviceId: string;
}

export class Plan {
}

export class Source {
    type: string;
    source: string;
    entry_point: string;
    identifier: null;
}
