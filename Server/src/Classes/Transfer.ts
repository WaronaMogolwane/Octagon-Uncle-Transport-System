export class TransferWebHookEvent {
    event: string;
    data: TransferData;
}

export class TransferData {
    amount: number; // In kobo (smallest unit of the currency)
    currency: string;
    domain: string;
    failures?: any[];
    id: number;
    integration: Integration;
    reason?: string;
    reference: string;
    source: string;
    source_details?: any;
    status: string;
    titan_code?: string;
    transfer_code: string;
    transferred_at?: string | null;
    recipient: Recipient;
    session: Session;
    createdAt: string;
    updatedAt: string;
    created_at?: string;
    update_at?: string;
}

export class Integration {
    id: number;
    is_live: boolean;
    business_name: string;
}

export class Recipient {
    active: boolean;
    currency: string;
    description?: string;
    domain: string;
    email?: string | null;
    id: number;
    integration: number;
    metadata?: any;
    name: string;
    recipient_code: string;
    type: string; // e.g., 'nuban'
    is_deleted: boolean;
    details: AccountDetails;
    created_at: string;
    updated_at: string;
}

export class AccountDetails {
    account_number: string;
    account_name?: string | null;
    bank_code: string;
    bank_name: string;
}

export class Session {
    provider?: string | null;
    id?: string | null;
}

export class TransferRecipient {
    type: string; // e.g., 'nuban'
    description?: string;
    name: string;
    account_number: string;
    bank_code: string;
    currency: string;
}

export class BankTransfer {
    source: string; // e.g., 'balance'
    reason?: string;
    reference: string;
    amount: number;
    recipient: string;
}

export class BulkBankTransfer {
    currency: string;
    source: string; // e.g., 'balance'
    transfers: BankTransfer[];
}

export class Transfer {
    transferCode: string;
    amount: number; // In kobo
    currency: string;
    status: string; // e.g., 'pending', 'success', 'failed'
    reference: string;
    reason?: string;
    dateCreated: Date;
    dateUpdated: Date;
    transactionType: string;
    paystackId?: number;
}
