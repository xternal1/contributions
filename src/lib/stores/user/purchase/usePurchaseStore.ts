// src/lib/stores/user/purchase/usePurchaseStore.ts
import { create } from "zustand";
import type { DetailCourse } from "../../../../features/course/_course";
import { fetchCourseDetail } from "../../../../features/course/_service/course_service";
import { checkVoucherCode } from "../../../../features/coursevoucher/_service/_coursevoucher_service";
import { getPaymentChannels } from "../../../../features/Payment/_service/payment-channel_service";
import type { PaymentChannelResponse, PaymentChannel } from "../../../../features/Payment/payment-channel";
import { createTransaction } from "../../../../features/transaction/_service/_transaction-create_service";

type Nullable<T> = T | null;

type PurchaseState = {
  course: Nullable<DetailCourse>;
  virtualAccounts: PaymentChannel[];
  eWallets: PaymentChannel[];
  convenienceStores: PaymentChannel[];

  loading: boolean;
  error: string | null;
  voucher: string;
  orderAmount: number;
  feeService: number;
  totalAmount: number;
  discountAmount: number;
  openSection: string | null;
  selectedPayment: Nullable<PaymentChannel>;

  loadCourse: (slug: string) => Promise<void>;
  loadPaymentChannels: () => Promise<void>;
  setVoucher: (v: string) => void;
  checkVoucher: () => Promise<{ valid: boolean; reason?: string; discount?: number }>;
  setSelectedPayment: (p: PaymentChannel | null) => void;
  setOpenSection: (s: string | null) => void;
  calculateFee: (payment: PaymentChannel | null, amount: number) => number;
  createOrder: (voucherForApi?: string) => Promise<any>;
  setError: (msg: string | null) => void;
  reset: () => void;
};

const usePurchaseStore = create<PurchaseState>((set, get) => ({
  course: null,
  virtualAccounts: [],
  eWallets: [],
  convenienceStores: [],

  loading: false,
  error: null,
  voucher: "",
  orderAmount: 0,
  feeService: 0,
  totalAmount: 0,
  discountAmount: 0,
  openSection: "va",
  selectedPayment: null,

  loadCourse: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      if (!slug) return;
      const data = await fetchCourseDetail(slug);
      if (!data) {
        set({ course: null });
        return;
      }
      const price = Number(data.promotional_price ?? data.price ?? 0);
      set({
        course: data,
        orderAmount: price,
        feeService: 0,
        discountAmount: 0,
        totalAmount: price,
      });
    } catch (err) {
      console.error("loadCourse error", err);
      set({ error: err instanceof Error ? err.message : "Gagal load course" });
    } finally {
      set({ loading: false });
    }
  },

  loadPaymentChannels: async () => {
    set({ loading: true, error: null });
    try {
      const result: PaymentChannelResponse = await getPaymentChannels();
      set({
        virtualAccounts: result.data.virtual_account || [],
        eWallets: result.data.e_wallet || [],
        convenienceStores: result.data.convenience_store || [],
      });
    } catch (err) {
      console.error("loadPaymentChannels error", err);
      set({ error: err instanceof Error ? err.message : "Gagal fetch payment channels" });
    } finally {
      set({ loading: false });
    }
  },

  setVoucher: (v: string) => set({ voucher: v }),

  checkVoucher: async () => {
    const course = get().course;
    const voucher = (get().voucher ?? "").trim();
    if (!course) return { valid: false, reason: "Course tidak ada" };
    if (!voucher) return { valid: false, reason: "Voucher kosong" };

    set({ loading: true, error: null });
    try {
      const result = await checkVoucherCode(course.slug, voucher);
      if (result.valid) {
        const discountPercent = Number(result.discount ?? 0);
        const orderAmount = Number(get().orderAmount ?? 0);
        const potongan = Math.floor((orderAmount * discountPercent) / 100);
        const fee = Number(get().feeService ?? 0);
        const totalBaru = orderAmount - potongan + fee;
        set({
          discountAmount: potongan,
          totalAmount: totalBaru,
        });
        return { valid: true, discount: discountPercent };
      } else {
        set({
          discountAmount: 0,
          totalAmount: (Number(get().orderAmount ?? 0) + Number(get().feeService ?? 0)),
        });
        return { valid: false, reason: result.reason || "Voucher tidak valid" };
      }
    } catch (err) {
      console.error("checkVoucher error", err);
      set({ error: err instanceof Error ? err.message : "Voucher check failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  calculateFee: (payment: PaymentChannel | null, amount: number) => {
    if (!payment) return 0;
    const flat = Number(payment.fee_customer?.flat ?? 0);
    const percent = Number(payment.fee_customer?.percent ?? 0);

    let fee = flat + (amount * percent) / 100;

    const min = Number(payment.minimum_fee ?? 0);
    const max = Number(payment.maximum_fee ?? 0);

    if (min && fee < min) fee = min;
    if (max && fee > max) fee = max;

    return Math.round(fee);
  },

  setSelectedPayment: (p: PaymentChannel | null) => {
    const orderAmount = Number(get().orderAmount ?? 0);
    const discount = Number(get().discountAmount ?? 0);
    const computedFee = (p ? get().calculateFee(p, orderAmount) : 0);

    set({
      selectedPayment: p,
      feeService: computedFee,
      totalAmount: orderAmount + computedFee - discount,
    });
  },

  setOpenSection: (s: string | null) => set({ openSection: s }),

  createOrder: async (voucherForApi?: string) => {
    const course = get().course;
    const selectedPayment = get().selectedPayment;
    const totalAmount = Number(get().totalAmount ?? 0);
    const voucherToSend = typeof voucherForApi === "string" ? voucherForApi : get().voucher || "";

    if (!course) throw new Error("Course tidak tersedia");
    if (!selectedPayment) throw new Error("Pilih metode pembayaran");

    set({ loading: true, error: null });
    try {
      const res = await createTransaction("course", course.id, totalAmount, selectedPayment.code, voucherToSend);
      return res;
    } catch (err) {
      console.error("createOrder error", err);
      set({ error: err instanceof Error ? err.message : "Gagal membuat transaksi" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  setError: (msg: string | null) => set({ error: msg }),

  reset: () =>
    set({
      course: null,
      virtualAccounts: [],
      eWallets: [],
      convenienceStores: [],
      loading: false,
      error: null,
      voucher: "",
      orderAmount: 0,
      feeService: 0,
      totalAmount: 0,
      discountAmount: 0,
      openSection: "va",
      selectedPayment: null,
    }),
}));

export default usePurchaseStore;
