export interface Course {
    id: number;
    title: string;
    description?: string;
    price: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface TransactionFullDetail {
    id: number;
    reference: string;
    payment_status: "UNPAID" | "PAID" | "EXPIRED";
    payment_name: string;
    pay_code?: string;
    checkout_url?: string;
    amount: number;
    created_at: string;
    updated_at: string;


    course?: Course;
    user?: User;
    product?: Product;
}
