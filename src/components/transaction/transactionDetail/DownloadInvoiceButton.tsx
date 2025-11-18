import React from "react";
import { FiDownload } from "react-icons/fi";

interface DownloadInvoiceButtonProps {
  paymentStatus?: string | null;
  onDownload: () => void;
}

const DownloadInvoiceButton: React.FC<DownloadInvoiceButtonProps> = ({
  paymentStatus,
  onDownload,
}) => {
  if (paymentStatus !== "PAID") {
    return null;
  }

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={onDownload}
        className="group bg-[#9425FE] text-white text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-md 
        font-semibold py-3 md:py-3 lg:py-3 xl:py-3 2xl:py-4 w-[320px] md:w-[560px] lg:w-[600px] xl:w-[680px] 2xl:w-[860px]
        rounded-md flex items-center justify-center gap-2
        transition-all duration-500 ease-in-out
        shadow-[4px_4px_0_#0A0082] 
        hover:bg-yellow-400 hover:text-[#0A0082] hover:shadow-none
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        focus:outline-none cursor-pointer"
      >
        <FiDownload className="w-4 h-4" />
        Simpan Pembayaran
      </button>
    </div>
  );
};

export default DownloadInvoiceButton;
