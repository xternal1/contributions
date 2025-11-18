import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface InstructionsSectionProps {
  transaction: any;
  openSection: string | null;
  setOpenSection: (section: string | null) => void;
  paymentStatus?: string | null;
}

const InstructionsSection: React.FC<InstructionsSectionProps> = ({
  transaction,
  openSection,
  setOpenSection,
  paymentStatus,
}) => {
  if (!paymentStatus || paymentStatus === "PAID" || paymentStatus === "CANCELLED") {
    return null;
  }

  return (
    <>
      <h2 className="text-left text-sm md:text-md font-semibold text-gray-800 dark:text-white mb-4">
        Instruksi Pembayaran
      </h2>
      <div className="flex flex-col gap-2">
        {transaction?.instructions?.map((instruksi: any, idx: number) => (
          <div key={idx}>
            <button
              onClick={() =>
                setOpenSection(openSection === instruksi.title ? null : instruksi.title)
              }
              className={`w-full flex justify-between items-center px-3 py-2 text-left font-medium text-xs md:text-sm transition ${
                openSection === instruksi.title
                  ? "bg-blue-50 dark:bg-purple-900/30 text-[#9425FE] dark:text-purple-400"
                  : "bg-white dark:bg-[#1A1A2E] hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-yellow-500 dark:hover:text-yellow-400"
              }`}
            >
              <span>{instruksi.title}</span>
              <ChevronDownIcon
                className={`w-3 h-3 md:w-5 md:h-5 transition-transform duration-300 stroke-[1.5] ${
                  openSection === instruksi.title ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {openSection === instruksi.title && (
              <div className="px-3 pb-3 text-[13px] text-black dark:text-gray-300 space-y-1 text-left">
                {instruksi.steps.map((step: string, i: number) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: `${i + 1}. ${step}` }} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default InstructionsSection;
