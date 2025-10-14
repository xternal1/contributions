import api from "../../../services/api";
import type { TransactionDetail } from "../transactionDetail";

export async function getTransactionDetail(reference: string): Promise<TransactionDetail> {
  try {
    const response = await api.get(`/api/check-status/course/${reference}`);

    const data = response.data?.data;
    const message = response.data?.meta?.message;

    if (message === "Tripay tidak merespon") {
      return {
        ...data,
        status: "FAILED",
      };
    }

    if (!data?.status) {
      return {
        ...data,
        status: "UNKNOWN",
      };
    }

    return data;
  } catch (error) {
    console.error("Gagal mengambil detail transaksi:", error);
    throw error;
  }
}

export async function cancelTransaction(reference: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.patch(`/api/transaction/${reference}/cancel`);
    return {
      success: response.data?.success ?? false,
      message: response.data?.meta?.message ?? "Gagal membatalkan transaksi",
    };
  } catch (error) {
    console.error("Gagal membatalkan transaksi:", error);
    throw error;
  }
}