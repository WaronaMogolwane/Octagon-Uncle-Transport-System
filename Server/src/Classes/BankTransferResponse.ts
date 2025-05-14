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
    source_details: any; // Changed from string to any to match null
    reason: string;
    status: string;
    failures: any;     // Changed from string to any to match null
    transfer_code: string;
    titan_code: any;       // Changed from string to any to match null
    transferred_at: string | null; // Changed to string | null to match null
    id: number;
    integration: number;
    request: number;
    recipient: string;    // Changed to number to match the ID
    createdAt: string; // Changed to string to match the format
    updatedAt: string; // Changed to string to match the format
    created_at?: Date;
    updated_at?: Date;

}
