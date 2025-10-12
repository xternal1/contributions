import api from "../../../../services/api";
import type { Partner } from "../Partner";

// Fetch partners list
export async function fetchPartners(): Promise<Partner[]> {
    try {
        const response = await api.get("/api/partners2");
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data partners:", error);
        throw error;
    }
}