export interface OrderItem {
    sku: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    product_url: string;
    image_url: string | null;
}

export interface PaymentInstruction {
    title: string;
    steps: string[];
}

export interface TransactionDetail {
    reference: string;
    merchant_ref: string;
    payment_selection_type: string;
    payment_method: string;
    payment_name: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    callback_url: string;
    return_url: string;
    amount: number;
    fee_merchant: number;
    fee_customer: number;
    total_fee: number;
    amount_received: number;
    pay_code: string;
    pay_url: string | null;
    checkout_url: string;
    status: string;
    paid_at: string | null;
    expired_time: number;
    order_items: OrderItem[];
    instructions: PaymentInstruction[];
    voucher?: string;
    course?: {
        id: string;
        title: string;
    };
}

export interface CancelTransactionResponse {
    success: boolean;
    message: string;
}
