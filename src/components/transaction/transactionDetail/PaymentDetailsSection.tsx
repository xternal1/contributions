import React from "react";
import { FiCopy } from "react-icons/fi";

interface PaymentDetailsSectionProps {
  fullTransaction: any;
  displayTransaction: any;
  copiedText: string | null;
  handleCopy: (text: string) => void;
  logo?: string;
}

const PaymentDetailsSection: React.FC<PaymentDetailsSectionProps> = ({
  fullTransaction,
  displayTransaction,
  copiedText,
  handleCopy,
  logo,
}) => {
  return (
    <>
      <h2 className="text-left text-sm md:text-md font-semibold text-gray-800 dark:text-white mb-4">
        Rincian Pembayaran
      </h2>

      <div className="mb-0">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Produk yang dibeli</p>
        </div>
        <h3 className="flex justify-between items-center text-[12px] md:text-lg font-semibold text-gray-600 dark:text-gray-200">
          <p className="max-w-[60%] lg:max-w-[70%] text-left break-words">{fullTransaction?.product?.title}</p>
          <span className="text-purple-600 dark:text-purple-400 font-semibold text-xs md:text-[15px] lg:text-md">
            {fullTransaction?.product?.promotional_price ? (
              <div className="flex flex-col items-end">
                <span className="text-gray-400 dark:text-gray-500 line-through text-xs">
                  Rp {fullTransaction.product.price.toLocaleString("id-ID")}
                </span>
                <span>
                  Rp {fullTransaction.product.promotional_price.toLocaleString("id-ID")}
                </span>
              </div>
            ) : (
              <p>Rp {fullTransaction?.product?.price?.toLocaleString("id-ID") || "0"}</p>
            )}
          </span>
        </h3>
      </div>

      <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-white">
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Biaya Layanan
        </p>
        <h3 className="text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400">
          Rp {fullTransaction?.fee_amount?.toLocaleString("id-ID") || "0"}
        </h3>
      </div>

      <div className="flex justify-between items-center py-3 border-t border-gray-200 dark:border-white">
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">
          Voucher Diskon
        </p>
        <h3 className="text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400">
          {fullTransaction?.course_voucher && fullTransaction.course_voucher > 0 ? (
            `- Rp ${fullTransaction.course_voucher.toLocaleString("id-ID")}`
          ) : (
            "Rp 0"
          )}
        </h3>
      </div>

      <div className="flex justify-between py-3 border-t border-b border-gray-200 dark:border-white">
        <p className="mt-0 md:mt-1 text-xs md:text-sm text-gray-600 dark:text-gray-300">Total Pembayaran</p>
        <h3 className="text-sm md:text-lg lg:text-md xl:text-lg 2xl:text-lg font-bold text-purple-600 dark:text-purple-400">
          <p>
            Rp{" "}
            {fullTransaction?.paid_amount
              ? fullTransaction.paid_amount.toLocaleString("id-ID")
              : "0"}
          </p>
        </h3>
      </div>

      <div className="mb-4 border-b border-gray-200 dark:border-white">
        <div className="flex justify-between items-center">
          <p className="mt-2 lg:mt-1 text-left text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-2">Metode Pembayaran</p>
          <div className="flex items-center mt-2 mb-2">
            {logo && (
              <img
                src={logo}
                alt={displayTransaction?.payment_name}
                className="max-h-7 md:max-h-9 lg:max-h-8 xl:max-h-9 2xl:max-h-10 object-contain"
              />
            )}
          </div>
        </div>
      </div>

      {displayTransaction?.pay_code && (
        <div className="mb-3">
          <div className="flex justify-between items-center">
            <p className="max-w-[35%] sm:max-w-none text-left text-xs md:text-sm text-gray-600 dark:text-gray-300">
              Kode Pembayaran (1 × 24 Jam)
            </p>
            <div className="flex items-center gap-2 relative">
              <p className="text-xs md:text-xl font-mono text-purple-600 dark:text-purple-400 font-bold">
                {displayTransaction.pay_code}
              </p>
              <button
                onClick={() =>
                  (displayTransaction?.pay_code) && handleCopy(displayTransaction.pay_code)
                }
                className="p-0.5 md:p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
              >
                <FiCopy />
              </button>
              {copiedText === displayTransaction?.pay_code && (
                <span
                  className="absolute top-[-25px] right-0 bg-gray-100 dark:bg-gray-700 text-black dark:text-white text-[10px] md:text-xs px-2 py-1 rounded-md"
                >
                  Berhasil disalin!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mb-3">
        <div className="flex justify-between items-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Kode Transaksi</p>
          <p className="text-xs md:text-sm font-mono text-gray-600 dark:text-gray-300">{displayTransaction?.reference}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300">Bayar Sebelum</p>
          <p className="text-[10px] md:text-sm font-semibold text-gray-600 dark:text-gray-300">
            {displayTransaction?.expired_time
              ? (() => {
                  const date = new Date(displayTransaction.expired_time * 1000);
                  const day = date.getDate();
                  const month = date.toLocaleString("id-ID", { month: "long" });
                  const year = date.getFullYear();
                  const hours = String(date.getHours()).padStart(2, "0");
                  const minutes = String(date.getMinutes()).padStart(2, "0");
                  return `${day} ${month} ${year} - ${hours}:${minutes}`;
                })()
              : "-"}
          </p>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailsSection;
