interface PaymentHeaderProps {
    onBack: () => void;
}

const PaymentHeader = ({ onBack }: PaymentHeaderProps) => {
    return (
        <div className="mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-left">
                Pilih Metode Pembayaran
            </h1>
            <button
                onClick={onBack}
                className="mr-2 group bg-yellow-400 text-[#0A0082] text-xs md:text-xs lg:text-sm xl:text-xs 2xl:text-md 
                font-semibold py-3 px-37 md:py-3 lg:py-3 xl:py-1 2xl:py-4 md:px-30 lg:px-32 xl:px-9 2xl:px-49
                rounded-md flex items-center justify-center gap-2
                transition-all duration-500 ease-in-out
                shadow-[4px_4px_0_#0A0082] 
                hover:bg-[#9425FE] hover:text-white hover:shadow-none
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                focus:outline-none cursor-pointer"
            >
                <span className="flex items-center gap-2 transition-colors duration-500 group-hover:text-white">
                    Kembali
                </span>
            </button>
        </div>
    );
};

export default PaymentHeader;