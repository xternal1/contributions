import api from "../../../services/api";
import type {
    CourseVoucherCheckResponse,
} from "../_coursevoucher";

export async function checkVoucherCode(
    slug: string,
    code: string
): Promise<{ valid: boolean; discount?: number; reason?: string }> {
    try {
        const response = await api.get<CourseVoucherCheckResponse>(
            `/api/course-vouchers/${slug}/check`,
            { params: { voucher_code: code } }
        );

        console.log("Raw response checkVoucherCode:", response.data);

        const { success, data, meta } = response.data;

        if (success && data?.valid) {
            return {
                valid: true,
                discount: data.discount ?? 0,
            };
        }

        if (success && meta?.message?.toLowerCase().includes("berhasil")) {
            return {
                valid: true,
                discount: data?.discount ?? 0,
            };
        }

        return {
            valid: false,
            reason: data?.reason || meta?.message || "Voucher tidak valid",
        };
    } catch (error: any) {
        console.error("Error checkVoucherCode:", error.response?.data || error);
        return { valid: false, reason: "Terjadi kesalahan internal" };
    }
}
