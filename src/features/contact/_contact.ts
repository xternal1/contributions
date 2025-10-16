export interface ContactMeta {
    code: number;
    status: string;
    message: string;
}

export interface ContactData {
    id: number;
    whatsapp: string;
    twitter: string;
    facebook: string;
    email: string[];
    phone_number: string[];
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ContactResponse {
    meta: ContactMeta;
    data: ContactData;
    success: boolean;
}
