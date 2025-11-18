import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { QRCodeCanvas } from "qrcode.react";

interface StatusCardSectionProps {
  paymentStatus?: string | null;
  transaction: any;
  statusConfig: Record<string, any>;
  handleCheckStatus: () => void;
  handleCancelPayment: () => void;
}

const StatusCardSection: React.FC<StatusCardSectionProps> = ({
  paymentStatus,
  transaction,
  statusConfig,
  handleCheckStatus,
  handleCancelPayment,
}) => {
  return (
    <>
      <h2 className="text-left text-sm md:text-md font-semibold text-gray-800 dark:text-white mb-4">
        Status Pembayaran
      </h2>
      <div className="flex flex-col items-center text-center">
        {paymentStatus && transaction?.payment_name?.includes("QRIS") ? (
          <>
            {/* UNPAID dengan QR Code */}
            {paymentStatus === "UNPAID" && (
              <div className="flex flex-col items-center text-center">
                <QRCodeCanvas
                  value={transaction?.pay_code || transaction?.checkout_url || ""}
                  size={200}
                  includeMargin={true}
                />

                {/* Title & Message */}
                <h3 className="text-sm md:text-md font-bold text-black dark:text-white">
                  QR Code Pembayaran
                </h3>
                <p className="text-[10px] md:text-xs text-[#9425FE] dark:text-purple-400 mt-1 mb-3">
                  Menunggu pembayaran
                </p>

                <button
                  onClick={() => {
                    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
                    const url = canvas.toDataURL("image/png");
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "qris.png";
                    link.click();
                  }}
                  className="mt-2 group bg-white dark:bg-[#1A1A2E] text-[#9425FE] dark:text-purple-400 text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
                  font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[310px] md:w-[290px] lg:w-[280px] xl:w-[310px] 2xl:w-[390px]
                  rounded-md flex items-center justify-center mx-auto md:mx-0 gap-2
                  transition-all duration-500 ease-in-out
                  border border-[#9425FE] dark:border-purple-400 hover:text-yellow-500 dark:hover:text-yellow-400 
                  active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                  focus:outline-none cursor-pointer"
                >
                  Unduh Kode QR
                </button>
              </div>
            )}

            {/* PAID & EXPIRED */}
            {paymentStatus !== "UNPAID" && (
              <div className="flex flex-col items-center text-center mt-3">
                <img
                  src={statusConfig[paymentStatus].img}
                  alt="Payment Status"
                  className="h-40 mb-2"
                />

                <h3 className="text-sm md:text-md font-bold text-black dark:text-white mt-3">
                  {statusConfig[paymentStatus].title}
                </h3>
                {statusConfig[paymentStatus].message && (
                  <p className="text-[10px] md:text-xs mt-1 mb-3 text-[#9425FE] dark:text-purple-400">
                    {statusConfig[paymentStatus].message}
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          // Except QRIS
          paymentStatus && (
            <div className="flex flex-col items-center text-center">
              <img
                src={statusConfig[paymentStatus].img}
                alt="Payment Status"
                className="h-40 object-contain mb-2"
              />

              <h3 className="text-sm md:text-md font-bold text-black dark:text-white mt-3">
                {statusConfig[paymentStatus].title}
              </h3>
              {statusConfig[paymentStatus].message && (
                <p className="text-[10px] md:text-xs mt-1 mb-3 text-[#9425FE] dark:text-purple-400">
                  {statusConfig[paymentStatus].message}
                </p>
              )}
            </div>
          )
        )}
        {paymentStatus && paymentStatus !== "PAID" && paymentStatus !== "CANCELLED" && (
          <button
            onClick={handleCheckStatus}
            className="mt-2 group bg-white dark:bg-[#1A1A2E] text-[#9425FE] dark:text-purple-400 text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
            font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[310px] md:w-[290px] lg:w-[280px] xl:w-[310px] 2xl:w-[390px]
            rounded-md flex items-center justify-center mx-auto md:mx-0 gap-2
            transition-all duration-500 ease-in-out
            border border-[#9425FE] dark:border-purple-400 hover:text-yellow-400 
            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
            focus:outline-none cursor-pointer"
          >
            <span className="flex items-center gap-2 transition-colors duration-500 group-hover:text-yellow-400">
              <FiRefreshCw />
              Cek Status
            </span>
          </button>
        )}
        {paymentStatus === "UNPAID" && (
          <button
            onClick={handleCancelPayment}
            className="mt-2 group bg-[#9425FE] text-white text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
            font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[310px] md:w-[290px] lg:w-[280px] xl:w-[310px] 2xl:w-[390px]
            rounded-md flex items-center justify-center mx-auto md:mx-0 gap-2
            transition-all duration-500 ease-in-out
            shadow-[4px_4px_0_#0A0082] 
            hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none
            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
            focus:outline-none cursor-pointer"
          >
            Batalkan Pembayaran
          </button>
        )}
      </div>
    </>
  );
};

export default StatusCardSection;
