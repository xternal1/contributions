import { useLocation } from "react-router-dom";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { formatRupiah, parsePrice } from "../../utils/formatPrice";

interface PaymentData {
  course: {
    id: string;
    title: string;
    price: string | number;
    isFree?: boolean;
  };
}

interface PaymentMethod {
  name: string;
  logo: string;
  type: "va" | "qris" | "ewallet" | "retail" | "card";
  accountNumber?: string;
  qrCode?: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { name: "BCA", logo: "bca.png", type: "va", accountNumber: "1234567890" },
  { name: "BRI", logo: "bri.png", type: "va", accountNumber: "9876543210" },
  { name: "QRIS", logo: "qris.jpg", type: "qris", qrCode: "/images/payments/qris-sample.png" },
  { name: "GoPay", logo: "gopay.png", type: "ewallet", accountNumber: "08123456789" },
  { name: "OVO", logo: "ovo.png", type: "ewallet", accountNumber: "08123456789" },
  { name: "Indomaret", logo: "indomaret.jpg", type: "retail", accountNumber: "Kode123456" },
];

export default function PaymentPage() {
  const location = useLocation();
  const { course } = (location.state as PaymentData) || {};
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [copied, setCopied] = useState(false);

  const price = course ? parsePrice(course.price) : 0;
  const isFree = course?.isFree || false;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!course) {
    return <div className="p-8 text-center">Tidak ada data kursus.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Pembayaran Kursus
        </h1>
        <p className="text-center text-gray-600">{course.title}</p>

        {/* Total pembayaran */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Pembayaran:</p>
          <p className="text-xl font-bold text-green-600">
            {isFree ? "Gratis" : formatRupiah(price)}
          </p>
        </div>

        {/* Pilih metode pembayaran */}
        {!isFree && !selectedMethod && (
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 text-left">
              Pilih Metode Pembayaran:
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {PAYMENT_METHODS.map((method) => (
                <img
                  key={method.name}
                  src={`/images/payments/${method.logo}`}
                  alt={method.name}
                  onClick={() => setSelectedMethod(method)}
                  className="w-12 h-auto object-contain cursor-pointer hover:scale-110 transition-transform duration-200 border p-1 rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {/* Detail pembayaran */}
        {selectedMethod && !isFree && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 text-center">
              Instruksi Pembayaran - {selectedMethod.name}
            </h4>

            {selectedMethod.type === "qris" && selectedMethod.qrCode && (
              <div className="flex flex-col items-center">
                <img src={selectedMethod.qrCode} alt="QRIS" className="w-40 h-40" />
                <p className="text-sm text-gray-500 mt-2">Scan untuk membayar</p>
              </div>
            )}

            {selectedMethod.accountNumber && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Nomor / Kode Pembayaran:</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-lg text-gray-800">
                    {selectedMethod.accountNumber}
                  </span>
                  <button
                    onClick={() => handleCopy(selectedMethod.accountNumber!)}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
                  >
                    <FaCopy /> {copied ? "Tersalin" : "Salin"}
                  </button>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-xs text-gray-600">
              Setelah pembayaran berhasil, sistem akan memproses otomatis dalam 1-10 menit.
            </div>
          </div>
        )}

        {/* Gratis */}
        {isFree && (
          <div className="text-center bg-blue-50 border border-blue-200 p-4 rounded-lg">
            Kursus ini gratis! Klik tombol di bawah untuk mulai belajar.
            <button className="mt-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              Mulai Belajar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
