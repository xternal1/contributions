// src/stores/useTransactionStore.ts
import { create } from "zustand";
import type { CourseTransaction } from "../../../../features/user/models";
import {
  fetchUserTransactions,
  cancelTransaction as cancelTransactionService,
} from "../../../../features/user/user_service";

type Tab = "Semua" | "Menunggu Pembayaran" | "Selesai";

type TransactionState = {
  transactions: CourseTransaction[];
  loading: boolean;
  error: string;
  activeTab: Tab;
  currentPage: number;
  itemsPerPage: number;

  loadTransactions: (userId?: number) => Promise<void>;
  cancelTransaction: (id: string) => Promise<void>;
  setActiveTab: (tab: Tab) => void;
  setCurrentPage: (p: number) => void;
  setError: (msg: string) => void;
};

type SetFn<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetFn<T> = () => T;

export const useTransactionStore = create<TransactionState>(
  (set: SetFn<TransactionState>, get: GetFn<TransactionState>) => ({
    transactions: [],
    loading: true,
    error: "",
    activeTab: "Semua",
    currentPage: 1,
    itemsPerPage: 4,

    loadTransactions: async (userId = 1) => {
      set({ loading: true, error: "" });
      try {
        const data = await fetchUserTransactions(userId);
        set({ transactions: data, currentPage: 1 });
      } catch (err) {
        console.error("Gagal memuat transaksi:", err);
        set({ transactions: [], error: "Gagal memuat data transaksi" });
      } finally {
        set({ loading: false });
      }
    },

    cancelTransaction: async (id: string) => {
      const prev = get().transactions.slice();
      set({
        transactions: get().transactions.map((t) =>
          t.id === id ? { ...t, invoice_status: "canceled" } : t
        ),
      });

      try {
        await cancelTransactionService(id);
        // optional: refresh to ensure server state (uncomment if desired)
        // await get().loadTransactions();
      } catch (err) {
        console.error("Gagal membatalkan transaksi:", err);
        set({ transactions: prev, error: "Gagal membatalkan pesanan." });
        throw err; // rethrow so callers can show UI feedback
      }
    },

    setActiveTab: (tab: Tab) => set({ activeTab: tab, currentPage: 1 }),
    setCurrentPage: (p: number) => set({ currentPage: p }),
    setError: (msg: string) => set({ error: msg }),
  })
);

export default useTransactionStore;
