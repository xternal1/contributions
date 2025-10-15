export interface TransactionMeta {
    code: number;
    status: string;
    message: string;
}

export interface TransactionData {
    transaction: {
        reference: string;
        user_id: string;
        course_id?: string;
        event_id?: string;
    };
    voucher: string | null;
}

export interface TransactionResponse {
    meta: TransactionMeta;
    data: TransactionData;
    success: boolean;
}
