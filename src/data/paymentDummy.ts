export interface PaymentMethod {
  code: string;
  name: string;
  icon: string; // path dari public (contoh: '/images/payments/gopay.png')
}

// Payment methods (public paths)
export const virtualAccounts: PaymentMethod[] = [
  { code: 'bri', name: 'BRI', icon: '/images/payments/bri.png' },
  { code: 'mandiri', name: 'Mandiri', icon: '/images/payments/mandiri.png' },
  { code: 'bni', name: 'BNI', icon: '/images/payments/bni.png' }
];

export const eWallets: PaymentMethod[] = [
  { code: 'gopay', name: 'Gopay', icon: '/images/payments/gopay.png' },
  { code: 'ovo', name: 'OVO', icon: '/images/payments/ovo.png' },
  { code: 'dana', name: 'Dana', icon: '/images/payments/dana.jpg' },
  { code: 'linkaja', name: 'LinkAja', icon: '/images/payments/link-aja.jpg' }
];

export const convenienceStores: PaymentMethod[] = [
  { code: 'alfamart', name: 'Alfamart', icon: '/images/payments/alfamart.jpg' },
  { code: 'indomaret', name: 'Indomaret', icon: '/images/payments/indomaret.jpg' }
];

// Map cepat untuk lookup by code
export const paymentMethodMap: Record<string, PaymentMethod> = {
  ...virtualAccounts.reduce((acc, v) => ({ ...acc, [v.code]: v }), {}),
  ...eWallets.reduce((acc, v) => ({ ...acc, [v.code]: v }), {}),
  ...convenienceStores.reduce((acc, v) => ({ ...acc, [v.code]: v }), {})
};

// ---------- Dummy transaction data & helper ----------
export const orderAmount = 300000;
export const feeService = 10000;
export const totalAmount = orderAmount + feeService;

// Dummy payment summary (bisa dipakai di PaymentSummary / PaymentDetail)
export const paymentSummary = {
  product_price: orderAmount,
  fee_amount: feeService,
  total_amount: totalAmount,
  product_name: 'Kursus Premium GetSkill'
};

export interface TestTransaction {
  reference: string;
  paymentMethod: PaymentMethod;
  amount: number;
  timestamp: string; // ISO string
}

const STORAGE_KEY = 'testPaymentData';

export function createTestTransaction(selectedPayment: PaymentMethod): string {
  const reference = 'TRX-TEST-' + Date.now();
  const testData: TestTransaction = {
    reference,
    paymentMethod: selectedPayment,
    amount: totalAmount,
    timestamp: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testData));
  } catch (e) {
    // fail safe: localStorage bisa dibatasi di beberapa environment
    // eslint-disable-next-line no-console
    console.warn('Gagal menyimpan testPaymentData ke localStorage', e);
  }

  return reference;
}

export function getTestTransaction(): TestTransaction | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<TestTransaction>;

    // Basic validation: pastikan field utama ada
    if (
      typeof parsed.reference === 'string' &&
      parsed.paymentMethod &&
      typeof (parsed.paymentMethod as any).code === 'string' &&
      typeof parsed.amount === 'number' &&
      typeof parsed.timestamp === 'string'
    ) {
      return parsed as TestTransaction;
    }

    // jika format tak sesuai, return null
    return null;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Gagal mengambil testPaymentData dari localStorage', e);
    return null;
  }
}

export function clearTestTransaction(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Gagal menghapus testPaymentData dari localStorage', e);
  }
}

// ---------- Dummy instructions (opsional, bisa diimpor di PaymentDetail) ----------
export const instructions = [
  {
    title: 'Instruksi Gopay',
    steps: [
      'Buka aplikasi Gojek di ponsel Anda',
      'Pilih menu GoPay atau Bayar',
      `Ketik nominal pembayaran Rp ${totalAmount.toLocaleString('id-ID')}`,
      'Scan QR code atau masukkan kode pembayaran',
      'Konfirmasi pembayaran Anda'
    ]
  },
  {
    title: 'Instruksi Transfer Bank',
    steps: [
      'Buka aplikasi mobile banking Anda',
      'Pilih menu transfer atau pembayaran',
      'Masukkan kode virtual account 087654321',
      `Input nominal Rp ${totalAmount.toLocaleString('id-ID')}`,
      'Konfirmasi dan selesaikan transaksi'
    ]
  },
  {
    title: 'Instruksi Mini Market',
    steps: [
      'Kunjungi Alfamart/Indomaret terdekat',
      'Sampaikan kepada kasir ingin bayar tagihan',
      'Berikan kode pembayaran 087654321',
      `Bayar sejumlah Rp ${totalAmount.toLocaleString('id-ID')}`,
      'Simpan bukti pembayaran yang diberikan'
    ]
  }
];
