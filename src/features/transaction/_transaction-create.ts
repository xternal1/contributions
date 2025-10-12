export interface TransactionMeta {
    code: number;
    status: string;
    message: string;
}

// data yang dikirim oleh backend
export interface TransactionData {
    transaction: {
        reference: string; // contoh: DEV-T237462980724VWRL
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
