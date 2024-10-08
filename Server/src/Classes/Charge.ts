export interface Charge {
    email: string;
    amount: number;
    authorization_code: string;
    metadata: Metadata;
}

export interface Metadata {
    user_id: string;
    transporter_user_id: string;
}
