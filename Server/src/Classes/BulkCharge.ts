export class BulkCharge {
    amount: number;
    authorization: string;
    reference?: string;
    metadata: Metadata;
}

export class Metadata {
    user_id: string;
    transporter_user_id: string;
}


export class BulkChargeReponse {
    status: boolean;
    message: string;
    data: Data;
}

export class Data {
    batch_code: string;
    reference: string;
    id: number;
    integration: number;
    domain: string;
    status: boolean;
    total_charges: number;
    pending_charges: number;
    createdAt: Date;
    updatedAt: Date;
}
