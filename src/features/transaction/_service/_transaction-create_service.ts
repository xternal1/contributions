import api from "../../../services/api";
import type { TransactionResponse } from "../_transaction-create";

export async function createTransaction(
    productType: string,
    id: string,
    course_price: number,
    payment_method: string,
    voucher_code?: string
): Promise<TransactionResponse> {
    const url = `/api/transaction-create/${productType}/${id}`;

    const params: Record<string, any> = {
        course_price,
        payment_method,
    };
    if (voucher_code && voucher_code.trim() !== "") {
        params.voucher_code = voucher_code;
    }

    const token = localStorage.getItem("token");

    try {
        const { data } = await api.get<TransactionResponse>(url, {
            params,
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
                Accept: "application/json",
            },
        });

        console.log("createTransaction response:", data);
        return data;
    } catch (error: any) {
        console.error("createTransaction error:", error);

        return (
            error.response?.data || {
                success: false,
                meta: { code: 500, status: "error", message: "Request failed" },
                data: {
                    transaction: {
                        id: "",
                        user_id: "",
                    },
                    voucher: null,
                },
            }
        );
    }
}
