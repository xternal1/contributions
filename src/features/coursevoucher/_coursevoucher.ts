// Tipe data untuk list voucher
export interface CourseVoucher {
    id: string;
    course: string;
    usage_limit: number;
    discount: number;
    code: string;
    start: string;
    end: string;
    transactions_count: number;
}

export interface CourseVoucherResponse {
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: CourseVoucher[];
    success: boolean;
}

export interface CourseVoucherCheckResponse {
    meta: {
        code: number;
        status: string;
        message: string;
    };
    data: {
        valid: boolean;
        discount?: number;
        reason?: string;
    };
    success: boolean;
}
