import api from "../../../services/api";
import type { ContactResponse } from "../_contact";

export const getContact = async (): Promise<ContactResponse> => {
    try {
        const response = await api.get("/api/contact");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching contact data:", error);
        throw error;
    }
};

const _contact_service = {
    getContact,
};

export default _contact_service;
