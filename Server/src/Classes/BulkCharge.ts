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
