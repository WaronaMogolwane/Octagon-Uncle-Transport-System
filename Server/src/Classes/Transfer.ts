export class TransferWebHookEvent {
    event: string;
    data: Data;
}

export class Data {
    amount: number;
    currency: string;
    domain: string;
    failures: null;
    id: number;
    integration: Integration;
    reason: string;
    reference: string;
    source: string;
    source_details: null;
    status: string;
    titan_code: null;
    transfer_code: string;
    transferred_at: null;
    recipient: Recipient;
    session: Session;
    createdAt: Date;
    updatedAt: Date;
    created_at: Date;
    update_at: Date;
}

export class Integration {
    id: number;
    is_live: boolean;
    business_name: string;
}

export class Recipient {
    active: boolean;
    currency: string;
    description: string;
    domain: string;
    email: null;
    id: number;
    integration: number;
    metadata: null;
    name: string;
    recipient_code: string;
    type: string;
    is_deleted: boolean;
    details: Details;
    created_at: Date;
    updated_at: Date;
}

export class Details {
    account_number: string;
    account_name: null;
    bank_code: string;
    bank_name: string;
}

export class Session {
    provider: null;
    id: null;
}
export class TransferRecipient {
    type: string;
    description: string;
    name: string;
    account_number: string;
    bank_code: number;
    currency: string;
}
export class BankTransfer {
    source: string;
    reason: string;
    reference: string;
    amount: number;
    recipient: string;
}
export class BulkBankTransfer {
    currency: string;
    source: string;
    transfers: BankTransfer[];
}
export class Transfer {
    transferCode: string;
    amount: number;
    currency: string;
    status: string;
    reference: string;
    reason: string;
    dateCreated: Date;
    dateUpdated: Date;
    transactionType: string;
}

