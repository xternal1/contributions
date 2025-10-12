import api from "../../../services/api";
import type { TransactionFullDetail } from "../transactionFullDetail";

export async function getTransactionFullDetail(
    reference: string
): Promise<TransactionFullDetail> {
    try {
        const response = await api.get(`/api/transaction/${reference}/detail`);
        return response.data?.data;
    } catch (error) {
        console.error("Gagal mengambil full detail transaksi:", error);
        throw error;
    }
}
