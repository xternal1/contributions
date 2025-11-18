import { create } from "zustand";
import type { TransactionDetail } from "../../../../features/transactionDetail/transactionDetail";
import { getTransactionDetail } from "../../../../features/transactionDetail/services/transactionDetailService";
import type { TransactionFullDetail } from "../../../../features/transactionDetail/transactionFullDetail";
import { getTransactionFullDetail } from "../../../../features/transactionDetail/services/transactionFullDetailService";
import { getPaymentChannels } from "../../../../features/Payment/_service/payment-channel_service";
import type { PaymentChannel } from "../../../../features/Payment/payment-channel";
import { cancelTransaction } from "../../../../features/transactionDetail/services/transactionDetailService";

type PaymentStatus = "UNPAID" | "PAID" | "EXPIRED" | "CANCELLED" | null;

type TransactionDetailState = {
  transaction: TransactionDetail | null;
  fullTransaction: TransactionFullDetail | null;
  paymentChannels: PaymentChannel[];
  isLoading: boolean;
  paymentStatus: PaymentStatus;
  
  loadTransaction: (reference: string) => Promise<void>;
  checkStatus: (reference: string) => Promise<void>;
  cancelPayment: (reference: string) => Promise<{ success: boolean; message: string }>;
  reset: () => void;
};

export const useTransactionDetailStore = create<TransactionDetailState>((set) => ({
  transaction: null,
  fullTransaction: null,
  paymentChannels: [],
  isLoading: true,
  paymentStatus: null,

  loadTransaction: async (reference: string) => {
    set({ isLoading: true });
    try {
      const [statusRes, fullRes, channelRes] = await Promise.all([
        getTransactionDetail(reference),
        getTransactionFullDetail(reference),
        getPaymentChannels(),
      ]);

      // Normalize payment status handling both CANCELLED and CANCELED
      let normalizedStatus: PaymentStatus = null;
      const rawStatus = fullRes?.invoice_status?.toUpperCase().trim();
      
      if (rawStatus) {
        if (rawStatus === "UNPAID" || rawStatus === "PAID" || rawStatus === "EXPIRED") {
          normalizedStatus = rawStatus;
        } else if (rawStatus === "CANCELLED" || rawStatus === "CANCELED") {
          normalizedStatus = "CANCELLED";
        }
      }

      set({
        transaction: statusRes,
        fullTransaction: fullRes,
        paymentChannels: [
          ...(channelRes.data.virtual_account || []),
          ...(channelRes.data.convenience_store || []),
          ...(channelRes.data.e_wallet || []),
        ],
        paymentStatus: normalizedStatus,
      });
    } catch (error) {
      console.error("Failed to load transaction:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkStatus: async (reference: string) => {
    set({ isLoading: true });
    try {
      const [statusRes, fullRes] = await Promise.all([
        getTransactionDetail(reference),
        getTransactionFullDetail(reference),
      ]);

      // Normalize payment status
      let normalizedStatus: PaymentStatus = null;
      const rawStatus = fullRes?.invoice_status?.toUpperCase().trim();
      
      if (rawStatus) {
        if (rawStatus === "UNPAID" || rawStatus === "PAID" || rawStatus === "EXPIRED") {
          normalizedStatus = rawStatus;
        } else if (rawStatus === "CANCELLED" || rawStatus === "CANCELED") {
          normalizedStatus = "CANCELLED";
        }
      }

      set({
        transaction: statusRes,
        fullTransaction: fullRes,
        paymentStatus: normalizedStatus,
      });
    } catch (error) {
      console.error("Failed to check status:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  cancelPayment: async (reference: string) => {
    set({ isLoading: true });
    try {
      const res = await cancelTransaction(reference);
      return res;
    } catch (error) {
      console.error("Failed to cancel payment:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({
    transaction: null,
    fullTransaction: null,
    paymentChannels: [],
    isLoading: true,
    paymentStatus: null,
  }),
}));