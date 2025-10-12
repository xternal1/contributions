import api from "../../../services/api";
import type { Division } from "../industrialclass";

export async function fetchDivisions(): Promise<Division[]> {
    try {
        const response = await api.get("/api/industrial-class");

        console.log("📌 Full API response:", response.data);

        const divisions: Division[] = response.data.data?.divisions ?? [];

        if (!Array.isArray(divisions)) {
            console.warn("⚠️ divisions bukan array:", divisions);
            return [];
        }

        console.log("✅ Divisions extracted:", divisions);
        return divisions;
    } catch (error) {
        console.error("❌ Gagal mengambil data divisions:", error);
        return [];
    }
}
