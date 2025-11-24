// src/types/transactionDetail.ts

export type PaymentStatus = "UNPAID" | "PAID" | "EXPIRED" | "CANCELLED";

export interface Course {
  id: number;
  name: string;
  price: number;
  thumbnail?: string;
  instructor?: string;
}

export interface Transaction {
  id: string;
  reference: string;
  invoice_number: string;
  payment_name: string;
  amount: number;
  amount_received: number;
  voucher: string;
  status: PaymentStatus;
  course: Course;
  created_at: string;
  expired_at?: string;
  paid_at?: string;
}

export interface FullTransaction {
  id: string;
  reference: string;
  invoice_number: string;
  payment_method?: string;
  payment_channel?: string;
  payment_name: string;
  virtual_account_number?: string;
  payment_code?: string;
  qr_code_url?: string;
  checkout_url?: string;
  amount: number;
  admin_fee: number;
  total_amount: number;
  status: PaymentStatus;
  expired_at?: string;
  paid_at?: string;
  created_at: string;
  instructions?: PaymentInstruction[];
}

export interface PaymentInstruction {
  title: string;
  steps: string[];
}

export interface PaymentChannel {
  code: string;
  name: string;
  icon_url: string;
  category: "VIRTUAL_ACCOUNT" | "E_WALLET" | "RETAIL_OUTLET" | "QRIS";
  active: boolean;
}

export interface StatusConfig {
  img: string;
  title?: string;
  message?: string;
}

export interface TransactionDetailState {
  transaction: Transaction | null;
  fullTransaction: FullTransaction | null;
  paymentChannels: PaymentChannel[];
  isLoading: boolean;
  paymentStatus: PaymentStatus | null;
}