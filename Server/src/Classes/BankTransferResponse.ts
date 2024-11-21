export class TransferResponse {
    status: boolean;
    message: string;
    data: Data;
}

export class Data {
    transfersessionid: any[];
    transfertrials: any[];
    domain: string;
    amount: number;
    currency: string;
    reference: string;
    source: string;
    source_details: string;
    reason: string;
    status: string;
    failures: string;
    transfer_code: string;
    titan_code: string;
    transferred_at: string;
    id: number;
    integration: number;
    request: number;
    recipient: number;
    createdAt: Date;
    updatedAt: Date;
    created_at?: Date;
    updated_at?: Date;
}
